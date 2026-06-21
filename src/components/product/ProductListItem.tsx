"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

export function ProductListItem({ product }: { product: Product }) {
  const { data: session } = useSession();
  const isLiked = useWishlistStore((s) => s.isLiked(product.id));
  const toggleItem = useWishlistStore((s) => s.toggleItem);
  const addItem = useCartStore((s) => s.addItem);

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  const parsedColors =
    typeof product.colors === "string"
      ? JSON.parse(product.colors)
      : product.colors;

  const handleWishlistToggle = () => {
    if (!session) {
      signIn();
      return;
    }
    toggleItem(product.id);
  };

  return (
    <div className="flex border rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow">
      {/* Image */}
      <Link
        href={`/products/${product.id}`}
        className="w-48 flex-shrink-0 relative bg-gray-100"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="192px"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.stock === 0 && (
            <Badge className="bg-red-500 text-white border-0 text-xs">
              Out of Stock
            </Badge>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <Badge className="bg-amber-500 text-white border-0 text-xs">
              Low Stock
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-black text-white border-0 text-xs">New</Badge>
          )}
          {product.isSale && discount > 0 && (
            <Badge className="bg-black text-white border-0 text-xs">
              -{discount}%
            </Badge>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between p-5">
        <div className="space-y-2">
          {/* Category + Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating ?? ""}</span>
              <span className="text-sm text-gray-400">
                ({product.reviewCount ?? 0})
              </span>
            </div>
          </div>

          {/* Name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-500 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between mt-4">
          <div className="space-y-3">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.compareAtPrice}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            {parsedColors && (
              <div className="flex gap-1.5">
                {parsedColors.map(
                  (color: { name: string; hex: string }) => (
                    <span
                      key={color.hex}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  )
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handleWishlistToggle}
              className={cn(
                "h-9 w-9 rounded-full",
                isLiked && "border-red-200 bg-red-50"
              )}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                )}
              />
            </Button>
            {product.stock !== 0 ? (
              <Button
                onClick={() => addItem(product)}
                className="h-9 bg-gray-800 text-white hover:bg-gray-700"
              >
                <ShoppingBag className="h-4 w-4 mr-1.5" />
                Add to Cart
              </Button>
            ) : (
              <Button disabled className="h-9">
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
