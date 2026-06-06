"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-hn-primary text-hn-secondary hover:bg-hn-primary-90 font-medium",
  secondary:
    "bg-transparent text-hn-primary border border-hn-primary/30 hover:border-hn-primary/70 hover:bg-hn-primary/5 font-medium",
  ghost:
    "bg-transparent text-foreground/70 hover:text-foreground hover:bg-white/5 font-medium",
  danger:
    "bg-hn-error/10 text-hn-error border border-hn-error/25 hover:bg-hn-error/20 font-medium",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-label-sm rounded-hn-sm",
  md: "h-10 px-4 text-label-md rounded-hn-sm",
  lg: "h-12 px-6 text-body-lg rounded-hn-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <svg
          className="animate-spin w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </motion.button>
  );
}
