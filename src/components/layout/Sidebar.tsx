"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Heart,
  Sparkles,
  Notebook,
  BarChart3,
  Settings,
} from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";

// The Sidebar component: Our main navigation anchor that stays on the left
export function Sidebar() {
  const router = useRouter();
  
  // Grab what we need from our global store
  const {
    activeSidebarTab,
    setSidebarTab,
    isSidebarCollapsed,
    isSidebarHovered,
    setSidebarHovered,
    selectProfile,
  } = useCRMStore();

  // The sidebar expands if it's not explicitly collapsed OR if the user is hovering over it
  const isExpanded = !isSidebarCollapsed || isSidebarHovered;

  // The list of places we can go in the dashboard
  const menuItems = [
    { name: "Dashboard",   icon: LayoutDashboard, path: "/dashboard" },
    { name: "Customers",   icon: Users,            path: "/dashboard/customers" },
    { name: "Matches",     icon: Heart,            path: "/dashboard/matches" },
    { name: "AI Insights", icon: Sparkles,         path: "/dashboard/insights" },
    { name: "Notes",       icon: Notebook,         path: "/dashboard/notes" },
    { name: "Analytics",   icon: BarChart3,        path: "/dashboard/analytics" },
  ];

  // When a user clicks a menu item, we update the active tab and navigate
  const handleTabClick = (tabName: string, path: string) => {
    setSidebarTab(tabName);
    selectProfile(null); // Clear any selected profile when switching tabs
    router.push(path);
  };

  return (
    <motion.aside
      // Smoothly animate the width based on whether we're expanded or not
      animate={{ width: isExpanded ? 260 : 76 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      // Track hover state to expand/collapse
      onHoverStart={() => setSidebarHovered(true)}
      onHoverEnd={() => setSidebarHovered(false)}
      className="fixed left-0 top-0 z-40 h-screen bg-card-bg border-r border-border backdrop-blur-xl flex flex-col justify-between select-none overflow-hidden transition-colors duration-300"
    >
      <div>
        {/* The top section with our logo and brand name */}
        <div className="flex h-16 items-center px-5 border-b border-border">
          <div className="flex items-center gap-3">
            {/* Our signature Heart icon */}
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-sm-primary shrink-0 transition-all duration-300">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            {/* Only show the text if we have space (expanded) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <span className="font-display text-[17px] font-normal text-foreground tracking-tight whitespace-nowrap">
                    The Date Crew
                  </span>
                  <span className="text-[11px] text-foreground/45 uppercase tracking-widest leading-none mt-0.5">
                    Matchmaker
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* The actual navigation links */}
        <nav className="px-3 pt-6 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeSidebarTab === item.name;
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name, item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-sm-primary text-white"
                    : "text-foreground/60 hover:text-foreground hover:bg-muted"
                }`}
              >
                {/* The icon for the menu item */}
                <div className="flex items-center justify-center min-w-[20px]">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-white" : "text-foreground/45 group-hover:text-sm-primary"
                    }`}
                  />
                </div>

                {/* The label, shown only when expanded */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* A helpful tooltip when we're collapsed */}
                {!isExpanded && (
                  <div className="absolute left-14 scale-0 origin-left rounded-lg bg-foreground text-background px-3 py-1.5 text-[12px] font-medium group-hover:scale-100 transition-transform duration-150 z-50 whitespace-nowrap shadow-xl">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* The bottom "Premium CRM" badge section */}
      <div className="p-4">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl border border-border bg-muted/40 p-4"
            >
              <p className="font-display text-[15px] leading-tight text-foreground">
                Premium CRM
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-foreground/40">
                Editorial clarity for elite matchmaking workflows.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
