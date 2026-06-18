"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Clock,
  Globe,
  Heart,
  Zap,
  ChevronRight,
} from "lucide-react";

const stripItems = [
  "Premium Quality Products",
  "Curated for Modern Lifestyle",
  "Designed with Purpose",
  "Innovation Meets Style",
  "Handpicked Collections",
  "Elevate Your Everyday",
];

const categoryStrip = [
  "Electronics — Premium Gadgets",
  "Accessories — Curated Collection",
  "Home & Living — Designer Pieces",
  "Fashion — Timeless Style",
  "New Arrivals Weekly",
  "Free Shipping Over $100",
];

const serviceStrip = [
  "Free Worldwide Shipping",
  "30-Day Easy Returns",
  "24/7 Customer Support",
  "100% Secure Checkout",
  "Premium Quality Guarantee",
  "50K+ Happy Customers",
];

const testimonialStrip = [
  "★ 4.9 Average Rating",
  "Trusted by 50,000+ Customers",
  "Ships to 150+ Countries",
  "Same-Day Dispatch Available",
  "Eco-Friendly Packaging",
  "Lifetime Support",
];

const categories = [
  {
    name: "Electronics",
    description: "Premium gadgets for the modern lifestyle",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
    href: "/shop?category=Electronics",
    color: "from-blue-600 to-cyan-500",
    count: "24+ Products",
  },
  {
    name: "Accessories",
    description: "Complete your look with our curated collection",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=600&fit=crop",
    href: "/shop?category=Accessories",
    color: "from-purple-600 to-pink-500",
    count: "36+ Products",
  },
  {
    name: "Home & Living",
    description: "Transform your space with designer pieces",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",
    href: "/shop?category=Home+%26+Living",
    color: "from-emerald-600 to-teal-500",
    count: "18+ Products",
  },
];

const services = [
  { icon: Truck, title: "Free Shipping", description: "Free worldwide shipping on all orders over $100. Fast and reliable delivery to your doorstep." },
  { icon: Shield, title: "Secure Payment", description: "Your payment information is always protected with industry-standard SSL encryption." },
  { icon: RotateCcw, title: "Easy Returns", description: "Not satisfied? Return any product within 30 days for a full refund. No questions asked." },
  { icon: Clock, title: "24/7 Support", description: "Our dedicated support team is available around the clock to help you with any questions." },
  { icon: Globe, title: "Global Shipping", description: "We ship to over 150 countries worldwide. Wherever you are, we'll get it to you." },
  { icon: Heart, title: "Quality Guarantee", description: "Every product is handpicked and quality-checked before it reaches you. Premium only." },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "2K+", label: "Premium Products" },
  { value: "150+", label: "Countries Shipped" },
  { value: "4.9", label: "Average Rating" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Verified Buyer",
    text: "The quality exceeded my expectations. Fast shipping and beautiful packaging. Will definitely order again!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "Regular Customer",
    text: "I've been shopping here for over a year. The product curation is excellent and customer service is top-notch.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Emily Davis",
    role: "First-Time Buyer",
    text: "My first purchase and I'm impressed! The website is easy to use and the checkout process was seamless.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export function HomePageClient({ featuredProducts }: { featuredProducts: any[] }) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 pb-16">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 10 }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.3, 1] }}
          transition={{ duration: 10 }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-pink-200/50 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: 180, scale: [1, 1.15, 1] }}
          transition={{ duration: 10 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-3xl"
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="px-4 py-2 text-sm mb-8 gap-2 bg-black/5 text-gray-700 border-gray-200 backdrop-blur-md mt-20">
              <Sparkles className="h-4 w-4" />
              Premium Shopping Experience
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-400 mb-6 leading-tight">
              Style Meets
              <br />
              <span className="text-gray-800">
                Innovation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover a new era of online shopping. Curated collections, premium quality, and an experience designed around you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6 group">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/collections">
                <Button size="lg" variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 text-lg px-8 py-6">
                  View Collections
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pb-16 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── INFINITE MOVING STRIP ─── */}
      <div className="relative z-20 bg-white py-10 overflow-hidden -mt-10">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...stripItems, ...stripItems].map((item, index) => (
            <span key={index} className="text-gray-700 text-sm font-medium tracking-wide flex items-center gap-4">
              <span className="w-2 h-2 bg-gray-400 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── CATEGORY BANNERS ─── */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Explore our carefully curated categories and find exactly what you're looking for</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div key={category.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: index * 0.15 }}>
                <Link href={category.href} className="group block">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <Badge className="w-fit mb-3 bg-white/90 text-gray-900 border-white/30 backdrop-blur-sm">{category.count}</Badge>
                      <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-white/90 text-sm mb-4">{category.description}</p>
                      <span className="inline-flex items-center text-white font-medium text-sm group-hover:underline">
                        Browse Category
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

      {/* ─── SERVICES SECTION ─── */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gray-50/85 backdrop-blur-md" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">We're committed to providing you with the best shopping experience possible</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all group">
                <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ─── */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-md" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Join thousands of satisfied customers who love shopping with us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: index * 0.15 }} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative py-20 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')" }}
        />
        {/* Black overlay with blur */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }}>
            <Zap className="h-16 w-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Elevate Your Style?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Join 50,000+ happy customers and discover a new world of premium shopping. Free shipping on your first order!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sale">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border border-white/20 text-lg px-8 py-6">
                  View Deals
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}