import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminProductsClient } from "./products-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsPage() {
  const allProducts = await db.query.products.findMany({
    orderBy: desc(products.createdAt),
  });

  const parsedProducts = allProducts.map((product) => ({
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    colors: typeof product.colors === 'string' && product.colors ? JSON.parse(product.colors) : product.colors,
    sizes: typeof product.sizes === 'string' && product.sizes ? JSON.parse(product.sizes) : product.sizes,
    isNew: Boolean(product.isNew),
    isSale: Boolean(product.isSale),
  }));

  return <AdminProductsClient initialProducts={parsedProducts} />;
}