"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ArrowRight, Menu, X } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import { Logo } from "@/components/Logo";

// The LandingNavbar: A floating, pill-shaped navigation for our landing page
export function LandingNavbar() {
  const router = useRouter();
  const { session } = useCRMStore();
  
  // State to track if the user has scrolled down
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Defer auth-conditional rendering to client to avoid hydration mismatch.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // Listen for scroll events to change the navbar's appearance
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
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

            {/* --- Left: Logo + Brand --- */}
            <Link href="/" className="flex items-center gap-2.5 group select-none shrink-0">
              <Logo className="h-8 w-auto text-foreground" />
            </Link>


            {/* --- Right: Auth CTAs --- */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              {/* Only show the dashboard button if the user is already logged in */}
              {isMounted && session.isAuthenticated ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center gap-1.5 btn-primary px-5 text-[15px]"
                >
                  Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-[15px] font-light text-foreground/75 hover:text-foreground rounded-full hover:bg-input transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* --- Mobile hamburger menu --- */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="sm:hidden p-1.5 rounded-full text-foreground/60 hover:bg-input transition-colors"
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
            className="fixed top-20 left-4 right-4 z-40 bg-card-bg rounded-2xl border border-border shadow-lg p-4 flex flex-col gap-1.5 transition-colors duration-300"
          >
            <Link href="#features"  onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-foreground/75 hover:bg-input transition-colors">Features</Link>
            <Link href="#analytics" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-foreground/75 hover:bg-input transition-colors">Analytics</Link>
            <Link href="#security"  onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-foreground/75 hover:bg-input transition-colors">Security</Link>
            <div className="border-t border-border my-1" />
            <Link href="/sign-in"   onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-lg text-[14px] font-medium text-foreground/75 hover:bg-input transition-colors">Sign In</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
