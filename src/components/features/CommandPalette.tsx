"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, User, Settings, Heart, BarChart3, ArrowRight } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const router = useRouter();
  const { profiles, quickActionsOpen, toggleQuickActions, setSidebarTab, selectProfile } = useCRMStore();

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); toggleQuickActions(); }
      if (e.key === "Escape") toggleQuickActions(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleQuickActions]);

  useEffect(() => {
    if (quickActionsOpen) { setTimeout(() => inputRef.current?.focus(), 100); setQuery(""); }
  }, [quickActionsOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) toggleQuickActions(false);
    }
    if (quickActionsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [quickActionsOpen, toggleQuickActions]);

  const filteredProfiles = query.trim()
    ? profiles.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
        p.city.toLowerCase().includes(query.toLowerCase()) ||
        p.religion.toLowerCase().includes(query.toLowerCase())
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
    { name: "View Customers Database",  icon: User,      run: () => handleAction("Customers",   "/dashboard/customers")  },
    { name: "Run Matching Engine",       icon: Heart,     run: () => handleAction("Matches",     "/dashboard/matches")    },
    { name: "Analyze AI Insights",       icon: Sparkles,  run: () => handleAction("AI Insights", "/dashboard/insights")  },
    { name: "Review Performance Charts", icon: BarChart3, run: () => handleAction("Analytics",   "/dashboard/analytics") },
    { name: "Configure CRM Settings",   icon: Settings,  run: () => handleAction("Settings",    "/dashboard/settings")  },
  ];

  const filteredActions = query.trim()
    ? actions.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
    : actions;

  return (
    <AnimatePresence>
      {quickActionsOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleQuickActions(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            ref={containerRef}
            className="w-full max-w-xl rounded-xl border border-border bg-card-bg shadow-xl flex flex-col overflow-hidden z-50 transition-colors duration-300"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-foreground/45 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search clients or type a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-[14px] text-foreground focus:outline-none placeholder:text-foreground/40"
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center rounded border border-border bg-input px-1.5 font-mono text-[10px] text-foreground/55">
                ESC
              </kbd>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2 space-y-3">
              {/* Clients */}
              {filteredProfiles.length > 0 && (
                <div>
                  <h3 className="px-3 py-1.5 text-[11px] font-semibold tracking-widest text-foreground/40 uppercase">Clients</h3>
                  <div className="space-y-0.5">
                    {filteredProfiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProfile(p.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] hover:bg-input text-foreground/75 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-[11px] font-semibold text-sm-primary">
                            {p.firstName[0]}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-medium text-foreground">{p.firstName} {p.lastName}</span>
                            <span className="text-[11px] text-foreground/45">{p.age} · {p.city}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Commands */}
              <div>
                <h3 className="px-3 py-1.5 text-[11px] font-semibold tracking-widest text-foreground/40 uppercase">Commands</h3>
                <div className="space-y-0.5">
                  {filteredActions.length === 0 && filteredProfiles.length === 0 ? (
                    <p className="px-3 py-6 text-center text-[13px] text-foreground/45">No results found.</p>
                  ) : (
                    filteredActions.map((act) => {
                      const Icon = act.icon;
                      return (
                        <button
                          key={act.name}
                          onClick={act.run}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] text-foreground/75 hover:text-foreground hover:bg-input transition-colors text-left group"
                        >
                          <Icon className="w-4 h-4 text-foreground/45 group-hover:text-sm-primary transition-colors" />
                          <span>{act.name}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 py-2 border-t border-border flex items-center justify-between text-[11px] text-foreground/45 bg-input transition-colors duration-300">
              <span>↑↓ navigate · Enter select</span>
              <span>TDC Matchmakers</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
