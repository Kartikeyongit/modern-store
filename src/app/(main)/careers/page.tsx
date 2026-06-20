"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Coffee, Users, TrendingUp, Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const benefits = [
  { icon: Heart, title: "Health & Wellness", desc: "Comprehensive medical, dental, and vision coverage for you and your family." },
  { icon: Coffee, title: "Remote-First Culture", desc: "Work from anywhere. We trust our team to deliver regardless of location." },
  { icon: Users, title: "Collaborative Team", desc: "Join a diverse group of passionate creators, engineers, and problem-solvers." },
  { icon: TrendingUp, title: "Growth Opportunities", desc: "Annual learning budget, mentorship programs, and clear career progression paths." },
  { icon: Lightbulb, title: "Innovation Time", desc: "Dedicated time each week to explore new ideas and work on passion projects." },
  { icon: Sparkles, title: "Competitive Compensation", desc: "Top-tier salaries, equity packages, and performance-based bonuses." },
];

const openPositions = [
  { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-Time", location: "Remote" },
  { title: "Product Designer", dept: "Design", type: "Full-Time", location: "Remote" },
  { title: "Marketing Manager", dept: "Marketing", type: "Full-Time", location: "New York" },
  { title: "Customer Experience Lead", dept: "Support", type: "Full-Time", location: "Remote" },
  { title: "Data Analyst", dept: "Analytics", type: "Full-Time", location: "Remote" },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-black overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="px-4 py-2 text-sm mb-6 gap-2 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Join Our Team
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Careers</h1>
            <p className="text-lg text-white/60 font-light max-w-xl mx-auto">
              Help us shape the future of modern commerce. We are looking for passionate people to join our mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY JOIN US ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Why Join</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Life at Borrow</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-neutral-50 rounded-2xl border border-neutral-200 p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-5">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPEN POSITIONS ─── */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs text-neutral-400 tracking-[0.2em] uppercase mb-3 block">Now Hiring</span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">Open Positions</h2>
          </motion.div>

          <div className="space-y-3">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-neutral-900">{position.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-neutral-500">{position.dept}</span>
                    <span className="text-neutral-300">&middot;</span>
                    <span className="text-sm text-neutral-500">{position.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className="border-neutral-200 text-neutral-600 text-xs">{position.type}</Badge>
                  <Button size="sm" className="bg-black text-white hover:bg-neutral-800">
                    Apply
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-neutral-500 font-light mb-4">Do not see the right fit?</p>
            <Link href="/contact">
              <Button variant="outline" className="border-neutral-300 text-neutral-700">
                Send Us Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Ready to Make an Impact?</h2>
            <p className="text-neutral-400 mb-8 max-w-lg mx-auto font-light">
              Join a team that values creativity, collaboration, and continuous improvement.
            </p>
            <Link href="#">
              <Button size="lg" className="bg-white text-black hover:bg-neutral-100 text-lg px-8 py-6">
                View All Openings
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
