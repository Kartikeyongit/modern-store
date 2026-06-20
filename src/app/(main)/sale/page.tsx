import { getProducts } from "@/lib/get-products";
import { SaleClient } from "./sale-client";

export default async function SalePage() {
  const allProducts = await getProducts();
  const saleProducts = allProducts
    .filter((p) => p.isSale && p.compareAtPrice)
    .sort((a, b) => {
      const discountA = ((a.compareAtPrice! - a.price) / a.compareAtPrice!) * 100;
      const discountB = ((b.compareAtPrice! - b.price) / b.compareAtPrice!) * 100;
      return discountB - discountA;
    });
  return <SaleClient saleProducts={saleProducts} />;
}