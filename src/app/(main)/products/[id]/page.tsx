import { getProductById, getRelatedProducts } from "@/lib/get-products";
import { ProductDetailClient } from "./product-detail-client";

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  const relatedProducts = product
    ? await getRelatedProducts(product.category, params.id, 4)
    : [];

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
