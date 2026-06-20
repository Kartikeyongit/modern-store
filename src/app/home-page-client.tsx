"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Heart,
  Zap,
  ChevronRight,
  Mail,
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "2K+", label: "Premium Products" },
  { value: "150+", label: "Countries Shipped" },
  { value: "4.9", label: "Average Rating" },
];

const marqueeItems = [
  { icon: Truck, text: "Free Worldwide Shipping" },
  { icon: RotateCcw, text: "30-Day Easy Returns" },
  { icon: Shield, text: "Secure Checkout" },
  { icon: Heart, text: "Premium Quality Guarantee" },
  { icon: Star, text: "4.9 Average Rating" },
  { icon: Zap, text: "Same-Day Dispatch" },
];

const categories = [
  {
    name: "Electronics",
    description: "Premium gadgets for the modern lifestyle",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
    href: "/shop?category=Electronics",
    count: "24+ Products",
  },
  {
    name: "Accessories",
    description: "Complete your look with our curated collection",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=600&fit=crop",
    href: "/shop?category=Accessories",
    count: "36+ Products",
  },
  {
    name: "Home & Living",
    description: "Transform your space with designer pieces",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop",
    href: "/shop?category=Home+%26+Living",
    count: "18+ Products",
  },
];

const services = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description: "Free shipping on all orders over $100. Fast and reliable delivery to your doorstep.",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is always protected with industry-standard SSL encryption.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Not satisfied? Return any product within 30 days for a full refund. No questions asked.",
  },
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HomePageClient({ featuredProducts }: { featuredProducts: any[] }) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="px-4 py-2 text-sm mb-8 gap-2 bg-white/10 text-white border-white/20 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Premium Shopping Experience
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Style Meets
              <br />
              <span className="text-white/90">Innovation</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover a new era of online shopping. Curated collections, premium quality, and an experience designed around you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 group">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/collections">
                <Button size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white text-lg px-8 py-6">
                  View Collections
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/10"
        >
          <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── BRAND MARQUEE ─── */}
      <div className="bg-gray-50 py-6 overflow-hidden border-y border-gray-200">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, index) => {
            const Icon = item.icon;
            return (
              <span key={index} className="text-gray-700 text-sm font-medium tracking-wide flex items-center gap-3">
                <Icon className="h-4 w-4 text-gray-500" />
                {item.text}
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full ml-1" />
              </span>
            );
          })}
        </div>
      </div>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Handpicked just for you — discover our most-loved items</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/shop">
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Explore our carefully curated categories</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15 }}
              >
                <Link href={category.href} className="group block">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <Badge className="w-fit mb-3 bg-white/90 text-gray-900 border-0">{category.count}</Badge>
                      <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{category.description}</p>
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

      {/* ─── SERVICES ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">We&apos;re committed to the best shopping experience</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.12 }}
                  className="text-center p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:shadow-lg hover:border-gray-200 transition-all group"
                >
                  <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Join thousands of satisfied customers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.12 }}
                className="bg-white rounded-2xl p-8 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200">
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

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
            <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
              Subscribe to get exclusive access to new arrivals, early sale access, and 10% off your first order.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-xl border-gray-300"
                required
              />
              <Button type="submit" className="h-12 px-8 bg-gray-900 text-white hover:bg-gray-800 rounded-xl">
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-4">No spam, ever. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Zap className="h-16 w-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Elevate Your Style?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join 50,000+ happy customers and discover a new world of premium shopping. Free shipping on your first order!
            </p>
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
