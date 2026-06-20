import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: { password: true },
    });

    return NextResponse.json({ hasPassword: !!user?.password });
  } catch {
    return NextResponse.json({ error: "Failed to check password status." }, { status: 500 });
  }
}
