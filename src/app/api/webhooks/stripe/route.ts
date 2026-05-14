import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("Webhook received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    console.log("Processing order:", orderId);

    if (orderId) {
      try {
        const existingOrder = await db.query.orders.findFirst({
          where: eq(orders.id, orderId),
        });

        if (existingOrder) {
          await db
            .update(orders)
            .set({
              status: "Processing",
              paymentStatus: "Paid",
            })
            .where(eq(orders.id, orderId));
          console.log("Order marked as paid:", orderId);
        } else {
          console.log("Order not found in database:", orderId);
        }
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    } else {
      console.log("No orderId found in session metadata");
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    console.log("Payment failed for intent:", event.data.object.id);
  }

  return NextResponse.json({ received: true });
}