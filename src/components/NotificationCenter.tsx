"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Heart, UserPlus, FileText, CheckCircle, Clock } from "lucide-react";
import { useCRMStore } from "../store/crmStore";
// To avoid dependencies issues, writing a custom relative time function is safer and faster.

function formatRelativeTime(dateString: string): string {
  try {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  } catch {
    return "Some time ago";
  }
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifications = useCRMStore((state) => state.notifications);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "status_change":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "note_added":
        return <FileText className="w-4 h-4 text-amber-500" />;
      case "match_sent":
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />;
      case "match_saved":
        return <Heart className="w-4 h-4 text-indigo-500" />;
      case "lead_created":
        return <UserPlus className="w-4 h-4 text-brand-500" />;
      default:
        return <Bell className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-input/80 hover:bg-input border border-border text-foreground/80 hover:text-foreground transition-all duration-200 relative"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-600 rounded-full animate-pulse shadow-glow" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl glass-panel border border-border shadow-glow-lg z-50 py-2 divide-y divide-border">
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="font-semibold text-sm text-foreground">Recent Activity Feed</span>
            <span className="text-[10px] bg-brand-500/10 text-brand-500 font-medium px-2 py-0.5 rounded-full">
              CRM Logs
            </span>
          </div>

          <div className="divide-y divide-border max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-foreground/50">
                No recent activity logs.
              </div>
            ) : (
              notifications.map((act) => (
                <div key={act.id} className="px-4 py-3 hover:bg-input/30 transition-colors flex gap-3 text-left">
                  <div className="mt-0.5 w-7 h-7 rounded-full bg-input flex items-center justify-center shrink-0 border border-border">
                    {getIcon(act.type)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-semibold text-foreground truncate">
                      {act.profileName}
                    </span>
                    <span className="text-xs text-foreground/80 font-medium mt-0.5">
                      {act.message}
                    </span>
                    {act.details && (
                      <span className="text-[10px] text-foreground/60 mt-1 line-clamp-2">
                        {act.details}
                      </span>
                    )}
                    <span className="text-[9px] text-foreground/45 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatRelativeTime(act.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
