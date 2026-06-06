"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = useCRMStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-bg text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
