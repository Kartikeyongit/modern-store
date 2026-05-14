import { getProducts } from "@/lib/get-products";
import { ProductDetailClient } from "./product-detail-client";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const allProducts = await getProducts();
  const product = allProducts.find((p) => p.id === params.id) || null;
  const relatedProducts = product
    ? allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}