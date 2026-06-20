import { getFeaturedProducts } from "@/lib/get-products";
import { HomePageClient } from "./home-page-client";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(6);

  return <HomePageClient featuredProducts={featuredProducts} />;
}