"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, LogOut, Menu, Search, Settings, Home } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/features/ThemeToggle";

// The Navbar component: Sits at the top and gives us quick access to search, theme, and profile
export function DashboardNavbar() {
  const router = useRouter();
  
  // Grab everything we need from our global state
  const {
    activeSidebarTab,
    isSidebarCollapsed,
    isSidebarHovered,
    toggleSidebar,
    selectedProfileId,
    profiles,
    session,
    toggleQuickActions,
    logout,
  } = useCRMStore();

  // Local state for the profile dropdown menu
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  
  // Determine if the sidebar is currently taking up space
  const isSidebarExpanded = !isSidebarCollapsed || isSidebarHovered;

  // Find the currently selected profile if we're looking at a customer's details
  const selectedProfile = selectedProfileId
    ? profiles.find((p) => p.id === selectedProfileId)
    : null;

  const profileName = selectedProfile
    ? `${selectedProfile.firstName} ${selectedProfile.lastName}`
    : null;

  // Handle clicking outside the profile menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Log the user out and send them back to the landing page
  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    router.push("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 z-30 h-16 border-b border-border bg-card-bg/95 backdrop-blur-xl flex items-center justify-between px-6 transition-all duration-300 print-hidden"
      // Adjust the left padding based on whether the sidebar is expanded or not
      style={{ left: isSidebarExpanded ? "260px" : "76px" }}
    >
      {/* Left side: Breadcrumbs navigation */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button (only shows on small screens) */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-foreground/50 hover:bg-input hover:text-foreground transition-colors md:hidden"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Breadcrumb trail so users always know where they are */}
        <div className="flex items-center gap-1.5 text-[13px] text-foreground/45 select-none transition-colors duration-300">
          <span
            className="hover:text-foreground cursor-pointer transition-colors font-light flex items-center"
            onClick={() => router.push("/dashboard")}
          >
            <img src="https://cdn.prod.website-files.com/673e1a80860f50c64038afa6/690c01e8a7ef61abdc9353ba_Frame%201.svg" alt="The Date Crew Logo" className="h-4" />
          </span>
          <ChevronRight className="w-3 h-3" />
          <span
            className={`transition-colors font-light ${
              !profileName
                ? "text-foreground"
                : "hover:text-foreground cursor-pointer"
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
              <span className="text-foreground font-medium truncate max-w-[140px] md:max-w-none">
                {profileName}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right side: Global actions and user profile */}
      <div className="flex items-center gap-3">
        {/* Global search button - opens the command palette */}
        <button
          onClick={() => toggleQuickActions()}
          className="hidden md:flex items-center gap-2 px-4 h-10 rounded-full border border-border bg-input hover:bg-muted text-[12px] text-foreground/55 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
          <kbd className="ml-1 text-[10px] rounded-full border border-border bg-card-bg px-2 py-0.5 text-foreground/60">⌘K</kbd>
        </button>

        {/* Switch between dark and light mode */}
        <ThemeToggle />

        {/* The user's profile menu */}
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="hidden sm:flex items-center gap-3 rounded-full border border-border bg-card-bg px-3 py-2 text-left transition-colors duration-300 hover:bg-input"
          >
            {/* User avatar with initial */}
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-sm-primary text-white font-semibold text-sm shrink-0 select-none">
              {session.name ? session.name.charAt(0).toUpperCase() : "M"}
            </div>
            {/* User details (hidden on very small screens) */}
            <div className="hidden md:flex flex-col">
              <span className="text-[13px] font-medium text-foreground leading-none">
                {session.name || "Gaurav"}
              </span>
              <span className="text-[10px] text-foreground/45 mt-1.5 leading-none">
                {session.role || "Fullstack Intern"}
              </span>
            </div>
            <ChevronDown className={`h-4 w-4 text-foreground/45 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {/* The dropdown menu itself */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-[calc(100%+12px)] w-64 rounded-3xl border border-border bg-card-bg p-3 shadow-xl"
              >
                {/* User info summary */}
                <div className="rounded-2xl bg-muted/70 p-4">
                  <p className="font-display text-[18px] leading-tight text-foreground">
                    {session.name || "Gaurav"}
                  </p>
                  <p className="mt-1 text-[12px] text-foreground/50">
                    {session.role || "Fullstack Intern"}
                  </p>
                  <p className="mt-3 text-[11px] text-foreground/35 border-t border-border pt-3">
                    {session.email || "gaurav123@tdc.com"}
                  </p>
                </div>

                <div className="mt-2 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      router.push("/");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Home className="h-4 w-4" />
                    <span>Go to Home</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      router.push("/dashboard/settings");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Security & Settings</span>
                  </button>
                </div>

                {/* Logout button - big and clear */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center justify-between rounded-full border border-sm-border bg-sm-surface px-4 py-3 text-[13px] font-medium text-sm-primary transition-colors hover:bg-sm-tertiary"
                >
                  <span>Log out</span>
                  <LogOut className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
