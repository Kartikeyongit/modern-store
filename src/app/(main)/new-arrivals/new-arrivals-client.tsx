"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const comingSoon = [
  {
    id: "cs-1",
    name: "Smart Home Hub",
    description: "Central control for all your smart devices with voice assistant built-in.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop",
    releaseDate: "June 2026",
  },
  {
    id: "cs-2",
    name: "Foldable Drone",
    description: "4K camera drone with 40-minute flight time and obstacle avoidance.",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=600&h=400&fit=crop",
    releaseDate: "July 2026",
  },
  {
    id: "cs-3",
    name: "Sustainable Sneakers",
    description: "Eco-friendly sneakers made from recycled ocean plastics.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
    releaseDate: "August 2026",
  },
];

import type { Product } from "@/types/product";

export function NewArrivalsClient({ newProducts }: { newProducts: Product[] }) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="px-4 py-2 text-sm mb-6 gap-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Fresh Drops
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">New Arrivals</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              Be the first to discover our latest products. Fresh designs, innovative features, and limited editions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── JUST DROPPED ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Just Dropped</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Fresh Arrivals</h2>
            <p className="text-neutral-500 mt-2 font-light">The latest additions to our store</p>
          </motion.div>

          {newProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={{ ...product, isNew: true }} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-neutral-200 rounded-2xl">
              <Sparkles className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 font-light">No new arrivals at the moment. Check back soon!</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/shop">
              <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 px-8">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── COMING SOON ─── */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Coming Soon</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">What&apos;s Next</h2>
            <p className="text-neutral-500 mt-2 font-light">Get a sneak peek at what&apos;s launching next</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comingSoon.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden group hover:shadow-sm transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black text-white border-0 flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {item.releaseDate}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-neutral-500 font-light mb-4">{item.description}</p>
                  <Button variant="outline" className="w-full border-neutral-200 text-neutral-700" disabled>
                    Notify Me
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-black">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-10 w-10 text-white/30 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Never Miss a Drop</h2>
            <p className="text-neutral-400 mb-8 max-w-md mx-auto font-light">
              Subscribe to get notified about new arrivals, exclusive launches, and special offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/40"
                required
              />
              <Button type="submit" className="h-12 px-8 bg-white text-black hover:bg-neutral-100 rounded-xl">
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-neutral-500 mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
