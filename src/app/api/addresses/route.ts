import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const userAddresses = await db.query.addresses.findMany({
    where: eq(addresses.userId, userId),
  });

  return NextResponse.json(userAddresses);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const userId = (session.user as { id: string }).id;

  // If this is set as default, remove default from others
  if (data.isDefault) {
    await db.update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  const id = uuidv4();
  await db.insert(addresses).values({
    id,
    userId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    country: data.country || "United States",
    label: data.label || "Home",
    isDefault: data.isDefault || false,
  });

  const newAddress = await db.query.addresses.findFirst({
    where: eq(addresses.id, id),
  });

  return NextResponse.json(newAddress, { status: 201 });
}