import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { reviews, orders, orderItems, products } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const allReviews = await db.query.reviews.findMany({
    where: eq(reviews.productId, productId),
    orderBy: desc(reviews.createdAt),
    with: {
      user: true,
    },
  });

  const mapped = allReviews.map((r) => ({
    id: r.id,
    productId: r.productId,
    userId: r.userId,
    rating: r.rating,
    title: r.title,
    body: r.body,
    createdAt: r.createdAt,
    user: { name: r.user?.name, image: r.user?.image },
  }));

  return NextResponse.json(mapped);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, rating, title, body } = await req.json();
  const userId = (session.user as { id: string }).id;

  if (!productId || !rating || !body) {
    return NextResponse.json({ error: "productId, rating, and body are required" }, { status: 400 });
  }

  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return NextResponse.json({ error: "Rating must be an integer between 1 and 5" }, { status: 400 });
  }

  const existing = await db.query.reviews.findFirst({
    where: and(eq(reviews.productId, productId), eq(reviews.userId, userId)),
  });

  if (existing) {
    return NextResponse.json({ error: "You have already reviewed this product" }, { status: 409 });
  }

  const purchase = await db
    .select({ id: orderItems.id })
    .from(orderItems)
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .where(and(eq(orderItems.productId, productId), eq(orders.userId, userId)))
    .limit(1);

  if (purchase.length === 0) {
    return NextResponse.json({ error: "You must purchase this product before reviewing" }, { status: 403 });
  }

  const id = uuidv4();
  await db.insert(reviews).values({ id, productId, userId, rating, title, body });

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
      rating: stats[0].avgRating,
      reviewCount: stats[0].count,
    })
    .where(eq(products.id, productId));

  const newReview = await db.query.reviews.findFirst({
    where: eq(reviews.id, id),
    with: { user: true },
  });

  return NextResponse.json({
    id: newReview!.id,
    productId: newReview!.productId,
    userId: newReview!.userId,
    rating: newReview!.rating,
    title: newReview!.title,
    body: newReview!.body,
    createdAt: newReview!.createdAt,
    user: { name: newReview!.user?.name, image: newReview!.user?.image },
  }, { status: 201 });
}
