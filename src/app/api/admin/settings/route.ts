import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { storeSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await db.query.storeSettings.findFirst({
    where: eq(storeSettings.id, "main"),
  });

  if (!settings) {
    return NextResponse.json({ error: "Settings not found" }, { status: 404 });
  }

  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { storeName, supportEmail, shippingThreshold, shippingRate, taxRate, currency } = body;

  const updated = await db
    .update(storeSettings)
    .set({
      storeName: storeName ?? "Modern Store",
      supportEmail: supportEmail ?? "support@modernstore.com",
      shippingThreshold: shippingThreshold ?? 100,
      shippingRate: shippingRate ?? 9.99,
      taxRate: taxRate ?? 0.08,
      currency: currency ?? "USD",
      updatedAt: new Date(),
    })
    .where(eq(storeSettings.id, "main"))
    .returning();

  return NextResponse.json(updated[0]);
}
