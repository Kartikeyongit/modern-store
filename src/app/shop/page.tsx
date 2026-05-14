import { getProducts } from "@/lib/get-products";
import { ShopPageClient } from "./shop-page-client";

export default async function ShopPage() {
  const allProducts = await getProducts();
  return <ShopPageClient allProducts={allProducts} />;
}