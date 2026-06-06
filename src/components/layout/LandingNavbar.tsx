"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, Menu, X } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";

export function LandingNavbar() {
  const router = useRouter();
  const { session } = useCRMStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Defer auth-conditional rendering to client to avoid hydration mismatch.
  // Server always renders the unauthenticated state; client updates after mount.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/*
        ── Rounded Pill Navbar (as requested) ─────────────────────────
        Full-width fixed wrapper with pointer-events-none so only the
        pill itself intercepts clicks. Centered with flex justify-center.
        Stripe Modern colors: white fill, gray border, violet CTA.
      */}
      <motion.div
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <nav
          className={`
            w-full max-w-4xl pointer-events-auto rounded-full
            transition-all duration-300
            ${scrolled ? "glass-pill-nav-scrolled" : "glass-pill-nav"}
          `}
        >
          <div className="flex items-center justify-between px-5 py-2.5">

            {/* ── Left: Logo + Brand ─────────────────────────────── */}
            <Link href="/" className="flex items-center gap-2.5 group select-none shrink-0">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-sm-primary shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </motion.div>
              <span className="font-sans font-semibold text-[14px] text-gray-900 tracking-tight whitespace-nowrap hidden sm:block">
                TDC matchmakers manage
              </span>
            </Link>

            {/* ── Center: Nav links (desktop) ─────────────────────── */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="#features"   className="px-3 py-1.5 rounded-full text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">Features</Link>
              <Link href="#analytics"  className="px-3 py-1.5 rounded-full text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">Analytics</Link>
              <Link href="#security"   className="px-3 py-1.5 rounded-full text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">Security</Link>
            </div>

            {/* ── Right: Auth CTAs (client-only to avoid hydration mismatch) ── */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              {isMounted && session.isAuthenticated ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-1.5 btn-primary h-9 px-4 text-[13px] rounded-full"
                >
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-[14px] font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="flex items-center gap-1.5 btn-primary h-9 px-4 text-[13px] rounded-full"
                  >
                    Sign Up
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile hamburger ────────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="sm:hidden p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.div>

      {/* ── Mobile dropdown ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl border border-gray-200 shadow-lg p-4 flex flex-col gap-1.5"
          >
            <Link href="#features"  onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">Features</Link>
            <Link href="#analytics" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">Analytics</Link>
            <Link href="#security"  onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">Security</Link>
            <div className="border-t border-gray-100 my-1" />
            <Link href="/sign-in"   onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">Sign In</Link>
            <Link href="/sign-up"   onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center rounded-xl mt-1 text-[14px]">Get started →</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
