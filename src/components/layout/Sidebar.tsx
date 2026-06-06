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
  LogOut,
} from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const router = useRouter();
  const {
    activeSidebarTab,
    setSidebarTab,
    isSidebarCollapsed,
    toggleSidebar,
    session,
    logout,
    selectProfile,
  } = useCRMStore();

  const menuItems = [
    { name: "Dashboard",   icon: LayoutDashboard, path: "/dashboard" },
    { name: "Customers",   icon: Users,            path: "/dashboard/customers" },
    { name: "Matches",     icon: Heart,            path: "/dashboard/matches" },
    { name: "AI Insights", icon: Sparkles,         path: "/dashboard/insights" },
    { name: "Notes",       icon: Notebook,         path: "/dashboard/notes" },
    { name: "Analytics",   icon: BarChart3,        path: "/dashboard/analytics" },
    { name: "Settings",    icon: Settings,         path: "/dashboard/settings" },
  ];

  const handleTabClick = (tabName: string, path: string) => {
    setSidebarTab(tabName);
    selectProfile(null);
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 flex flex-col justify-between select-none overflow-hidden"
    >
      {/* ── Upper Section ─────────────────────────────────────────── */}
      <div>
        {/* Logo header */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-gray-100">
          {!isSidebarCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="flex items-center gap-2.5"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-sm-primary shrink-0">
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              <span className="font-sans font-semibold text-[14px] text-gray-900 tracking-tight whitespace-nowrap">
                The Date Crew
              </span>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-sm-primary mx-auto">
              <Heart className="w-3.5 h-3.5 text-white fill-white" />
            </div>
          )}

          {!isSidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation items */}
        <nav className="mt-3 px-2.5 space-y-0.5">
          {menuItems.map((item) => {
            const isActive = activeSidebarTab === item.name;
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name, item.path)}
                className={`
                  w-full flex items-center gap-3 px-2.5 py-2.5 rounded-md text-[13px] font-medium
                  transition-all duration-150 group relative
                  ${isActive
                    ? "bg-violet-50 text-sm-primary border border-violet-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center justify-center min-w-[18px]">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-sm-primary" : "text-gray-400 group-hover:text-gray-700"
                    }`}
                  />
                </div>

                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.12 }}
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}

                {/* Collapsed tooltip */}
                {isSidebarCollapsed && (
                  <div className="absolute left-14 scale-0 origin-left rounded-md bg-gray-900 text-white px-2.5 py-1.5 text-[12px] font-semibold group-hover:scale-100 transition-transform duration-150 z-50 whitespace-nowrap shadow-lg">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom: User + Logout ─────────────────────────────────── */}
      <div className="p-2.5 border-t border-gray-100 space-y-1.5">
        {isSidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-full p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {!isSidebarCollapsed ? (
          <div className="flex items-center justify-between p-2 rounded-md bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-sm-primary text-white font-semibold text-xs shrink-0">
                {session.name ? session.name.charAt(0).toUpperCase() : "M"}
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-[13px] font-medium truncate text-gray-900 leading-none">
                  {session.name || "Matchmaker"}
                </span>
                <span className="text-[10px] text-gray-400 truncate mt-0.5 leading-none">
                  {session.role || "Consultant"}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-2 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors group relative"
          >
            <LogOut className="w-4 h-4" />
            <div className="absolute left-14 scale-0 rounded-md bg-red-500 text-white px-2.5 py-1.5 text-[12px] font-semibold group-hover:scale-100 transition-transform duration-150 origin-left z-50 whitespace-nowrap shadow-lg">
              Log Out
            </div>
          </button>
        )}
      </div>
    </motion.aside>
  );
}
