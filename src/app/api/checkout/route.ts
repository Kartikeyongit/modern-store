import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { orders, orderItems, products, storeSettings } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, shippingInfo, paymentMethod } = await req.json();
    const method: "stripe" | "cod" = paymentMethod || "stripe";

    const typedItems = items as Array<{ product: { price: number; name: string; id: string; images?: string[]; stock: number }; selectedColor?: string; selectedSize?: string; quantity: number }>;

    // Validate stock
    for (const item of typedItems) {
      const product = await db.query.products.findFirst({
        where: eq(products.id, item.product.id),
        columns: { stock: true },
      });
      const available = product?.stock ?? 0;
      if (item.quantity > available) {
        return NextResponse.json(
          { error: `Insufficient stock for "${item.product.name}". Only ${available} available.` },
          { status: 400 }
        );
      }
    }

    // Calculate totals
    const subtotal = typedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const settings = await db.query.storeSettings.findFirst({
      where: eq(storeSettings.id, "main"),
    });
    const freeShippingThreshold = settings?.shippingThreshold ?? 100;
    const shippingRate = settings?.shippingRate ?? 9.99;
    const taxRate = settings?.taxRate ?? 0.08;
    const shipping = subtotal > freeShippingThreshold ? 0 : shippingRate;
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;
    const orderId = uuidv4();

    // Common: create order items
    const orderItemsData = typedItems.map((item) => ({
      id: uuidv4(),
      orderId,
      productId: item.product.id,
      quantity: item.quantity,
      unitPrice: item.product.price,
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
    }));

    // Common: insert order
    await db.insert(orders).values({
      id: orderId,
      userId: (session.user as { id: string }).id,
      status: "Pending",
      total,
      shippingAddress: JSON.stringify(shippingInfo),
      paymentStatus: "Pending",
      paymentMethod: method,
    });

    await db.insert(orderItems).values(orderItemsData);

    // Decrement stock
    for (const item of orderItemsData) {
      await db
        .update(products)
        .set({ stock: sql`stock - ${item.quantity}` })
        .where(eq(products.id, item.productId));
    }

    if (method === "cod") {
      return NextResponse.json({
        url: `${process.env.AUTH_URL?.replace(/\/$/, "")}/checkout/success?order_id=${orderId}&paymentMethod=cod`,
        orderId,
      });
    }

    // Stripe flow
    type LineItem = {
      price_data: {
        currency: string;
        product_data: { name: string; images?: string[] };
        unit_amount: number;
      };
      quantity: number;
    };

    const lineItems: LineItem[] = typedItems.map((item) => {
      const variant = [item.selectedColor, item.selectedSize].filter(Boolean).join(" / ");
      const name = variant ? `${item.product.name} (${variant})` : item.product.name;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            images: [item.product.images?.[0] || ""],
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      };
    });

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
        product_data: { name: `Tax (${Math.round(taxRate * 100)}%)` },
        unit_amount: Math.round(tax * 100),
      },
      quantity: 1,
    });

    const baseUrl = process.env.AUTH_URL?.replace(/\/$/, "");

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?order_id=${orderId}`,
      cancel_url: `${baseUrl}/checkout?cancelled=true`,
      metadata: {
        orderId,
        userId: (session.user as { id: string }).id,
        shippingInfo: JSON.stringify(shippingInfo),
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}