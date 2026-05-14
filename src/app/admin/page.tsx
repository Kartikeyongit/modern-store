import { db } from "@/db";
import { products, orders, users } from "@/db/schema";
import { desc, count } from "drizzle-orm";
import { AdminDashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboard() {
  const allProducts = await db.select({ count: count() }).from(products);
  const allOrders = await db.query.orders.findMany({
    orderBy: desc(orders.createdAt),
    with: { user: true },
  });
  const allUsers = await db.select({ count: count() }).from(users);

  const totalRevenue = allOrders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const stats = {
    totalProducts: allProducts[0]?.count || 0,
    totalOrders: allOrders.length,
    totalCustomers: allUsers[0]?.count || 0,
    totalRevenue,
    recentOrders: allOrders.slice(0, 5),
  };

  return <AdminDashboardClient stats={stats} />;
}