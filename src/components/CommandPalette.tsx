"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, User, Settings, Heart, BarChart3, Moon, Sun, ArrowRight } from "lucide-react";
import { useCRMStore } from "../store/crmStore";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const router = useRouter();
  const {
    profiles,
    quickActionsOpen,
    toggleQuickActions,
    toggleTheme,
    theme,
    setSidebarTab,
    selectProfile
  } = useCRMStore();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleQuickActions();
      }
      if (e.key === "Escape") {
        toggleQuickActions(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleQuickActions]);

  // Focus input when opened
  useEffect(() => {
    if (quickActionsOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [quickActionsOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        toggleQuickActions(false);
      }
    }
    if (quickActionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [quickActionsOpen, toggleQuickActions]);

  // Filter profiles based on search
  const filteredProfiles = query.trim()
    ? profiles.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase()) ||
        p.religion.toLowerCase().includes(query.toLowerCase()) ||
        p.assignedMatchmaker.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectProfile = (profileId: string) => {
    selectProfile(profileId);
    setSidebarTab("Customers");
    toggleQuickActions(false);
    router.push(`/dashboard/customers/${profileId}`);
  };

  const handleAction = (tabName: string, path: string) => {
    setSidebarTab(tabName);
    selectProfile(null);
    toggleQuickActions(false);
    router.push(path);
  };

  const actions = [
    { name: "View Customers Database", icon: User, run: () => handleAction("Customers", "/dashboard/customers") },
    { name: "Run Matching Engine", icon: Heart, run: () => handleAction("Matches", "/dashboard/matches") },
    { name: "Analyze AI Insights", icon: Sparkles, run: () => handleAction("AI Insights", "/dashboard/insights") },
    { name: "Review Performance Charts", icon: BarChart3, run: () => handleAction("Analytics", "/dashboard/analytics") },
    { name: "Configure CRM Settings", icon: Settings, run: () => handleAction("Settings", "/dashboard/settings") },
    {
      name: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? Sun : Moon,
      run: () => {
        toggleTheme();
        toggleQuickActions(false);
      }
    }
  ];

  const filteredActions = query.trim()
    ? actions.filter((act) => act.name.toLowerCase().includes(query.toLowerCase()))
    : actions;

  return (
    <AnimatePresence>
      {quickActionsOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleQuickActions(false)}
            className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            ref={containerRef}
            className="w-full max-w-xl rounded-2xl glass-panel border border-border shadow-glow-lg flex flex-col overflow-hidden z-50 bg-[#ffffff] dark:bg-[#0c081e]"
          >
            {/* Search Bar Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-foreground/45 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a client name, city, religion, or command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground focus:outline-none placeholder-foreground/40"
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-input px-1.5 font-mono text-[10px] font-medium text-foreground/60">
                ESC
              </kbd>
            </div>

            {/* Results Area */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-3">
              {/* Clients section */}
              {filteredProfiles.length > 0 && (
                <div>
                  <h3 className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-foreground/40 uppercase">
                    Matched Clients
                  </h3>
                  <div className="space-y-0.5 mt-1">
                    {filteredProfiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProfile(p.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-brand-500/10 hover:text-brand-500 text-foreground transition-all duration-150 group"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">
                            {p.firstName[0]}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-semibold text-foreground">{p.firstName} {p.lastName}</span>
                            <span className="text-[10px] text-foreground/60">{p.age} • {p.city} • {p.career.designation}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Commands section */}
              <div>
                <h3 className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-foreground/40 uppercase">
                  Commands & Navigation
                </h3>
                <div className="space-y-0.5 mt-1">
                  {filteredActions.length === 0 && filteredProfiles.length === 0 ? (
                    <p className="px-3 py-4 text-center text-xs text-foreground/50">
                      No matching commands or clients found.
                    </p>
                  ) : (
                    filteredActions.map((act) => {
                      const Icon = act.icon;
                      return (
                        <button
                          key={act.name}
                          onClick={act.run}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-foreground/80 hover:text-foreground hover:bg-input transition-all duration-150 text-left group"
                        >
                          <Icon className="w-4 h-4 text-foreground/60 group-hover:text-brand-500 transition-colors" />
                          <span>{act.name}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            
            <div className="px-4 py-2 border-t border-border bg-input/20 flex items-center justify-between text-[10px] text-foreground/45">
              <span>Use ↑↓ arrows to navigate, Enter to select</span>
              <span>The Date Crew CRM</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
