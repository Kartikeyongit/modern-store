import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users, orders } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { AdminCustomersClient } from "./customers-client";
import type { Customer } from "./customers-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminCustomersPage() {
  const session = await auth();
  const currentUserId = session?.user?.id ?? "";

  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      createdAt: users.createdAt,
      orderCount: sql<number>`count(${orders.id})`.as("order_count"),
      totalSpent: sql<number>`coalesce(sum(${orders.total}), 0)`.as("total_spent"),
      lastOrderDate: sql<Date | null>`max(${orders.createdAt})`.as("last_order_date"),
    })
    .from(users)
    .leftJoin(orders, eq(orders.userId, users.id))
    .groupBy(users.id)
    .orderBy(desc(users.createdAt));

  const customers: Customer[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    image: row.image,
    createdAt: row.createdAt,
    orderCount: Number(row.orderCount),
    totalSpent: Number(row.totalSpent),
    lastOrderDate: row.lastOrderDate,
  }));

  return <AdminCustomersClient initialCustomers={customers} currentUserId={currentUserId} />;
}