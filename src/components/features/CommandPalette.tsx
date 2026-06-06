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
            className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            ref={containerRef}
            className="w-full max-w-xl bg-white rounded-xl border border-gray-200 shadow-xl flex flex-col overflow-hidden z-50"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search clients or type a command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-[14px] text-gray-900 focus:outline-none placeholder-gray-400"
              />
              <kbd className="hidden sm:inline-flex h-5 select-none items-center rounded border border-gray-200 bg-gray-50 px-1.5 font-mono text-[10px] text-gray-500">
                ESC
              </kbd>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2 space-y-3">
              {/* Clients */}
              {filteredProfiles.length > 0 && (
                <div>
                  <h3 className="px-3 py-1.5 text-[11px] font-semibold tracking-widest text-gray-400 uppercase">Clients</h3>
                  <div className="space-y-0.5">
                    {filteredProfiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectProfile(p.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] hover:bg-gray-50 text-gray-700 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center text-[11px] font-semibold text-sm-primary">
                            {p.firstName[0]}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="font-medium text-gray-900">{p.firstName} {p.lastName}</span>
                            <span className="text-[11px] text-gray-400">{p.age} · {p.city}</span>
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
                <h3 className="px-3 py-1.5 text-[11px] font-semibold tracking-widest text-gray-400 uppercase">Commands</h3>
                <div className="space-y-0.5">
                  {filteredActions.length === 0 && filteredProfiles.length === 0 ? (
                    <p className="px-3 py-6 text-center text-[13px] text-gray-400">No results found.</p>
                  ) : (
                    filteredActions.map((act) => {
                      const Icon = act.icon;
                      return (
                        <button
                          key={act.name}
                          onClick={act.run}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors text-left group"
                        >
                          <Icon className="w-4 h-4 text-gray-400 group-hover:text-sm-primary transition-colors" />
                          <span>{act.name}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>↑↓ navigate · Enter select</span>
              <span>TDC Matchmakers</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
