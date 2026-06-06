"use client";

import React, { useEffect, useState } from "react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { CommandPalette } from "@/components/features/CommandPalette";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, isSidebarCollapsed, fetchInitialData } = useCRMStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (isMounted && session.isAuthenticated) fetchInitialData();
  }, [session.isAuthenticated, isMounted, fetchInitialData]);

  useEffect(() => {
    if (isMounted && !session.isAuthenticated) router.push("/sign-in");
  }, [session.isAuthenticated, isMounted, router]);

  if (!isMounted || !session.isAuthenticated) {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-hn-secondary text-hn-primary">
        <Loader2 className="w-8 h-8 animate-spin text-hn-primary/40 mb-3" />
        <p className="font-body text-label-sm text-hn-primary/35">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-hn-secondary text-hn-primary relative">
      <Sidebar />

      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ paddingLeft: isSidebarCollapsed ? "72px" : "240px" }}
      >
        <DashboardNavbar />

        <main className="flex-1 pt-14 px-6 pb-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
