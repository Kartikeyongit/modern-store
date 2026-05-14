import { getProducts } from "@/lib/get-products";
import { HomePageClient } from "./home-page-client";

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter((p) => p.isNew || p.isSale).slice(0, 4);

  return <HomePageClient featuredProducts={featuredProducts} />;
}