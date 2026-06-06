"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Heart, UserPlus, FileText, CheckCircle, Clock } from "lucide-react";
import { useCRMStore } from "@/store/crmStore";

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
    return `${diffDays}d ago`;
  } catch {
    return "Some time ago";
  }
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifications = useCRMStore((state) => state.notifications);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "status_change": return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
      case "note_added":    return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      case "match_sent":    return <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />;
      case "match_saved":   return <Heart className="w-3.5 h-3.5 text-hn-primary/70" />;
      case "lead_created":  return <UserPlus className="w-3.5 h-3.5 text-hn-primary" />;
      default:              return <Bell className="w-3.5 h-3.5 text-foreground/50" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-hn-sm hover:bg-white/5 text-foreground/50 hover:text-foreground transition-colors relative"
      >
        <Bell className="w-4 h-4" />
        {notifications.length > 0 && (
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-hn-primary rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-76 max-h-96 rounded-hn-lg glass-panel border border-white/10 shadow-hn-soft z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
            <span className="text-label-sm font-medium text-foreground">Activity Feed</span>
            <span className="text-[10px] bg-hn-primary/8 text-hn-primary/70 border border-hn-primary/15 px-2 py-0.5 rounded-hn-pill">
              CRM Logs
            </span>
          </div>

          <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-label-sm text-foreground/35">
                No recent activity.
              </div>
            ) : (
              notifications.map((act) => (
                <div key={act.id} className="px-4 py-3 hover:bg-white/3 transition-colors flex gap-3">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                    {getIcon(act.type)}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-label-sm font-medium text-foreground truncate">
                      {act.profileName}
                    </span>
                    <span className="text-label-sm text-foreground/65 mt-0.5">{act.message}</span>
                    {act.details && (
                      <span className="text-[10px] text-foreground/40 mt-1 line-clamp-2">{act.details}</span>
                    )}
                    <span className="text-[10px] text-foreground/30 flex items-center gap-1 mt-1">
                      <Clock className="w-2.5 h-2.5" />
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
