import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allOrders = await db.query.orders.findMany({
      orderBy: desc(orders.createdAt),
      with: {
        user: true,
        items: {
          with: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(allOrders);
  } catch {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { orderId, status, paymentStatus, trackingNumber, carrier } = await req.json();
    
    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;
    if (carrier !== undefined) updateData.carrier = carrier;

    await db.update(orders)
      .set(updateData)
      .where(eq(orders.id, orderId));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}