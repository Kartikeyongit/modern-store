"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();
  const wishlistStore = useWishlistStore();
  const isLiked = wishlistStore.isLiked(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      signIn();
      return;
    }
    wishlistStore.toggleItem(product.id);
  };
    // Parse colors and sizes if they're strings (from API)
  const parsedColors = typeof product.colors === 'string' 
    ? JSON.parse(product.colors) 
    : product.colors;

  const [selectedColor, setSelectedColor] = useState(parsedColors?.[0]?.hex);
  const addItem = useCartStore((state) => state.addItem);

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {product.stock === 0 && (
            <Badge className="bg-red-500 text-white border-0">
              Out of Stock
            </Badge>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <Badge className="bg-amber-500 text-white border-0">
              Low Stock
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-gradient-to-r from-black to-gray-400 text-white border-0">
              New
            </Badge>
          )}
          {product.isSale && discount > 0 && (
            <Badge className="bg-gradient-to-r from-black to-gray-400 text-white border-0">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Product Images */}
        <Link href={`/products/${product.id}`}>
            <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={cn(
                "object-cover transition-all duration-700 cursor-pointer",
                isHovered && product.images[1] ? "opacity-0" : "opacity-100",
                "group-hover:scale-110"
                )}
                sizes="(max-width: 768px) 50vw, 25vw"
            />
        </Link>
        {product.images[1] && (
        <Link href={`/products/${product.id}`}>
            <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className={cn(
                "object-cover transition-all duration-700 absolute inset-0",
                isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
            )}
            sizes="(max-width: 768px) 50vw, 25vw"
            />
        </Link>
        )}

        {/* Quick Actions - Right Side */}
        <div
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          )}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className={cn(
              "p-2.5 rounded-full shadow-lg transition-colors",
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 hover:text-red-500"
            )}
          >
            <Heart
              className="h-4 w-4"
              fill={isLiked ? "currentColor" : "none"}
            />
          </motion.button>
        </div>

        {/* Add to Cart Button - Bottom */}
        {product.stock !== 0 && (
          <div
            className={cn(
              "absolute bottom-4 left-4 right-4 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button
              onClick={() => addItem(product)}
              className="w-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 shadow-lg border border-white/20"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 group-hover:text-gray-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Color Swatches */}
        {parsedColors && (
          <div className="flex gap-1.5 mt-1">
            {parsedColors.map((color: { name: string; hex: string }) => (
              <button
                key={color.hex}
                onClick={() => setSelectedColor(color.hex)}
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all",
                  selectedColor === color.hex
                    ? "border-gray-900 scale-110"
                    : "border-gray-200 hover:scale-105"
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}