"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/store/wishlist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductDetailClient({ product, relatedProducts }: { product: any; relatedProducts: any[] }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const wishlistStore = useWishlistStore();
  const isLiked = wishlistStore.isLiked(product?.id || "");

  const parsedColors = product?.colors && typeof product.colors === 'string' 
    ? JSON.parse(product.colors) 
    : product?.colors;
  const parsedSizes = product?.sizes && typeof product.sizes === 'string' 
    ? JSON.parse(product.sizes) 
    : product?.sizes;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="text-gray-500 mt-2">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize, quantity);
    openCart();
  };

  // Helper to determine if a color is light
  const isLightColor = (hex: string) => {
    const color = hex.replace("#", "");
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150;
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-black transition-colors">
            Home
          </a>
          <span>/</span>
          <a
            href={`/shop?category=${product.category}`}
            className="hover:text-black transition-colors"
          >
            {product.category}
          </a>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
            >
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        selectedImage === 0
                          ? product.images.length - 1
                          : selectedImage - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage(
                        selectedImage === product.images.length - 1
                          ? 0
                          : selectedImage + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                      selectedImage === index
                        ? "border-gray-500 border-3"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && (
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                  New
                </Badge>
              )}
              {product.isSale && discount > 0 && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white border-0">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {product.rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.compareAtPrice}
                </span>
              )}
              {product.isSale && discount > 0 && (
                <span className="text-sm font-semibold text-red-500">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {parsedColors && parsedColors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Color:{" "}
                  <span className="font-normal text-gray-500">
                    {parsedColors.find((c: any) => c.hex === selectedColor)
                      ?.name || "Select a color"}
                  </span>
                </h3>
                <div className="flex gap-3">
                  {parsedColors.map((color: any) => (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className={cn(
                        "relative w-10 h-10 rounded-full transition-all border-2",
                        selectedColor === color.hex
                          ? "ring-2 ring-offset-2 ring-black scale-110"
                          : "hover:scale-105"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.hex && (
                        <Check 
                          className={cn(
                            "absolute inset-0 m-auto h-5 w-5 drop-shadow-md",
                            isLightColor(color.hex) ? "text-black" : "text-white"
                          )} 
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {parsedSizes && parsedSizes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Size:{" "}
                  <span className="font-normal text-gray-500">
                    {selectedSize || "Select a size"}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {parsedSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-black border-2 bg-black text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-lg h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full hover:bg-gray-50 transition-colors rounded-l-lg"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 h-full hover:bg-gray-50 transition-colors rounded-r-lg"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 h-12 bg-gray-800 text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => wishlistStore.toggleItem(product.id)}
                className={cn(
                  "h-12 w-12 flex-shrink-0",
                  isLiked && "border-red-200 bg-red-50"
                )}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                  )}
                />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
              <Button variant="outline" className="flex-1" size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                <Truck className="h-4 w-4 mr-2" />
                Check Delivery
              </Button>
            </div>

            {/* Benefits */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-black" />
                Free shipping on orders over $100
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-black" />
                100% secure payment
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCcw className="h-5 w-5 text-black" />
                30-day easy returns
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reviews Summary */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-gray-900">
                {product.rating}
              </div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Based on {product.reviewCount} reviews
              </p>
            </div>

            {/* Review Bars */}
            <div className="md:col-span-2 space-y-3">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 w-6">
                    {star}★
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          star === 5
                            ? 70
                            : star === 4
                            ? 20
                            : star === 3
                            ? 7
                            : star === 2
                            ? 2
                            : 1
                        }%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-yellow-400 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-10">
                    {star === 5
                      ? "70%"
                      : star === 4
                      ? "20%"
                      : star === 3
                      ? "7%"
                      : star === 2
                      ? "2%"
                      : "1%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}