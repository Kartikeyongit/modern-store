import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, shippingInfo } = await req.json();

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: [item.product.images?.[0] || ""],
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: { name: "Shipping" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Tax (8%)" },
        unit_amount: Math.round(tax * 100),
      },
      quantity: 1,
    });

    const total = subtotal + shipping + tax;
    const orderId = uuidv4();

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.AUTH_URL}/checkout/success?order_id=${orderId}`,
      cancel_url: `${process.env.AUTH_URL}/checkout?cancelled=true`,
      metadata: {
        orderId,
        userId: (session.user as any).id,
        shippingInfo: JSON.stringify(shippingInfo),
      },
    });

    // Create order in database
    await db.insert(orders).values({
      id: orderId,
      userId: (session.user as any).id,
      status: "Pending",
      total,
      shippingAddress: JSON.stringify(shippingInfo),
      paymentStatus: "Pending",
    });

    // Create order items
    for (const item of items) {
      await db.insert(orderItems).values({
        id: uuidv4(),
        orderId,
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.price,
      });
    }

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}