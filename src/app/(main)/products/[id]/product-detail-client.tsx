"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useWishlistStore } from "@/store/wishlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types/product";
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
  Trash2,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  userId: string;
  rating: number;
  title: string | null;
  body: string;
  createdAt: number | Date | null;
  user: { name: string | null; image: string | null };
}

export function ProductDetailClient({ product, relatedProducts }: { product: Product | null; relatedProducts: Product[] }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { data: session } = useSession();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const parsedSizes = product?.sizes && typeof product.sizes === 'string' 
    ? JSON.parse(product.sizes) 
    : product?.sizes;
  const [selectedSize, setSelectedSize] = useState(parsedSizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const wishlistStore = useWishlistStore();
  const isLiked = wishlistStore.isLiked(product?.id || "");

  const handleWishlistToggle = () => {
    if (!session) {
      signIn();
      return;
    }
    if (!product) return;
    wishlistStore.toggleItem(product.id);
  };

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!product?.id) return;
    const load = async () => {
      setReviewLoading(true);
      try {
        const res = await fetch(`/api/reviews?productId=${product.id}`);
        if (res.ok) setReviews(await res.json());
      } catch {
        console.error("Failed to fetch reviews");
      } finally {
        setReviewLoading(false);
      }
    };
    load();
  }, [product?.id]);

  const parsedColors = product?.colors && typeof product.colors === 'string' 
    ? JSON.parse(product.colors) 
    : product?.colors;
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
          <p className="text-gray-500 mt-2">
            The product you&apos;re looking for doesn&apos;t exist.
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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!formBody.trim()) {
      setFormError("Please write a review.");
      return;
    }
    setFormSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product?.id, rating: formRating, title: formTitle, body: formBody }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => [data, ...prev]);
        setShowReviewForm(false);
        setFormTitle("");
        setFormBody("");
        setFormRating(5);
      } else {
        setFormError(data.error || "Failed to submit review.");
      }
    } catch {
      setFormError("Something went wrong.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    setDeletingId(reviewId);
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } catch {
      console.error("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
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
                    {parsedColors.find((c: { hex: string; name: string }) => c.hex === selectedColor)
                      ?.name || "Select a color"}
                  </span>
                </h3>
                <div className="flex gap-3">
                  {parsedColors.map((color: { hex: string; name: string }) => (
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
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Size:{" "}
                    <span className="font-normal text-gray-500">
                      {selectedSize || "Select a size"}
                    </span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => alert("Size guide coming soon")}
                    className="text-xs text-gray-500 hover:text-black underline underline-offset-2 transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {parsedSizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "min-w-[3rem] px-5 py-2.5 rounded-full border text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-black bg-black text-white shadow-sm"
                          : "border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className="flex items-center gap-2">
                {product.stock === 0 ? (
                  <span className="text-sm font-medium text-red-500">
                    Out of Stock
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="text-sm font-medium text-amber-600">
                    Low Stock
                  </span>
                ) : (
                  <span className="text-sm font-medium text-green-600">
                    In Stock
                  </span>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-lg h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.stock === 0}
                  className={cn(
                    "px-4 h-full transition-colors rounded-l-lg",
                    product.stock === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  )}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock ?? 99, quantity + 1))}
                  disabled={product.stock === 0 || quantity >= (product.stock ?? 99)}
                  className={cn(
                    "px-4 h-full transition-colors rounded-r-lg",
                    product.stock === 0 || quantity >= (product.stock ?? 99)
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                disabled={product.stock === 0}
                className="flex-1 h-12 bg-gray-800 text-white hover:bg-white hover:text-black border-2 border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 disabled:hover:text-white"
              >
                {product.stock === 0 ? "Out of Stock" : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
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

        {/* Product Details */}
        {product.details && product.details.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Product Details</h2>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  {product.details.map((detail, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">{detail.label}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section className="mt-20" id="reviews">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews
            </h2>
            {session && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-black"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {showReviewForm ? "Cancel" : "Write a Review"}
              </Button>
            )}
          </div>

          {/* Review Form */}
          <AnimatePresence>
            {showReviewForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8"
              >
                <form onSubmit={handleSubmitReview} className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">Write Your Review</h3>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormRating(star)}
                          className="p-0.5"
                        >
                          <Star
                            className={cn(
                              "h-7 w-7",
                              star <= formRating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title (optional)</label>
                    <Input
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Summarize your experience"
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                    <textarea
                      value={formBody}
                      onChange={(e) => setFormBody(e.target.value)}
                      placeholder="Tell others about your experience with this product..."
                      required
                      rows={4}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-red-600">{formError}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={formSubmitting}
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
                  >
                    {formSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {reviewLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No reviews yet.</p>
              {session && (
                <p className="text-sm text-gray-400 mt-1">Be the first to review this product!</p>
              )}
            </div>
          ) : (
            <>
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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
                    Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="md:col-span-2 space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter((r) => r.rating === star).length;
                    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 w-6">
                          {star}★
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="h-full bg-yellow-400 rounded-full"
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-10 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {review.user?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {review.user?.name || "Anonymous"}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-3.5 w-3.5",
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">
                              {review.createdAt
                                ? new Date(review.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      {review.userId === (session?.user as { id?: string })?.id && (
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          disabled={deletingId === review.id}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete your review"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {review.title && (
                      <h4 className="text-sm font-semibold text-gray-900 mt-3">{review.title}</h4>
                    )}
                    <p className="text-sm text-gray-600 mt-1">{review.body}</p>
                  </div>
                ))}
              </div>
            </>
          )}
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