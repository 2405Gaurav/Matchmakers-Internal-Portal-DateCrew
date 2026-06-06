"use client";

import React from "react";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  as?: "div" | "article" | "section";
}

const paddingClasses = {
  none: "",
  sm:   "p-3",
  md:   "p-4",
  lg:   "p-6",
};

export function Card({
  children,
  className,
  padding = "md",
  hover = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={clsx(
        "rounded-hn-md border",
        "bg-hn-neutral border-white/[0.07]",
        paddingClasses[padding],
        hover &&
          "transition-all duration-200 hover:border-white/15 hover:bg-hn-surface cursor-pointer",
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  return (
    <div className={clsx("flex items-start justify-between gap-3 mb-4", className)}>
      <div>
        <h3 className="text-body-md font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-label-sm text-foreground/50 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
