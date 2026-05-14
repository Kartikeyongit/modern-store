"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";
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

export function NewArrivalsClient({ newProducts }: { newProducts: any[] }) {

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="px-4 py-2 text-sm mb-6 gap-2 bg-black text-white border-0">
              <Sparkles className="h-4 w-4" />
              Fresh Drops
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">New Arrivals</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be the first to discover our latest products. Fresh designs, innovative features, and limited editions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* New Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Just Dropped</h2>
            <p className="text-gray-500 mt-1">The latest additions to our store</p>
          </div>
        </div>
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={{ ...product, isNew: true }} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No new arrivals at the moment. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Coming Soon */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Coming Soon</h2>
            <p className="text-gray-500 mt-1">Get a sneak peek at what's launching next</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comingSoon.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border overflow-hidden group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-black text-white border-0">{item.releaseDate}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <Button variant="outline" className="w-full" disabled>
                    Notify Me
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Drop</h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Subscribe to get notified about new arrivals, exclusive launches, and special offers.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:border-white/40 h-10"
              />
              <Button className="bg-white text-black hover:bg-gray-200 h-10">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}