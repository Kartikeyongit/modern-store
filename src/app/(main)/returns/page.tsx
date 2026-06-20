"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, RefreshCw, ShieldCheck, ClipboardCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  { icon: ClipboardCheck, title: "1. Request a Return", desc: "Log into your account or contact our support team within 30 days of delivery to initiate the process." },
  { icon: RefreshCw, title: "2. Pack Your Item", desc: "Securely pack the item in its original packaging with all tags and accessories included." },
  { icon: RotateCcw, title: "3. Ship It Back", desc: "Print your prepaid return label and drop the package off at any carrier location." },
  { icon: ShieldCheck, title: "4. Get Refunded", desc: "Once received and inspected, refunds are processed within 5-7 business days to your original payment method." },
];

export default function ReturnsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Returns</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Returns & Exchanges</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              Hassle-free returns within 30 days. We make it easy to love what you order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── RETURN PROCESS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-neutral-50 rounded-2xl border border-neutral-200 p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-5">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POLICY DETAILS ─── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Policy</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Return Policy</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-neutral-500 font-light leading-relaxed"
          >
            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Eligibility</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Items must be returned within 30 days of delivery</li>
                <li>Items must be unused and in original condition</li>
                <li>All original packaging, tags, and accessories must be included</li>
                <li>Final sale items are not eligible for return</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Refunds</h3>
              <p>Refunds are issued to the original payment method within 5-7 business days after we receive and inspect your return. Shipping costs are non-refundable unless the return is due to our error.</p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Exchanges</h3>
              <p>We offer free exchanges for a different size or color within 30 days. If you would like a different item, we recommend returning the original for a refund and placing a new order.</p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Damaged or Incorrect Items</h3>
              <p>If you receive a damaged or incorrect item, contact us within 48 hours of delivery. We will arrange a free pickup and send a replacement immediately.</p>
            </div>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Need Help?</h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto font-light">
              Our support team is ready to assist you with any return or exchange questions.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-black hover:bg-neutral-100 text-lg px-8 py-6">
                Contact Support
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
