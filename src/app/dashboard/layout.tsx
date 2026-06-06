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
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sm-primary flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          </div>
          <p className="text-[13px] text-gray-400 font-light">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <div
        className="flex flex-col min-h-screen transition-all duration-300"
        style={{ paddingLeft: isSidebarCollapsed ? "72px" : "240px" }}
      >
        <DashboardNavbar />
        <main className="flex-1 pt-14 overflow-x-hidden">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      <CommandPalette />
    </div>
  );
}
