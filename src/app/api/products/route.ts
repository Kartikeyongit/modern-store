import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const allProducts = await db.query.products.findMany({
      orderBy: desc(products.createdAt),
    });
    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const id = uuidv4();
    
    await db.insert(products).values({
      id,
      name: data.name,
      description: data.description || "",
      price: data.price,
      category: data.category,
      images: JSON.stringify(data.images || []),
      stock: data.stock || 0,
      status: "Active",
      colors: data.colors ? JSON.stringify(data.colors) : null,
      sizes: data.sizes ? JSON.stringify(data.sizes) : null,
      compareAtPrice: data.compareAtPrice || null,
      isNew: data.isNew || false,
      isSale: data.isSale || false,
    });

    const newProduct = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.id, id),
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}