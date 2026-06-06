"use client";

import React, { useEffect } from "react";
import { useCRMStore } from "../store/crmStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const setTheme = useCRMStore((state) => state.setTheme);

  useEffect(() => {
    localStorage.setItem("tdc-crm-theme", "light");
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
  }, []);

  return <>{children}</>;
}
