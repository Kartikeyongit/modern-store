import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { cache } from "react";

export const getProducts = cache(async () => {
  const allProducts = await db.query.products.findMany({
    orderBy: desc(products.createdAt),
  });

  return allProducts.map((product) => ({
    ...product,
    images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
    colors: typeof product.colors === 'string' && product.colors ? JSON.parse(product.colors) : product.colors,
    sizes: typeof product.sizes === 'string' && product.sizes ? JSON.parse(product.sizes) : product.sizes,
    isNew: Boolean(product.isNew),
    isSale: Boolean(product.isSale),
  }));
});