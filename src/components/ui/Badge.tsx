"use client";

import React from "react";
import { clsx } from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-hn-primary/10 text-hn-primary border border-hn-primary/20",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  error:   "bg-hn-error/10 text-hn-error border border-hn-error/25",
  info:    "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  muted:   "bg-white/5 text-foreground/60 border border-white/8",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-hn-primary",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  error:   "bg-hn-error",
  info:    "bg-sky-400",
  muted:   "bg-foreground/40",
};

export function Badge({ variant = "default", children, className, dot = false }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-hn-pill text-label-sm font-medium leading-none",
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}

// Convenience: map profile status → badge variant
export function getStatusVariant(status: string): BadgeVariant {
  switch (status) {
    case "New Lead":           return "muted";
    case "Verification Pending": return "warning";
    case "Profile Verified":   return "info";
    case "Active Search":      return "default";
    case "Matched":            return "success";
    case "Engaged":            return "success";
    case "Married":            return "success";
    default:                   return "muted";
  }
}
