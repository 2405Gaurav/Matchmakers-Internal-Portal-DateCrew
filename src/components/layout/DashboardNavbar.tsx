"use client";

import React from "react";
import { ChevronRight, Menu, Bell, Search } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function DashboardNavbar() {
  const router = useRouter();
  const {
    activeSidebarTab,
    isSidebarCollapsed,
    toggleSidebar,
    selectedProfileId,
    profiles,
    session,
    notifications,
    toggleQuickActions,
  } = useCRMStore();

  const selectedProfile = selectedProfileId
    ? profiles.find((p) => p.id === selectedProfileId)
    : null;

  const profileName = selectedProfile
    ? `${selectedProfile.firstName} ${selectedProfile.lastName}`
    : null;

  const unreadCount = Math.min(notifications.length, 9);

  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed top-0 right-0 z-30 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 transition-all duration-300 print-hidden"
      style={{ left: isSidebarCollapsed ? "72px" : "240px" }}
    >
      {/* Left — Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors md:hidden"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 text-[13px] text-gray-400 select-none">
          <span
            className="hover:text-gray-700 cursor-pointer transition-colors font-medium"
            onClick={() => router.push("/dashboard")}
          >
            The Date Crew
          </span>
          <ChevronRight className="w-3 h-3" />
          <span
            className={`transition-colors font-medium ${
              !profileName
                ? "text-gray-900"
                : "hover:text-gray-700 cursor-pointer"
            }`}
            onClick={() => {
              if (profileName) router.push("/dashboard/customers");
            }}
          >
            {activeSidebarTab}
          </span>
          {profileName && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium truncate max-w-[140px] md:max-w-none">
                {profileName}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* Cmd+K search shortcut */}
        <button
          onClick={() => toggleQuickActions()}
          className="hidden md:flex items-center gap-2 px-3 h-8 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 text-[12px] text-gray-400 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
          <kbd className="ml-1 text-[10px] bg-white border border-gray-200 rounded px-1 py-0.5">⌘K</kbd>
        </button>

        {/* Notification bell */}
        {unreadCount > 0 && (
          <button className="relative p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-sm-primary text-white text-[9px] font-bold flex items-center justify-center leading-none">
              {unreadCount}
            </span>
          </button>
        )}

        {/* User avatar + name */}
        <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-gray-100">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-sm-primary text-white font-semibold text-xs shrink-0 select-none">
            {session.name ? session.name.charAt(0).toUpperCase() : "M"}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-[13px] font-medium text-gray-900 leading-none">
              {session.name || "Matchmaker"}
            </span>
            <span className="text-[10px] text-gray-400 mt-0.5 leading-none">
              {session.role || "Consultant"}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
