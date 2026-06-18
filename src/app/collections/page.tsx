"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "summer-essentials",
    name: "Summer Essentials",
    description: "Lightweight and breathable pieces for the warmer months",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop",
    productCount: 24,
    color: "from-black to-gray-500",
  },
  {
    id: "tech-lifestyle",
    name: "Tech Lifestyle",
    description: "Premium gadgets and accessories for the modern digital life",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=600&fit=crop",
    productCount: 18,
    color: "from-black to-gray-500",
  },
  {
    id: "minimalist-workspace",
    name: "Minimalist Workspace",
    description: "Clean, functional designs for your productive space",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    productCount: 15,
    color: "from-black to-gray-500",
  },
  {
    id: "travel-gear",
    name: "Travel Gear",
    description: "Everything you need for your next adventure",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
    productCount: 12,
    color: "from-black to-gray-500",
  },
  {
    id: "evening-elegance",
    name: "Evening Elegance",
    description: "Sophisticated pieces for special occasions",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    productCount: 10,
    color: "from-black to-gray-500",
  },
  {
    id: "everyday-carry",
    name: "Everyday Carry",
    description: "Essential items you'll reach for daily",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&h=600&fit=crop",
    productCount: 20,
    color: "from-black to-gray-500",
  },
];

export default function CollectionsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Collections</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Curated collections designed for every aspect of your modern lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
            >
              <Link href={`/shop?collection=${collection.id}`}>
                <div className="relative h-80">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${collection.color} mb-3`}>
                      {collection.productCount} Products
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      {collection.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-white group-hover:underline">
                      Explore Collection
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg text-white/80 mb-6 max-w-lg mx-auto">
              Browse our complete catalog of products or use our search to find exactly what you need.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Browse All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}