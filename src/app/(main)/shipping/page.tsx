"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Package, Truck, Clock, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const shippingMethods = [
  { name: "Standard", cost: "$5.99", time: "5-7 business days", free: "Orders over $50" },
  { name: "Express", cost: "$14.99", time: "2-3 business days", free: "Orders over $100" },
  { name: "Next Day", cost: "$24.99", time: "1 business day", free: "Not available" },
  { name: "International", cost: "From $19.99", time: "7-14 business days", free: "Orders over $150" },
];

const features = [
  { icon: Package, title: "Secure Packaging", desc: "All orders are packed in durable, eco-friendly materials to ensure your items arrive safely." },
  { icon: Truck, title: "Real-Time Tracking", desc: "Track your package from our warehouse to your doorstep with detailed status updates." },
  { icon: Clock, title: "Fast Processing", desc: "Orders placed before 2 PM EST are processed and shipped the same business day." },
  { icon: Globe, title: "Worldwide Shipping", desc: "We ship to over 50 countries with reliable international carriers." },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Delivery</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Shipping Information</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              Fast, reliable shipping to your doorstep. Here is everything you need to know.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SHIPPING METHODS TABLE ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Options</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Shipping Methods</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-neutral-200"
          >
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Method</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900">Delivery Time</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-900 hidden md:table-cell">Free Shipping</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {shippingMethods.map((method) => (
                  <tr key={method.name} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-5 text-sm font-medium text-neutral-900">{method.name}</td>
                    <td className="px-6 py-5 text-sm text-neutral-700">{method.cost}</td>
                    <td className="px-6 py-5 text-sm text-neutral-700">{method.time}</td>
                    <td className="px-6 py-5 text-sm text-neutral-500 hidden md:table-cell">{method.free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl border border-neutral-200 p-8"
              >
                <feature.icon className="h-8 w-8 text-neutral-900 mb-4" />
                <h3 className="text-base font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POLICY DETAILS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Details</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Shipping Policy</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-neutral max-w-none"
          >
            <div className="space-y-6 text-neutral-500 font-light leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Processing Time</h3>
                <p>Orders are processed within 1-2 business days. During peak seasons or sales, processing may take slightly longer. You will receive a confirmation email once your order ships.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Shipping Carriers</h3>
                <p>We partner with UPS, FedEx, USPS, and DHL for domestic and international deliveries. Carriers are assigned based on destination and shipping method selected.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Delivery Address</h3>
                <p>Please ensure your shipping address is correct. We are not responsible for deliveries to incorrect addresses provided at checkout. Contact us immediately if you spot an error.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Lost or Damaged Packages</h3>
                <p>If your package is lost or arrives damaged, please contact our support team within 7 days. We will work with the carrier to resolve the issue and arrange a replacement if needed.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10"
          >
            <Link href="/contact">
              <Button variant="outline" className="border-neutral-300 text-neutral-700">
                Questions? Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
