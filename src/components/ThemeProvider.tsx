"use client";

import React, { useEffect } from "react";
import { useCRMStore } from "../store/crmStore";

function getPreferredTheme(): "dark" | "light" {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("tdc-crm-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useCRMStore((state) => state.setTheme);

  useEffect(() => {
    setTheme(getPreferredTheme());
  }, [setTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const savedTheme = window.localStorage.getItem("tdc-crm-theme");
      if (!savedTheme) {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("storage", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("storage", handleSystemThemeChange);
    };
  }, [setTheme]);

  return <>{children}</>;
}
