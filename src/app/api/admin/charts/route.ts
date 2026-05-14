import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const allOrders = await db.query.orders.findMany({
      orderBy: (orders, { asc }) => [asc(orders.createdAt)],
    });

    // Revenue by month
    const monthlyRevenue: Record<string, number> = {};
    const monthlyOrders: Record<string, number> = {};

    allOrders.forEach((order) => {
      if (order.createdAt && order.paymentStatus === "Paid") {
        const date = new Date(order.createdAt);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        monthlyRevenue[key] = (monthlyRevenue[key] || 0) + (order.total || 0);
        monthlyOrders[key] = (monthlyOrders[key] || 0) + 1;
      }
    });

    // Get last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const monthName = d.toLocaleString("default", { month: "short" });
      months.push({
        name: monthName,
        revenue: Math.round(monthlyRevenue[key] || 0),
        orders: monthlyOrders[key] || 0,
      });
    }

    // Order status distribution
    const statusCount: Record<string, number> = {
      Pending: 0,
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };

    allOrders.forEach((order) => {
      if (order.status && statusCount[order.status] !== undefined) {
        statusCount[order.status]++;
      }
    });

    const statusData = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }));

    // Category distribution
    const categoryCount: Record<string, number> = {};
    const productsWithCategories = await db.query.products.findMany();
    productsWithCategories.forEach((product) => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });

    const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));

    return NextResponse.json({
      monthlyData: months,
      statusData,
      categoryData,
    });
  } catch (error) {
    console.error("Failed to fetch chart data:", error);
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }
}