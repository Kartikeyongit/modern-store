import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { addresses } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.delete(addresses).where(
    and(
      eq(addresses.id, params.id),
      eq(addresses.userId, (session.user as any).id)
    )
  );

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const userId = (session.user as any).id;

  if (data.isDefault) {
    await db.update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
  }

  await db.update(addresses)
    .set(data)
    .where(
      and(
        eq(addresses.id, params.id),
        eq(addresses.userId, userId)
      )
    );

  return NextResponse.json({ success: true });
}