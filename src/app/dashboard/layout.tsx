"use client";

import React, { useEffect, useState } from "react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { CommandPalette } from "@/components/features/CommandPalette";
import { Loader2 } from "lucide-react";

// The DashboardLayout: The wrapper that provides the sidebar and navbar for all dashboard pages
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  // Get our session and sidebar state from the global store
  const { session, isSidebarCollapsed, isSidebarHovered, fetchInitialData } = useCRMStore();
  const [isMounted, setIsMounted] = useState(false);
  
  // Calculate if the sidebar should be in its wide/expanded state
  const isSidebarExpanded = !isSidebarCollapsed || isSidebarHovered;

  // Track mounting to avoid server-side rendering issues with local state/storage
  useEffect(() => { setIsMounted(true); }, []);

  // Once we're mounted and authenticated, go ahead and fetch all our CRM data
  useEffect(() => {
    if (isMounted && session.isAuthenticated) fetchInitialData();
  }, [session.isAuthenticated, isMounted, fetchInitialData]);

  // If the user isn't logged in, redirect them back to the sign-in page
  useEffect(() => {
    if (isMounted && !session.isAuthenticated) router.push("/sign-in");
  }, [session.isAuthenticated, isMounted, router]);

  // Show a nice loading screen while we're figuring out the session
  if (!isMounted || !session.isAuthenticated) {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sm-primary flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          </div>
          <p className="text-[13px] text-foreground/45 font-light">Verifying session...</p>
        </div>
      </div>
    );
  }

  // The main layout structure
  return (
    <div className="min-h-screen w-screen bg-background text-foreground transition-colors duration-300">
      {/* Our sticky sidebar on the left */}
      <Sidebar />

      {/* The main content area that shifts when the sidebar expands */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ paddingLeft: isSidebarExpanded ? "260px" : "76px" }}
      >
        {/* The top navigation bar */}
        <DashboardNavbar />
        
        {/* The actual page content */}
        <main className="flex-1 pt-14 overflow-x-hidden">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* A global command palette for quick searching (Cmd+K) */}
      <CommandPalette />
    </div>
  );
}
