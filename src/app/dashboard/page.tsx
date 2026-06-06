"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Users,
  Heart,
  IndianRupee,
  MapPinned,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import { useCRMStore } from "@/store/crmStore";
import {
  Bar,
  AreaChart,
  Area,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// The main DashboardHome component: Where we show all the high-level metrics and charts
export default function DashboardHome() {
  // Grab the data we need from our global CRM store
  const { profiles, notifications, session } = useCRMStore();
  const [isMounted, setIsMounted] = useState(false);

  // Mark when the component has mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Compute Metrics from Profiles Data ---
  // We calculate these on the fly so they're always up to date
  const totalClients = profiles.length;
  
  // Active search or already matched
  const activeMatches = profiles.filter((p) => p.status === "Matched" || p.status === "Active Search").length;
  
  // Successful outcomes (Engaged or Married)
  const successfulMatches = profiles.filter((p) => p.status === "Engaged" || p.status === "Married").length;
  
  // New leads or those waiting for verification
  const pendingReviews = profiles.filter((p) => p.status === "New Lead" || p.status === "Verification Pending").length;
  
  // Conversion percentage calculation
  const conversionRate = totalClients > 0 ? ((successfulMatches / totalClients) * 100).toFixed(1) : "0.0";
  
  const verifiedCount = profiles.filter((p) => p.status === "Profile Verified").length;
  
  // Count profiles touched in the last 2 weeks
  const recentlyActive = profiles.filter((p) => {
    const lastTouch = new Date(p.updatedAt || p.lastActivity);
    const dayDifference = (Date.now() - lastTouch.getTime()) / (1000 * 60 * 60 * 24);
    return dayDifference <= 14;
  }).length;

  const avgAge = profiles.length
    ? Math.round(profiles.reduce((sum, profile) => sum + profile.age, 0) / profiles.length)
    : 0;
    
  const newLeads = profiles.filter((p) => p.status === "New Lead").length;

  // Rough estimation of monthly revenue based on active clients
  const monthlyRevenueLakhs = (profiles.filter((p) => p.status !== "New Lead" && p.status !== "Verification Pending").length * 0.15).toFixed(2);

  // Prepare data for the success trends chart (trailing 6 months)
  const trendData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const result: { month: string; year: number; matches: number }[] = [];
    
    // Generate the last 6 months buckets
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      result.push({
        month: months[d.getMonth()],
        year: d.getFullYear(),
        matches: 0
      });
    }

    // Populate buckets with data from profiles and activity notifications
    profiles.forEach((p) => {
      if (p.status === "Married" || p.status === "Engaged") {
        const date = p.updatedAt ? new Date(p.updatedAt) : new Date(p.lastActivity);
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const bucket = result.find((r) => months.indexOf(r.month) === monthIndex && r.year === year);
        if (bucket) {
          bucket.matches += 1;
        }
      }
    });

    return result.map(({ month, matches }) => ({ month, matches }));
  }, [profiles]);

  const journeyData = [
    { stage: "Leads", count: profiles.filter(p => p.status === "New Lead").length },
    { stage: "Pending", count: profiles.filter(p => p.status === "Verification Pending").length },
    { stage: "Verified", count: profiles.filter(p => p.status === "Profile Verified").length },
    { stage: "Active", count: profiles.filter(p => p.status === "Active Search").length },
    { stage: "Matched", count: profiles.filter(p => p.status === "Matched").length },
    { stage: "Married", count: successfulMatches }
  ];

  const cityCounts: Record<string, number> = {};
  profiles.forEach((p) => {
    cityCounts[p.city] = (cityCounts[p.city] || 0) + 1;
  });
  const cityData = Object.entries(cityCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const maleCount = profiles.filter((p) => p.gender === "Male").length;
  const femaleCount = profiles.filter((p) => p.gender === "Female").length;
  const genderData = [
    { name: "Grooms", value: maleCount, color: "#d97706" },
    { name: "Brides", value: femaleCount, color: "#0f766e" }
  ];

  const COLORS = ["#d97706", "#fb923c", "#14b8a6", "#22c55e", "#0f766e", "#b45309"];

  const metrics = [
    {
      title: "Active Pipeline",
      value: activeMatches,
      note: "Clients in active search",
      icon: Activity,
      accent: "text-sm-primary",
      surface: "bg-sm-tertiary",
    },
    {
      title: "Total Clients",
      value: totalClients,
      note: "Database population",
      icon: Users,
      accent: "text-sm-on-surface",
      surface: "bg-muted",
    },
    {
      title: "Verified",
      value: verifiedCount,
      note: "Ready for matching",
      icon: UserRoundCheck,
      accent: "text-emerald-700",
      surface: "bg-emerald-50",
    },
    {
      title: "Success Rate",
      value: `${conversionRate}%`,
      note: "Matches to marriages",
      icon: Heart,
      accent: "text-amber-700",
      surface: "bg-amber-50",
    },
  ];

  return (
    <motion.div className="space-y-10 pb-12" initial="hidden" animate="show" variants={stagger}>
      {/* ── Dashboard Header ────────────────────────────────────────── */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card-bg px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-sm-muted">
            <Sparkles className="h-3.5 w-3.5 text-sm-primary" />
            Editorial Overview
          </div>
          <h1 className="mt-4 font-display text-[44px] leading-tight tracking-tight text-foreground">
            Pipeline overview
          </h1>
          <p className="mt-2 text-[16px] text-sm-muted font-light leading-relaxed">
            A calm view of client movement and relationship progress across the team.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-card-bg border border-border shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-sm-muted">Run Rate</p>
            <p className="text-[16px] font-medium text-foreground">₹{monthlyRevenueLakhs}L</p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-card-bg border border-border shadow-sm">
            <p className="text-[10px] uppercase tracking-wider text-sm-muted">Activity</p>
            <p className="text-[16px] font-medium text-foreground">{recentlyActive} <span className="text-[11px] text-sm-muted font-normal ml-1">last 14d</span></p>
          </div>
        </div>
      </motion.div>

      {/* ── Key Metrics Grid ────────────────────────────────────────── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.title} className="glass-panel p-6 flex flex-col justify-between group hover:border-sm-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${m.surface} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${m.accent}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sm-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <p className="text-[32px] font-display text-foreground leading-none mb-2">
                  {m.value}
                </p>
                <p className="text-[13px] font-medium text-foreground/80">{m.title}</p>
                <p className="text-[11px] text-sm-muted mt-1">{m.note}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ── Primary Charts ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Journey Chart */}
        <motion.div variants={fadeUp} className="lg:col-span-2 glass-panel p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display text-[20px] text-foreground">Client Journey</h3>
              <p className="text-[13px] text-sm-muted mt-1">Movement through the matchmaking funnel</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sm-primary" />
              <span className="text-[11px] text-sm-muted uppercase tracking-wider">Volume</span>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={journeyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorJourney" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97706" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="stage" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "var(--muted-fg)" }} 
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--muted-fg)" }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card-bg)", 
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)"
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#D97706" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorJourney)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary: Matches Over Time */}
        <motion.div variants={fadeUp} className="glass-panel p-8">
          <div className="mb-8">
            <h3 className="font-display text-[20px] text-foreground">Success Trends</h3>
            <p className="text-[13px] text-sm-muted mt-1">Marriages & engagements by month</p>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "var(--muted-fg)" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                  contentStyle={{ 
                    backgroundColor: "var(--card-bg)", 
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    fontSize: "12px"
                  }}
                />
                <Bar dataKey="matches" fill="#D97706" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* ── Tertiary Charts ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* City Distribution */}
        <motion.div variants={fadeUp} className="glass-panel p-8">
          <h3 className="font-display text-[18px] text-foreground mb-6">Top Locations</h3>
          <div className="space-y-5">
            {cityData.map((city, idx) => (
              <div key={city.name} className="space-y-2">
                <div className="flex justify-between text-[12px]">
                  <span className="text-foreground font-medium">{city.name}</span>
                  <span className="text-sm-muted">{city.value} clients</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(city.value / cityData[0].value) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="h-full bg-sm-primary opacity-80"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gender Balance */}
        <motion.div variants={fadeUp} className="glass-panel p-8">
          <h3 className="font-display text-[18px] text-foreground mb-4">Gender Balance</h3>
          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[24px] font-display text-foreground">{totalClients}</span>
              <span className="text-[10px] uppercase tracking-widest text-sm-muted">Total</span>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-8">
            {genderData.map((g) => (
              <div key={g.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                <span className="text-[12px] text-sm-muted">{g.name} ({g.value})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Triage / Alerts */}
        <motion.div variants={fadeUp} className="glass-panel p-8 bg-sm-surface/30">
          <h3 className="font-display text-[18px] text-foreground mb-4">Action Required</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-card-bg border border-border shadow-sm">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-foreground">{pendingReviews} Pending Reviews</p>
                <p className="text-[11px] text-sm-muted mt-0.5">Profiles awaiting verification or triage.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-card-bg border border-border shadow-sm">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Clock3 className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-foreground">{newLeads} New Leads</p>
                <p className="text-[11px] text-sm-muted mt-0.5">Untouched leads from the last 48 hours.</p>
              </div>
            </div>
            <button className="w-full mt-2 py-3 rounded-xl border border-border bg-card-bg text-[12px] font-medium text-foreground hover:bg-muted transition-colors">
              View all tasks
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
