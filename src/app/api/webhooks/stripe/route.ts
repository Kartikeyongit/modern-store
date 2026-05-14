import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

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
    console.log("Payment status:", session.payment_status);

    if (orderId) {
      try {
        // Try direct update
        const result = await db
          .update(orders)
          .set({
            status: "Processing",
            paymentStatus: "Paid",
          })
          .where(eq(orders.id, orderId));

        console.log("Update result:", result);

        // Verify the update
        const updated = await db.query.orders.findFirst({
          where: eq(orders.id, orderId),
        });

        if (updated) {
          console.log("Order after update:", {
            id: updated.id,
            status: updated.status,
            paymentStatus: updated.paymentStatus,
          });
        } else {
          console.log("Order not found after update attempt");
        }
      } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
          { error: "Database update failed" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}