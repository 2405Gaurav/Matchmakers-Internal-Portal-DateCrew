"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import {LandingNavbar} from "@/components/layout/LandingNavbar";
import { ArrowRight, Heart, Users, Sparkles, Shield, BarChart3, Zap } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const features = [
  {
    icon: Users,
    title: "Client Intelligence",
    desc: "Deep CRM profiles with lifestyle, career, family, and preference data — structured for precision matchmaking.",
    tag: "Profiles",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Sparkles,
    title: "AI Compatibility Engine",
    desc: "Algorithmic scoring with breakdown by values, lifestyle, location, and goals. Draft personalized introductions instantly.",
    tag: "AI-powered",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    desc: "Track pipeline velocity, conversion by matchmaker, and client satisfaction metrics across your entire operation.",
    tag: "Analytics",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    desc: "Built-in verification workflow with status stages from lead capture through engagement and marriage.",
    tag: "Trust",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Match Pipeline",
    desc: "Save, send, and track every proposal through the pipeline. Full history of sent and saved matches per client.",
    tag: "Pipeline",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Heart,
    title: "Relationship Notes",
    desc: "Collaborative notes with AI-generated meeting summaries. Keep every touchpoint documented and searchable.",
    tag: "Notes",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-sm-on-surface overflow-x-hidden font-sans">
      <LandingNavbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-0 px-6 relative overflow-hidden">

        {/* Gradient orbs */}
        <div className="absolute inset-x-0 top-0 h-[700px] pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(ellipse, #533AFD 0%, transparent 70%)" }} />
          <div className="absolute top-8 right-0 w-[700px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse, #EC4899 0%, transparent 70%)" }} />
          <div className="absolute top-8 left-0 w-[600px] h-[450px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(ellipse, #22D3EE 0%, transparent 70%)" }} />
        </div>

        {/* Ribbon strip */}
        <div className="absolute top-0 inset-x-0 h-1.5 gradient-ribbon opacity-80" />

        <div className="max-w-stripe mx-auto relative">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm-full border border-sm-tertiary text-sm-primary text-eyebrow bg-white">
                <span className="w-1.5 h-1.5 rounded-full bg-sm-primary" />
                TDC Matchmakers · Internal Portal
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-sans font-light text-[64px] sm:text-[80px] leading-[1.06] tracking-[-2px] text-sm-on-surface">
              The infrastructure for{" "}
              <span className="gradient-text">premium matchmaking.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-sans font-light text-[20px] text-sm-muted leading-relaxed max-w-2xl mx-auto">
              A professional CRM built for elite matchmakers. Manage client profiles, run AI-powered compatibility scoring, and orchestrate life-changing introductions at scale.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 pt-2">
              <Link href="/sign-in" className="btn-primary text-[16px] px-6 py-3">
                Start managing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/sign-up" className="btn-secondary text-[16px] px-6 py-3">
                Request access
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.p variants={fadeUp} className="text-[14px] text-sm-muted pt-1">
              Trusted by premium matchmaking agencies across India
            </motion.p>
          </motion.div>

          {/* ── Gradient ribbon banner — full bleed, reduced height ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="mt-20 relative"
            style={{
              marginLeft: "calc(-50vw + 50%)",
              marginRight: "calc(-50vw + 50%)",
              width: "100vw",
            }}
          >
            <div className="gradient-ribbon w-full h-36 sm:h-44 opacity-90 shadow-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-white/80" />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES BENTO GRID ──────────────────────────────────────── */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-stripe mx-auto">
          {/* Section header */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mb-20"
          >
            <motion.p variants={fadeUp} className="text-eyebrow text-sm-primary font-medium uppercase tracking-widest mb-4">
              Platform
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-sans font-light text-[48px] leading-[1.1] tracking-tight text-sm-on-surface">
              Everything your matchmaking team needs.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[18px] text-sm-muted mt-5 leading-relaxed font-light">
              One platform. Every client touchpoint from first consultation to wedding day.
            </motion.p>
          </motion.div>

          {/* 3-column feature grid */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  className="stripe-card group p-8"
                >
                  <div className={`w-12 h-12 rounded-sm-md ${f.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-label-sm font-medium px-2.5 py-1 rounded-sm-full ${f.bg} ${f.color}`}>
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="font-sans font-medium text-[19px] text-sm-on-surface mb-3">
                    {f.title}
                  </h3>
                  <p className="text-[15px] text-sm-muted leading-relaxed font-light">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-sm-border bg-[#FAFAFA]">
        <div className="max-w-stripe mx-auto text-center">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="max-w-2xl mx-auto space-y-7"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <div className="w-14 h-14 rounded-sm-lg bg-sm-primary flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-sans font-light text-[48px] leading-[1.1] tracking-tight">
              Ready to manage your pipeline?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[18px] text-sm-muted font-light leading-relaxed">
              Access client profiles, run matching, and track every introduction from a single dashboard.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 pt-2">
              <Link href="/sign-in" className="btn-primary text-[16px] px-6 py-3">
                Sign in to portal
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/sign-up" className="btn-secondary text-[16px] px-6 py-3">
                Request access
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-sm-border py-8 px-6 bg-white">
        <div className="max-w-stripe mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm-md bg-sm-primary flex items-center justify-center">
              <Heart className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="text-label-sm text-sm-muted font-light">
              TDC Matchmakers · Internal CRM
            </span>
          </div>
          <p className="text-label-sm text-sm-muted font-light">
            © {new Date().getFullYear()} The Date Crew. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}