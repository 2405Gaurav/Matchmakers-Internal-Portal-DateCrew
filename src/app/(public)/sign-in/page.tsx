"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, Heart } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

export default function SignInPage() {
  const router = useRouter();
  const { login, session } = useCRMStore();

  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");

  useEffect(() => {
    if (session.isAuthenticated) router.push("/dashboard");
  }, [session, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setIsLoading(true);
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        if (email === "admin@thedatecrew.com" && password === (s.portalPassword || "admin123")) {
          login(email, s.profileName || "Meera Sharma", s.profileRole || "Senior Matchmaking Director");
          router.push("/dashboard");
        } else {
          setError("Invalid credentials. Use the quick access button below.");
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (email === "admin@thedatecrew.com" && password === "admin123") {
          login(email, "Meera Sharma", "Senior Matchmaking Director");
          router.push("/dashboard");
        } else {
          setError("Invalid credentials. Use the quick access button below.");
          setIsLoading(false);
        }
      });
  };

  const handleQuickAccess = () => {
    setIsLoading(true);
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => { login("admin@thedatecrew.com", s.profileName || "Meera Sharma", s.profileRole || "Senior Matchmaking Director"); router.push("/dashboard"); })
      .catch(() => { login("admin@thedatecrew.com", "Meera Sharma", "Senior Matchmaking Director"); router.push("/dashboard"); });
  };

  return (
    <div className="min-h-screen bg-white flex">

      {/* Left — branded panel (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-[#0F172A]">
        {/* Gradient ribbon top strip */}
        <div className="absolute top-0 inset-x-0 h-1 gradient-ribbon" />

        {/* Gradient orb bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, #533AFD 0%, transparent 70%)" }} />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-sm-md bg-sm-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-white font-medium text-[16px] tracking-tight">The Date Crew</span>
        </div>

        {/* Bottom quote */}
        <div className="relative space-y-4">
          <p className="font-light text-[36px] leading-[1.15] tracking-tight text-white">
            "Where precision meets{" "}
            <span className="gradient-text">romance."</span>
          </p>
          <p className="text-[14px] text-white/50 font-light">
            TDC Matchmakers — Internal Management Portal
          </p>
          {/* Stats row */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/10">
            {[["2,400+","Matches made"],["1,100+","Marriages"],["890+","Active clients"]].map(([v, l]) => (
              <div key={l}>
                <p className="text-[20px] font-light text-white leading-none">{v}</p>
                <p className="text-[11px] text-white/40 font-light mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 bg-white">
        <motion.div
          variants={stagger} initial="hidden" animate="show"
          className="w-full max-w-sm space-y-7"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="space-y-1">
            <h1 className="font-sans font-light text-[32px] tracking-tight text-sm-on-surface">
              Welcome back
            </h1>
            <p className="text-body-sm text-sm-muted font-light">
              Sign in to your TDC matchmaker portal.
            </p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-sm-md bg-red-50 border border-red-200 text-label-sm text-red-600"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-label-sm font-medium text-sm-on-surface">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sm-muted/60" />
                <input
                  id="sign-in-email"
                  type="email"
                  placeholder="admin@thedatecrew.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-9 pr-4 h-12 rounded-sm-sm border border-sm-border bg-white text-sm-on-surface text-label-md placeholder-sm-muted/50 focus:outline-none focus:ring-2 focus:ring-sm-primary/30 focus:border-sm-primary transition-all duration-150 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-label-sm font-medium text-sm-on-surface">Password</label>
                <span className="text-label-sm text-sm-primary cursor-pointer hover:underline">Forgot?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sm-muted/60" />
                <input
                  id="sign-in-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-9 pr-4 h-12 rounded-sm-sm border border-sm-border bg-white text-sm-on-surface text-label-md placeholder-sm-muted/50 focus:outline-none focus:ring-2 focus:ring-sm-primary/30 focus:border-sm-primary transition-all duration-150 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                id="sign-in-submit"
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
                  : <><span>Sign in</span><ArrowRight className="w-4 h-4" /></>
                }
              </button>
              <button
                id="sign-in-quick-access"
                type="button"
                onClick={handleQuickAccess}
                disabled={isLoading}
                className="btn-secondary w-full text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Quick access (Demo)
              </button>
            </div>
          </motion.form>

          {/* Footer */}
          <motion.div variants={fadeUp} className="pt-4 border-t border-sm-border space-y-2 text-center">
            <p className="text-label-sm text-sm-muted font-light">
              Demo credentials:{" "}
              <span className="font-medium text-sm-on-surface">admin@thedatecrew.com</span> / <span className="font-medium text-sm-on-surface">admin123</span>
            </p>
            <p className="text-label-sm text-sm-muted font-light">
              No account?{" "}
              <Link href="/sign-up" className="text-sm-primary hover:underline">Request access →</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
