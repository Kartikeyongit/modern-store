import { NextResponse } from "next/server";
import { auth, signOut } from "@/lib/auth";
import { db } from "@/db";
import { users, orders, orderItems } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { password } = await req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (user.password) {
      if (!password) {
        return NextResponse.json({ error: "Password is required." }, { status: 400 });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return NextResponse.json({ error: "Incorrect password." }, { status: 400 });
      }
    }

    // Delete order items for this user's orders
    const userOrders = await db.query.orders.findMany({
      where: eq(orders.userId, userId),
      columns: { id: true },
    });

    const orderIds = userOrders.map((o) => o.id);
    if (orderIds.length > 0) {
      await db.delete(orderItems).where(inArray(orderItems.orderId, orderIds));
      await db.delete(orders).where(inArray(orders.id, orderIds));
    }

    // Delete user — cascade handles addresses, reviews, accounts, sessions
    await db.delete(users).where(eq(users.id, userId));

    await signOut({ redirect: false });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Failed to delete account." },
      { status: 500 }
    );
  }
}
