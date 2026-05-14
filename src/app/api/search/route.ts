import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { like } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = await db.query.products.findMany({
      where: like(products.name, `%${query}%`),
      limit: 5,
    });

    const parsed = results.map((p) => ({
      ...p,
      images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}