import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminOrdersClient } from "./orders-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOrdersPage() {
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

  return <AdminOrdersClient initialOrders={allOrders} />;
}