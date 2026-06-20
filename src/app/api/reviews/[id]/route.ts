import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { reviews, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  const review = await db.query.reviews.findFirst({
    where: eq(reviews.id, params.id),
  });

  if (!review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  if (review.userId !== userId) {
    return NextResponse.json({ error: "You can only delete your own reviews" }, { status: 403 });
  }

  const { productId } = review;

  await db.delete(reviews).where(eq(reviews.id, params.id));

  const stats = await db
    .select({
      avgRating: sql<number>`ROUND(AVG(${reviews.rating}), 1)`,
      count: sql<number>`COUNT(*)`,
    })
    .from(reviews)
    .where(eq(reviews.productId, productId));

  await db
    .update(products)
    .set({
      rating: stats[0].avgRating || 4.5,
      reviewCount: stats[0].count,
    })
    .where(eq(products.id, productId));

  return NextResponse.json({ success: true });
}
