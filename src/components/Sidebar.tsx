"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Heart,
  Sparkles,
  Notebook,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useCRMStore } from "../store/crmStore";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";

export function Sidebar() {
  const router = useRouter();
  const {
    activeSidebarTab,
    setSidebarTab,
    isSidebarCollapsed,
    toggleSidebar,
    session,
    logout,
    selectProfile
  } = useCRMStore();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Customers", icon: Users, path: "/dashboard/customers" },
    { name: "Matches", icon: Heart, path: "/dashboard/matches" },
    { name: "AI Insights", icon: Sparkles, path: "/dashboard/insights" },
    { name: "Notes", icon: Notebook, path: "/dashboard/notes" },
    { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" }
  ];

  const handleTabClick = (tabName: string, path: string) => {
    setSidebarTab(tabName);
    selectProfile(null); // Clear selected profile on tab change
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen border-r border-border bg-[#ffffff]/60 dark:bg-[#0a061b]/60 backdrop-blur-xl flex flex-col justify-between select-none"
    >
      {/* Upper Section */}
      <div>
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!isSidebarCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Logo className="h-8 w-auto text-foreground" />
            </motion.div>
          ) : (
            <Logo className="h-8 w-auto mx-auto text-foreground" />
          )}

          {!isSidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-input text-foreground/60 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeSidebarTab === item.name;
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name, item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-brand-600/10 text-brand-500 dark:text-brand-300 border border-brand-500/20 shadow-glow"
                    : "text-foreground/75 hover:text-foreground hover:bg-input"
                }`}
              >
                <div className="flex items-center justify-center min-w-[20px]">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-brand-500 dark:text-brand-400" : "text-foreground/60 group-hover:text-foreground"
                    }`}
                  />
                </div>
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}

                {/* Tooltip for Collapsed Sidebar */}
                {isSidebarCollapsed && (
                  <div className="absolute left-16 scale-0 rounded bg-foreground text-background px-2 py-1 text-xs font-semibold group-hover:scale-100 transition-all duration-150 origin-left z-50 whitespace-nowrap shadow-md">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-border space-y-2">
        {isSidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-full p-2.5 rounded-lg hover:bg-input text-foreground/60 hover:text-foreground transition-colors mx-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Profile / Logout section */}
        <div className="space-y-1">
          {!isSidebarCollapsed ? (
            <div className="flex items-center justify-between p-2 rounded-lg bg-input/40">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs shrink-0">
                  {session.name ? session.name.charAt(0) : "M"}
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs font-semibold truncate leading-none text-foreground">
                    {session.name || "Matchmaker"}
                  </span>
                  <span className="text-[10px] text-foreground/60 truncate mt-0.5">
                    {session.role || "Consultant"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 rounded hover:bg-input text-foreground/60 hover:text-red-500 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full p-2.5 rounded-lg hover:bg-red-500/10 text-foreground/60 hover:text-red-500 transition-colors group relative"
            >
              <LogOut className="w-5 h-5" />
              <div className="absolute left-16 scale-0 rounded bg-red-600 text-white px-2 py-1 text-xs font-semibold group-hover:scale-100 transition-all duration-150 origin-left z-50 whitespace-nowrap shadow-md">
                Log Out
              </div>
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
