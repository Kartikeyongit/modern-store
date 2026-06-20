"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

const collections = [
  {
    id: "summer-essentials",
    name: "Summer Essentials",
    description: "Lightweight and breathable pieces for the warmer months",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop",
    productCount: 24,
  },
  {
    id: "tech-lifestyle",
    name: "Tech Lifestyle",
    description: "Premium gadgets and accessories for the modern digital life",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=600&fit=crop",
    productCount: 18,
  },
  {
    id: "minimalist-workspace",
    name: "Minimalist Workspace",
    description: "Clean, functional designs for your productive space",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    productCount: 15,
  },
  {
    id: "travel-gear",
    name: "Travel Gear",
    description: "Everything you need for your next adventure",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    productCount: 12,
  },
  {
    id: "evening-elegance",
    name: "Evening Elegance",
    description: "Sophisticated pieces for special occasions",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    productCount: 10,
  },
  {
    id: "everyday-carry",
    name: "Everyday Carry",
    description: "Essential items you'll reach for daily",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&h=600&fit=crop",
    productCount: 20,
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Curated Sets</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Our Collections</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              Curated collections designed for every aspect of your modern lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── COLLECTIONS GRID ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Browse</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Explore Collections</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/shop?collection=${collection.id}`} className="group block">
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs text-white/60 tracking-wide uppercase mb-2 block">{collection.productCount} Products</span>
                      <h3 className="text-2xl font-bold text-white mb-1">{collection.name}</h3>
                      <p className="text-sm text-white/60 font-light mb-3">{collection.description}</p>
                      <span className="inline-flex items-center text-sm font-medium text-white group-hover:underline">
                        Explore Collection
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Can&apos;t Find What You&apos;re Looking For?</h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto font-light">
              Browse our complete catalog of products or use our search to find exactly what you need.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-neutral-100 text-lg px-8 py-6">
                Browse All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
