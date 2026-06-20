"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  { icon: Mail, label: "Email", value: "hello@borrow.com", href: "mailto:hello@modernstore.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, label: "Address", value: "123 Design District, New York, NY 10001", href: "#" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-xs text-white/40 tracking-[0.2em] uppercase mb-4 block">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Contact Us</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              Have a question, feedback, or just want to say hello? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-32 relative z-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={method.href}
                  className="block bg-white rounded-2xl border border-neutral-200 p-8 hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-500 tracking-[0.1em] uppercase mb-1">{method.label}</h3>
                  <p className="text-neutral-900 font-medium">{method.value}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Send a Message</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Drop Us a Line</h2>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-neutral-200 p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
              <p className="text-neutral-500 font-light mb-6">
                Thank you for reaching out. We will get back to you within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline" className="border-neutral-300 text-neutral-700">
                Send Another
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-neutral-200 p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Name</label>
                  <Input required placeholder="Your name" className="rounded-xl border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Email</label>
                  <Input required type="email" placeholder="your@email.com" className="rounded-xl border-neutral-200" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Subject</label>
                <Input required placeholder="How can we help?" className="rounded-xl border-neutral-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                />
              </div>
              <Button type="submit" className="bg-black text-white hover:bg-neutral-800 w-full py-6">
                Send Message
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.form>
          )}
        </div>
      </section>
    </main>
  );
}
