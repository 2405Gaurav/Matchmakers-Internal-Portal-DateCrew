"use client";

import React from "react";
import { ChevronRight, Menu } from "lucide-react";
import { useCRMStore } from "../store/crmStore";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const {
    activeSidebarTab,
    isSidebarCollapsed,
    toggleSidebar,
    selectedProfileId,
    profiles
  } = useCRMStore();

  // Find selected profile name for breadcrumbs if needed
  const selectedProfile = selectedProfileId
    ? profiles.find((p) => p.id === selectedProfileId)
    : null;

  const profileName = selectedProfile
    ? `${selectedProfile.firstName} ${selectedProfile.lastName}`
    : null;

  return (
    <header className="fixed top-0 right-0 z-30 h-16 border-b border-border bg-[#ffffff]/60 dark:bg-[#090514]/60 backdrop-blur-xl flex items-center justify-between px-6 transition-all duration-300 print-hidden"
      style={{
        left: isSidebarCollapsed ? "72px" : "240px"
      }}
    >
      {/* Left side: Hamburger (on mobile) & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-input text-foreground/60 hover:text-foreground transition-colors md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-foreground/60 select-none">
          <span className="hover:text-foreground cursor-pointer transition-colors flex items-center" onClick={() => router.push("/dashboard")}>
            <img src="https://cdn.prod.website-files.com/673e1a80860f50c64038afa6/690c01e8a7ef61abdc9353ba_Frame%201.svg" alt="The Date Crew Logo" className="h-4" />
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span
            className={`transition-colors ${!profileName ? "text-foreground font-semibold" : "hover:text-foreground cursor-pointer"}`}
            onClick={() => {
              if (profileName) {
                router.push(activeSidebarTab === "Customers" ? "/dashboard/customers" : "/dashboard");
              }
            }}
          >
            {activeSidebarTab}
          </span>
          {profileName && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-semibold truncate max-w-[120px] md:max-w-none">
                {profileName}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

