"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { Tag, ArrowRight, Flame, Sparkles } from "lucide-react";
import Link from "next/link";

const discountRanges = [
  { label: "All Deals", min: 0, max: 100 },
  { label: "30% Off & More", min: 30, max: 100 },
  { label: "40% Off & More", min: 40, max: 100 },
  { label: "50% Off & More", min: 50, max: 100 },
];

import type { Product } from "@/types/product";

export function SaleClient({ saleProducts }: { saleProducts: Product[] }) {
  const [selectedDiscount, setSelectedDiscount] = useState("All Deals");

  const filteredProducts = useMemo(() => {
    const range = discountRanges.find((r) => r.label === selectedDiscount);
    if (!range || range.min === 0) return saleProducts;
    return saleProducts.filter((p) => {
      const discount = ((p.compareAtPrice! - p.price) / p.compareAtPrice!) * 100;
      return discount >= range.min;
    });
  }, [selectedDiscount, saleProducts]);

  const biggestDeal = saleProducts[0];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[55vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="px-4 py-2 text-sm mb-6 gap-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Flame className="h-4 w-4" />
              Limited Time Only
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 tracking-tight">Big Sale</h1>
            <p className="text-3xl md:text-4xl font-bold text-white/80 mb-4">Up to 50% Off</p>
            <p className="text-lg text-white/50 font-light max-w-xl mx-auto mb-8">
              Incredible deals on premium products. Don&apos;t miss out &mdash; these prices won&apos;t last!
            </p>
            <Link href="#deals">
              <Button size="lg" className="bg-white text-black hover:bg-neutral-100 text-lg px-10 py-6 group">
                Shop Deals
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── BIGGEST DEAL BANNER ─── */}
      {biggestDeal && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Badge className="bg-black text-white border-0 px-4 py-2 text-sm shrink-0">
                <Sparkles className="h-4 w-4 mr-1" />
                Best Deal
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-neutral-400 tracking-[0.15em] uppercase mb-1">Biggest Discount</p>
                <p className="text-lg md:text-xl font-bold text-neutral-900 truncate">
                  {biggestDeal.name}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-2xl font-bold text-neutral-900">
                  {Math.round(((biggestDeal.compareAtPrice! - biggestDeal.price) / biggestDeal.compareAtPrice!) * 100)}% Off
                </span>
                <Link href={`/products/${biggestDeal.id}`}>
                  <Button className="bg-black text-white hover:bg-neutral-800">
                    Grab Deal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ─── DEALS SECTION ─── */}
      <section id="deals" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Deals</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Shop the Sale</h2>
            <p className="text-neutral-500 mt-2 font-light">Limited-time discounts on premium products</p>
          </motion.div>

          {/* Discount Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 flex-wrap mb-10 pb-6 border-b border-neutral-200"
          >
            <Tag className="h-5 w-5 text-neutral-400 shrink-0" />
            {discountRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setSelectedDiscount(range.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDiscount === range.label
                    ? "bg-black text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {range.label}
              </button>
            ))}
          </motion.div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-neutral-200 rounded-2xl">
              <Tag className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900">No deals found</h3>
              <p className="text-neutral-500 mt-2 font-light">Try selecting a different discount range.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
