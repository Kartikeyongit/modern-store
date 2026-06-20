import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq, or } from "drizzle-orm";
import { cache } from "react";

const parseProduct = (product: typeof products.$inferSelect) => ({
  ...product,
  images: typeof product.images === "string" ? JSON.parse(product.images) : product.images,
  colors: typeof product.colors === "string" && product.colors ? JSON.parse(product.colors) : product.colors,
  sizes: typeof product.sizes === "string" && product.sizes ? JSON.parse(product.sizes) : product.sizes,
  details: typeof product.details === "string" && product.details ? JSON.parse(product.details) : product.details,
  stock: product.stock ?? 0,
  isNew: Boolean(product.isNew),
  isSale: Boolean(product.isSale),
});

export const getProducts = cache(async () => {
  const allProducts = await db.query.products.findMany({
    orderBy: desc(products.createdAt),
  });

  return allProducts.map(parseProduct);
});

export const getFeaturedProducts = cache(async (limit = 6) => {
  const featured = await db.query.products.findMany({
    where: or(eq(products.isNew, true), eq(products.isSale, true)),
    orderBy: desc(products.createdAt),
    limit,
  });

  return featured.map(parseProduct);
});

export const getProductById = cache(async (id: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
  });

  return product ? parseProduct(product) : null;
});

export const getRelatedProducts = cache(async (category: string, excludeId: string, limit = 4) => {
  const related = await db.query.products.findMany({
    where: eq(products.category, category),
    orderBy: desc(products.createdAt),
    limit: limit + 1,
  });

  return related.filter((p) => p.id !== excludeId).slice(0, limit).map(parseProduct);
});
