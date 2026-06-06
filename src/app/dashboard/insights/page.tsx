"use client";

import React, { useState, useMemo } from "react";
import { useCRMStore } from "@/store/crmStore";
import { buildGeminiRequestHeaders } from "@/utils/geminiClient";
import {
  Sparkles,
  TrendingUp,
  Brain,
  MessageSquareCode,
  Coffee,
  ShieldCheck,
  AlertCircle,
  TriangleAlert
} from "lucide-react";

export default function AIInsightsPage() {
  const { profiles } = useCRMStore();

  const [clientAId, setClientAId] = useState("");
  const [clientBId, setClientBId] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [report, setReport] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Filter lists
  const grooms = useMemo(() => profiles.filter((p) => p.gender === "Male"), [profiles]);
  const brides = useMemo(() => profiles.filter((p) => p.gender === "Female"), [profiles]);

  const clientA = useMemo(() => profiles.find((p) => p.id === clientAId) || null, [profiles, clientAId]);
  const clientB = useMemo(() => profiles.find((p) => p.id === clientBId) || null, [profiles, clientBId]);

  const handleGenerateAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientA || !clientB) return;

    setIsAnalyzing(true);
    setReport(null);
    setErrorMessage("");

    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...buildGeminiRequestHeaders()
        },
        body: JSON.stringify({ clientA, clientB })
      });

      if (res.ok) {
        const reportData = await res.json();
        setReport(reportData);
      } else {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error || "Failed to generate Gemini analysis.");
      }
    } catch (err) {
      console.error("Error generating AI analysis:", err);
      setErrorMessage("Unable to reach the Gemini insights service.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 text-left relative">
      {/* Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="w-5.5 h-5.5 text-purple-500 fill-purple-500/15" /> AI Matchmaker Consultant Insights
        </h1>
        <p className="text-xs text-foreground/60 mt-1">
          Perform multi-profile comparative analysis and generate icebreakers using the Gemini SDK with personal-key or backend-key routing.
        </p>
      </div>

      {/* Inputs Form */}
      <div className="p-5 rounded-2xl glass-panel border border-border">
        <form onSubmit={handleGenerateAnalysis} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pick Groom (Male) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider block">
                Select Client A (Groom)
              </label>
              <select
                value={clientAId}
                onChange={(e) => setClientAId(e.target.value)}
                required
                className="w-full p-2.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-semibold"
              >
                <option value="">-- Choose Groom --</option>
                {grooms.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.firstName} {g.lastName} ({g.city} • ₹{g.career.income} LPA)
                  </option>
                ))}
              </select>
            </div>

            {/* Pick Bride (Female) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground/60 uppercase tracking-wider block">
                Select Client B (Bride)
              </label>
              <select
                value={clientBId}
                onChange={(e) => setClientBId(e.target.value)}
                required
                className="w-full p-2.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-semibold"
              >
                <option value="">-- Choose Bride --</option>
                {brides.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.firstName} {b.lastName} ({b.city} • ₹{b.career.income} LPA)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !clientAId || !clientBId}
            className="w-full md:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-glow disabled:opacity-50 flex items-center justify-center gap-1.5 mx-auto"
          >
            {isAnalyzing ? (
              <>
                <Brain className="w-4.5 h-4.5 animate-spin" />
                Synthesizing compatibility reports...
              </>
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5" /> Generate Gemini Match Analysis
              </>
            )}
          </button>
        </form>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-600 text-xs font-semibold flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Analysis Report Results */}
      {report && clientA && clientB && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Main Column: AI Analysis details */}
          <div className="lg:col-span-2 space-y-6">
            {report.warning && (
              <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-amber-700 text-xs font-semibold flex items-start gap-2">
                <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{report.warning}</span>
              </div>
            )}

            {/* Overview summary */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-purple-400 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                <Brain className="w-4 h-4" /> AI Consultant Executive Summary
              </h3>
              <p className="text-xs text-foreground/90 font-medium leading-relaxed">
                {report.summary}
              </p>
            </div>

            {/* Relationship potential */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-purple-400 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" /> Relationship Potential & Alignment
              </h3>
              <p className="text-xs text-foreground/90 font-medium leading-relaxed">
                {report.potential}
              </p>
            </div>

            {/* Suggested Meeting Icebreaker */}
            <div className="p-5 rounded-2xl bg-brand-500/5 border border-brand-500/15 space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-brand-400 uppercase border-b border-brand-500/10 pb-1.5 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-brand-500" /> Suggested First Icebreaker
              </h3>
              <blockquote className="text-xs italic text-foreground font-semibold bg-input/40 p-3 rounded-lg border-l-4 border-brand-500 leading-relaxed">
                {report.icebreaker}
              </blockquote>
            </div>

            {/* Suggested First Intro (Email Preview) */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-purple-400 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                <MessageSquareCode className="w-4 h-4" /> Suggested Matchmaker email intro
              </h3>
              <pre className="text-[10px] text-foreground/80 font-medium leading-relaxed font-sans whitespace-pre-wrap bg-input/20 p-4 rounded-xl border border-border">
                {report.firstIntro}
              </pre>
            </div>
          </div>

          {/* Right Column: Score Breakdown & Concerns */}
          <div className="space-y-6">
            {/* Score Ring */}
            <div className="p-5 rounded-2xl glass-panel flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">
                Overall Compatibility
              </span>
              
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Simulated circular progress ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="var(--border)" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="#8b5cf6"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={301.6}
                    strokeDashoffset={301.6 - (301.6 * report.score) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold text-foreground">{report.score}%</span>
                  <span className="text-[9px] text-foreground/50 font-bold uppercase">Match</span>
                </div>
              </div>

              <div className="text-[10px] text-foreground/50 leading-relaxed font-medium">
                Calculated across 12 distinct demographic and lifestyle parameters.
              </div>
            </div>

            {/* Strengths & Concerns */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5">
                Highlights & Risks
              </h3>

              <div className="space-y-4">
                {/* Strengths */}
                <div className="space-y-2">
                  <h4 className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">Strengths</h4>
                  {report.strengths.slice(0, 3).map((str: string, idx: number) => (
                    <div key={idx} className="flex gap-2 text-xs text-foreground/80 leading-relaxed font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>

                {/* Concerns */}
                {report.concerns.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-border/80">
                    <h4 className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Potential Concerns</h4>
                    {report.concerns.slice(0, 3).map((con: string, idx: number) => (
                      <div key={idx} className="flex gap-2 text-xs text-foreground/80 leading-relaxed font-semibold">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
