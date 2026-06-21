"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/wishlist";
import type { Product } from "@/types/product";
import { ArrowLeft, Heart } from "lucide-react";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (items.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const parsed = data.map((p: Product) => ({
          ...p,
          images: typeof p.images === 'string' ? JSON.parse(p.images) : p.images,
          colors: typeof p.colors === 'string' && p.colors ? JSON.parse(p.colors) : p.colors,
          sizes: typeof p.sizes === 'string' && p.sizes ? JSON.parse(p.sizes) : p.sizes,
        }));
        const wishlistItems = parsed.filter((p: Product) => items.includes(p.id));
        setProducts(wishlistItems);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistProducts();
  }, [items]);

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Account
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 mt-1">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Your wishlist is empty</h3>
            <p className="text-gray-500 mt-2">Start adding products you love!</p>
            <Link href="/shop">
              <Button className="mt-6 bg-black text-white hover:bg-gray-800">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}