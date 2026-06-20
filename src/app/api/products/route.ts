import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

function parseJSONFields(product: Record<string, unknown>) {
  return {
    ...product,
    images: typeof product.images === "string" ? JSON.parse(product.images as string) : product.images,
    colors: typeof product.colors === "string" && product.colors ? JSON.parse(product.colors as string) : product.colors,
    sizes: typeof product.sizes === "string" && product.sizes ? JSON.parse(product.sizes as string) : product.sizes,
    details: typeof product.details === "string" && product.details ? JSON.parse(product.details as string) : product.details,
  };
}

export async function GET() {
  try {
    const allProducts = await db.query.products.findMany({
      orderBy: desc(products.createdAt),
    });
    return NextResponse.json(allProducts.map(parseJSONFields));
  } catch {
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
      details: data.details ? JSON.stringify(data.details) : null,
      compareAtPrice: data.compareAtPrice || null,
      isNew: data.isNew || false,
      isSale: data.isSale || false,
    });

    const newProduct = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.id, id),
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}