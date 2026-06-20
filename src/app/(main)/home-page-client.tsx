"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  ChevronRight,
  Mail,
  Sparkles,
  Zap,
  Clock,
  Check,
} from "lucide-react";

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "2K+", label: "Premium Products" },
  { value: "150+", label: "Countries Shipped" },
  { value: "4.9", label: "Average Rating" },
];

const marqueeItems = [
  "Free Worldwide Shipping",
  "30-Day Easy Returns",
  "Secure Checkout",
  "Premium Quality Guarantee",
  "4.9 Average Rating",
  "Same-Day Dispatch",
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

import type { Product } from "@/types/product";

export function HomePageClient({ featuredProducts }: { featuredProducts: Product[] }) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── SPLIT HERO ─── */}
      <section className="relative min-h-screen">
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center bg-black px-8 lg:px-16 pt-24 pb-28 min-h-[60vh] md:min-h-screen">
            <div className="max-w-lg w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs text-white/40 tracking-[0.25em] uppercase mb-6 block">
                  Premium Collection 2026
                </span>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                  Style Meets
                  <br />
                  Innovation
                </h1>

                <p className="text-lg text-white/60 mb-10 leading-relaxed font-light">
                  Discover our curated collection of premium products designed for the modern lifestyle.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/shop">
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 group">
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/collections">
                    <Button size="lg" className="bg-transparent border border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6">
                      View Collections
                      <ShoppingBag className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative hidden md:block min-h-screen">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/5"
        >
          <div className="max-w-5xl mx-auto px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="bg-white py-5 overflow-hidden border-b border-neutral-200">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="text-neutral-400 text-sm tracking-wide flex items-center gap-4">
              {item}
              <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          >
            <div>
              <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Featured Products</h2>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 shrink-0">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BANNER 1: SALE PROMO ─── */}
      <section className="relative py-20 overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/85 to-neutral-900/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="max-w-lg">
                <span className="text-xs text-white/50 tracking-[0.2em] uppercase mb-3 block">Limited Time Offer</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Summer Sale</h2>
                <p className="text-lg text-white/60 font-light">Up to 40% off on selected items. Don&apos;t miss out on our biggest sale of the season.</p>
              </div>
              <Link href="/sale">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 text-lg px-10 py-6 shrink-0 group">
                  Shop the Sale
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Flash Deals</p>
                  <p className="text-xs text-white/50 font-light">Up to 40% off sitewide</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Free Shipping</p>
                  <p className="text-xs text-white/50 font-light">On all orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Limited Time</p>
                  <p className="text-xs text-white/50 font-light">While stocks last</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Browse</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Shop by Category</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.12 }}
              >
                <Link href={category.href} className="group block">
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-sm">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span className="text-xs text-white/60 mb-1 tracking-wide uppercase">{category.count}</span>
                      <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-white/60 text-sm mb-3 font-light">{category.description}</p>
                      <span className="inline-flex items-center text-white text-sm font-medium">
                        Browse
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

      {/* ─── BANNER 2: FREE SHIPPING ─── */}
      <section className="py-16 bg-white border-y border-neutral-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <div className="md:w-1/2 text-center md:text-left">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 mx-auto md:mx-0 mb-5">
                <Truck className="h-7 w-7 text-neutral-700" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3 tracking-tight">Free Shipping Worldwide</h2>
              <p className="text-neutral-500 mb-6 max-w-sm font-light leading-relaxed">
                On all orders over $100. Fast, reliable delivery to your doorstep, no matter where you are.
              </p>
              <Link href="/shop">
                <Button variant="outline" className="border-neutral-300 text-neutral-700 hover:bg-neutral-50">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Check className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">Fully Tracked Delivery</p>
                  <p className="text-xs text-neutral-500 font-light">Real-time updates from pickup to your door</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Shield className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">Insurance Included</p>
                  <p className="text-xs text-neutral-500 font-light">Every shipment covered against loss or damage</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Clock className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">Express Shipping Available</p>
                  <p className="text-xs text-neutral-500 font-light">1–3 business days delivery on express orders</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Experience</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Why Shop With Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{service.title}</h3>
                  <p className="text-neutral-500 leading-relaxed text-sm">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Our Customers</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-neutral-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-neutral-900 text-neutral-900" />
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6 text-sm">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-neutral-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BANNER 3: BUNDLE DEAL ─── */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-2 block">Bundle & Save</span>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">Buy 2 or More, Get 10% Off</h2>
              <p className="text-neutral-500 mt-1 font-light">Mix and match from any category. Discount applied at checkout.</p>
            </div>
            <Link href="/shop">
              <Button className="bg-black text-white hover:bg-neutral-800 px-8 shrink-0">
                Shop Now
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <ShoppingBag className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">Electronics + Accessories</p>
                  <p className="text-xs text-neutral-400 font-light">Perfect pair</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-light">Save up to</span>
                <span className="text-sm font-bold text-neutral-900">15%</span>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <Star className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">Home & Living + Fashion</p>
                  <p className="text-xs text-neutral-400 font-light">Style your space & you</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-light">Save up to</span>
                <span className="text-sm font-bold text-neutral-900">12%</span>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 hover:border-neutral-300 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
                  <Sparkles className="h-5 w-5 text-neutral-700" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 text-sm">Any 3 Items</p>
                  <p className="text-xs text-neutral-400 font-light">Mix & match freely</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-light">Save up to</span>
                <span className="text-sm font-bold text-neutral-900">20%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Mail className="h-10 w-10 text-neutral-300 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3 tracking-tight">Stay Updated</h2>
            <p className="text-neutral-400 mb-8 font-light">
              Subscribe for new arrivals, early access, and 10% off your first order.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-xl border-neutral-300"
                required
              />
              <Button type="submit" className="h-12 px-8 bg-black text-white hover:bg-neutral-800 rounded-xl">
                Subscribe
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            <p className="text-xs text-neutral-400 mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ready to Elevate Your Style?</h2>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto font-light">
              Join 50,000+ happy customers. Free shipping on your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-black hover:bg-neutral-100 text-lg px-8 py-6">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/sale">
                <Button size="lg" className="bg-transparent border border-neutral-600 text-neutral-300 hover:bg-neutral-800 text-lg px-8 py-6">
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
