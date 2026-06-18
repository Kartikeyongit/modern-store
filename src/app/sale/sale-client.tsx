"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { Tag, ArrowRight, Percent, Flame, Sparkles } from "lucide-react";
import Link from "next/link";

const discountRanges = [
  { label: "All Deals", min: 0, max: 100 },
  { label: "30% Off & More", min: 30, max: 100 },
  { label: "40% Off & More", min: 40, max: 100 },
  { label: "50% Off & More", min: 50, max: 100 },
];

export function SaleClient({ saleProducts }: { saleProducts: any[] }) {
  const [selectedDiscount, setSelectedDiscount] = useState("All Deals");

  const filteredProducts = useMemo(() => {
    const range = discountRanges.find((r) => r.label === selectedDiscount);
    if (!range || range.min === 0) return saleProducts;
    return saleProducts.filter((p) => {
      const discount = ((p.compareAtPrice - p.price) / p.compareAtPrice) * 100;
      return discount >= range.min;
    });
  }, [selectedDiscount, saleProducts]);

  const biggestDeal = saleProducts[0];

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="px-4 py-2 text-sm mb-6 gap-2 bg-black text-white border-0">
              <Flame className="h-4 w-4" />
              Limited Time Only
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">Big Sale</h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Up to 50% Off</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Incredible deals on premium products. Don't miss out — these prices won't last!
            </p>
            <Link href="#deals">
              <Button size="lg" className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors">
                Shop Deals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Biggest Deal Banner */}
      {biggestDeal && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="bg-black rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-4 flex-wrap">
              <Badge className="bg-white text-black text-lg px-3 py-1 pt-5 pb-5">Best Deal</Badge>
              <div>
                <p className="text-white/90 text-sm">Biggest Discount</p>
                <p className="text-white text-xl font-bold">
                  {biggestDeal.name} —{" "}
                  {Math.round(((biggestDeal.compareAtPrice - biggestDeal.price) / biggestDeal.compareAtPrice) * 100)}% Off
                </p>
              </div>
              <Link href={`/products/${biggestDeal.id}`} className="ml-auto">
                <Button className="bg-white text-black hover:bg-gray-100">
                  Grab Deal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Discount Filters */}
      <section id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <Tag className="h-5 w-5 text-black" />
          {discountRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedDiscount(range.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedDiscount === range.label
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </section>

      {/* Sale Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No deals found</h3>
            <p className="text-gray-500 mt-2">Try selecting a different discount range.</p>
          </div>
        )}
      </section>
    </main>
  );
}