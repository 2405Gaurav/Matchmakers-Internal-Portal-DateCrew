"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Mail, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left — editorial image panel (desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80"
          alt="Cinematic romantic moment"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute bottom-12 left-10 right-10">
          <p className="font-display text-3xl font-medium text-hn-primary leading-snug hero-text-shadow">
            "Every match starts with a conversation."
          </p>
          <p className="font-body text-label-sm text-hn-primary/50 mt-3">
            Join The Date Crew matchmaking team.
          </p>
        </div>
      </div>

      {/* Right — invite-only info panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-hn-secondary">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="w-full max-w-sm space-y-8"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-2">
            <p className="font-body text-label-sm text-hn-primary/35 uppercase tracking-widest">
              TDC Matchmakers
            </p>
            <h1 className="font-display text-headline-md font-semibold text-hn-primary">
              Request Access
            </h1>
            <p className="font-body text-body-sm text-hn-primary/50">
              The TDC internal portal is invite-only for verified matchmaking team members.
            </p>
          </motion.div>

          {/* Info notice */}
          <motion.div
            variants={fadeUp}
            className="p-4 rounded-hn-md border border-white/8 bg-white/3 space-y-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-hn-primary flex items-center justify-center shrink-0">
                <Heart className="w-3.5 h-3.5 text-hn-secondary fill-hn-secondary" />
              </div>
              <span className="font-body text-body-sm font-medium text-hn-primary">
                Invite-Only Access
              </span>
            </div>
            <p className="font-body text-label-sm text-hn-primary/50 leading-relaxed">
              New matchmaker accounts are created by the TDC admin team. If you&apos;re joining the team,
              contact your team lead to get your credentials set up.
            </p>
          </motion.div>

          {/* Placeholder form fields (disabled — visual only) */}
          <motion.div variants={fadeUp} className="space-y-4 opacity-50 pointer-events-none select-none">
            <div className="space-y-1.5">
              <label className="font-body text-label-sm text-hn-primary/50">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  disabled
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-hn-sm border border-white/8 bg-white/4 text-hn-primary/40 text-body-sm placeholder-hn-primary/20 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-label-sm text-hn-primary/50">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hn-primary/25" />
                <input
                  type="email"
                  disabled
                  placeholder="yourname@thedatecrew.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-hn-sm border border-white/8 bg-white/4 text-hn-primary/40 text-body-sm placeholder-hn-primary/20 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-body text-label-sm text-hn-primary/50">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hn-primary/25" />
                <input
                  type="password"
                  disabled
                  placeholder="Set by admin"
                  className="w-full pl-9 pr-4 py-2.5 rounded-hn-sm border border-white/8 bg-white/4 text-hn-primary/40 text-body-sm placeholder-hn-primary/20 cursor-not-allowed"
                />
              </div>
            </div>
            <button
              disabled
              className="btn-primary w-full rounded-hn-sm gap-2 opacity-40 cursor-not-allowed"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Contact CTA */}
          <motion.div variants={fadeUp} className="pt-4 border-t border-white/6 space-y-3 text-center">
            <p className="font-body text-label-sm text-hn-primary/35">
              Already have credentials?
            </p>
            <Link
              href="/sign-in"
              id="go-to-sign-in"
              className="btn-secondary w-full rounded-hn-sm gap-2 inline-flex items-center justify-center"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
