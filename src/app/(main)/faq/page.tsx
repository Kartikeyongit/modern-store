"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply browse our catalog, add items to your cart, and proceed to checkout. You can create an account for faster future purchases, but it is not required.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and changes are no longer possible. Contact us immediately if you need assistance.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are processed securely.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International shipping varies by destination, typically 7-14 business days.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. You can see estimated costs at checkout.",
  },
  {
    q: "What is your return policy?",
    a: "We offer free returns within 30 days of delivery. Items must be unused and in their original packaging. See our Returns page for full details.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order from your account dashboard.",
  },
  {
    q: "Are my payment details secure?",
    a: "Absolutely. We use industry-standard SSL encryption and PCI-compliant payment processing. Your payment information is never stored on our servers.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Help Center</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Frequently Asked Questions</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              Everything you need to know about shopping with Modern Store.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ LIST ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Questions</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Common Inquiries</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-neutral-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-base font-medium text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 border-t border-neutral-100">
                        <p className="text-neutral-500 font-light leading-relaxed mt-4">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">Still Have Questions?</h2>
            <p className="text-neutral-500 mb-8 max-w-lg mx-auto font-light">
              Our support team is here to help. Reach out and we will get back to you as soon as possible.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-black text-white hover:bg-neutral-800 text-lg px-8 py-6">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
