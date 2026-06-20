import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    
    await db.update(products)
      .set({
        name: data.name,
        description: data.description || "",
        price: data.price,
        category: data.category,
        images: JSON.stringify(data.images || []),
        stock: data.stock || 0,
        isNew: data.isNew || false,
        isSale: data.isSale || false,
        compareAtPrice: data.compareAtPrice || null,
        colors: data.colors ? JSON.stringify(data.colors) : null,
        sizes: data.sizes ? JSON.stringify(data.sizes) : null,
        details: data.details ? JSON.stringify(data.details) : null,
        updatedAt: new Date(),
      })
      .where(eq(products.id, params.id));

    const updated = await db.query.products.findFirst({
      where: eq(products.id, params.id),
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(products).where(eq(products.id, params.id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}