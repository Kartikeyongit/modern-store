import { db } from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminCustomersClient } from "./customers-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminCustomersPage() {
  const customers = await db.query.users.findMany({
    orderBy: desc(users.createdAt),
  });

  return <AdminCustomersClient initialCustomers={customers} />;
}