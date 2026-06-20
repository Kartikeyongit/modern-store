"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Shield, Zap } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "Every product is vetted for durability, design, and materials before it reaches your doorstep.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe in honest pricing, clear sourcing, and open communication with our community.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Your privacy and satisfaction are our foundation. We stand behind every purchase.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We constantly seek better materials, smarter designs, and more sustainable practices.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">About Borrow</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              We believe great design should be accessible. Our mission is to curate premium products that elevate everyday life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
                Curating the Best for Modern Living
              </h2>
              <div className="space-y-4 text-neutral-500 font-light leading-relaxed">
                <p>
                  Founded in 2024, Modern Store set out to redefine the online shopping experience. We partner with independent designers and trusted brands to bring you products that combine functionality with aesthetics.
                </p>
                <p>
                  Every item in our collection is selected for its quality, design integrity, and ability to make your daily life better. We are not just a store — we are a community of people who appreciate the thoughtful details.
                </p>
                <p>
                  From sustainable packaging to carbon-neutral shipping, we are committed to reducing our environmental footprint while delivering exceptional products to your door.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-[400px] rounded-2xl overflow-hidden border border-neutral-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">Brand imagery</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">What We Stand For</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-5">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{value.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{value.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ready to Explore?</h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto font-light">
              Browse our curated collections and find products that inspire your modern lifestyle.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-white text-black hover:bg-neutral-100 text-lg px-8 py-6">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
