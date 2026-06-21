import { Suspense } from "react";
import { getProducts } from "@/lib/get-products";
import { ShopPageClient } from "./shop-page-client";

export const revalidate = 60;

export default async function ShopPage() {
  const allProducts = await getProducts();
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
      </div>
    }>
      <ShopPageClient allProducts={allProducts} />
    </Suspense>
  );
}