import { getProducts } from "@/lib/get-products";
import { NewArrivalsClient } from "./new-arrivals-client";

export default async function NewArrivalsPage() {
  const allProducts = await getProducts();
  const newProducts = allProducts.filter((p) => p.isNew);
  return <NewArrivalsClient newProducts={newProducts} />;
}