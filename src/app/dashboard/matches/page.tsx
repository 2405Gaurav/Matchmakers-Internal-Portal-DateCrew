"use client";

import React, { useState, useMemo } from "react";
import { useCRMStore } from "@/store/crmStore";
import { calculateCompatibilityScore } from "@/utils/matchingEngine";
import { CustomerProfile } from "@/types/crm";
import { useRouter } from "next/navigation";
import {
  Heart,
  Mail,
  User,
  Search,
  Check,
  CheckCircle,
  X,
  Bookmark,
  Send,
  Eye
} from "lucide-react";

export default function MatchesPage() {
  const router = useRouter();
  const {
    profiles,
    selectedProfileId,
    selectProfile,
    saveMatch,
    sendMatchProposal
  } = useCRMStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<CustomerProfile | null>(null);
  
  // Modal & Toast States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Main Client
  const clientA = useMemo(() => {
    return profiles.find((p) => p.id === selectedProfileId) || null;
  }, [profiles, selectedProfileId]);

  // Clients available to match (usually Active Search or Verified)
  const availableClients = useMemo(() => {
    return profiles.filter(
      (p) =>
        p.status === "Active Search" ||
        p.status === "Profile Verified" ||
        p.status === "Matched"
    );
  }, [profiles]);

  // Filter clients based on dropdown search
  const filteredClients = useMemo(() => {
    if (!searchQuery) return availableClients.slice(0, 8);
    const q = searchQuery.toLowerCase();
    return availableClients.filter((p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q)
    );
  }, [availableClients, searchQuery]);

  // Opposite gender candidates ranked by compatibility
  const candidatesWithScore = useMemo(() => {
    if (!clientA) return [];

    const oppositeGender = clientA.gender === "Male" ? "Female" : "Male";
    const candidates = profiles.filter((p) => p.gender === oppositeGender);

    return candidates
      .map((cand) => {
        const report = calculateCompatibilityScore(clientA, cand);
        return {
          candidate: cand,
          report
        };
      })
      .sort((a, b) => b.report.score - a.report.score);
  }, [clientA, profiles]);

  // Handle Save for Later
  const handleSaveForLater = (candidateId: string, name: string) => {
    if (!clientA) return;
    saveMatch(clientA.id, candidateId);
    showToast(`Saved ${name} as a potential match in pipeline.`);
  };

  // Open Send Match Modal
  const handleOpenSendMatchModal = (candidate: CustomerProfile, suggestedIntro: string) => {
    if (!clientA) return;
    setSelectedMatch(candidate);
    setEmailSubject(`Curated Matrimonial Recommendation: Meet ${candidate.firstName}`);
    setEmailBody(suggestedIntro);
    setIsModalOpen(true);
  };

  // Send Match Proposal Submit
  const handleSendMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientA || !selectedMatch) return;

    sendMatchProposal(clientA.id, selectedMatch.id);
    setIsModalOpen(false);
    showToast(`Proposal email sent successfully to ${clientA.firstName}!`);
    setSelectedMatch(null);
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 65) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="space-y-6 text-left relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-semibold text-xs shadow-glow-lg animate-fade-in-up">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Title Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Heart className="w-5.5 h-5.5 text-rose-500 fill-rose-500/15" /> Matrimonial Match-Matching Engine
        </h1>
        <p className="text-xs text-foreground/60 mt-1">
          Select a customer to compute matching metrics, inspect compatibility scoring, and dispatch proposals.
        </p>
      </div>

      {/* Main Core Matching Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Selector Side Panel */}
        <div className="lg:col-span-1 p-5 rounded-2xl glass-panel space-y-4 h-fit">
          <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1">
            <User className="w-4 h-4 text-brand-500" /> 1. Select Client
          </h3>

          <div className="space-y-3">
            {/* Search Input for Dropdown */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                placeholder="Find a client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-semibold"
              />
            </div>

            {/* List of Clients */}
            <div className="space-y-1 max-h-[240px] overflow-y-auto pr-1">
              {filteredClients.map((p) => {
                const isSelected = clientA?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      selectProfile(p.id);
                      setSelectedMatch(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                      isSelected
                        ? "bg-brand-600/10 text-brand-500 dark:text-brand-300 border-brand-500/20 shadow-glow"
                        : "hover:bg-input border-transparent text-foreground/80"
                    }`}
                  >
                    <span className="truncate">{p.firstName} {p.lastName}</span>
                    <span className="text-[10px] text-foreground/45">({p.gender[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active selection summary */}
          {clientA && (
            <div className="pt-4 border-t border-border space-y-2 text-xs">
              <h4 className="text-[9px] font-bold text-foreground/45 uppercase tracking-wider">Matching Parameters</h4>
              <div className="space-y-1">
                <p><span className="text-foreground/50">Age:</span> <span className="font-semibold">{clientA.age} years</span></p>
                <p><span className="text-foreground/50">Religion:</span> <span className="font-semibold">{clientA.religion}</span></p>
                <p><span className="text-foreground/50">Income:</span> <span className="font-semibold text-emerald-500">₹{clientA.career.income} LPA</span></p>
                <p><span className="text-foreground/50">Preference Age:</span> <span className="font-semibold">{clientA.preferences.preferredAgeRange.min}-{clientA.preferences.preferredAgeRange.max}</span></p>
              </div>
            </div>
          )}
        </div>

        {/* Matches Candidates Grid */}
        <div className="lg:col-span-3 space-y-6">
          {!clientA ? (
            <div className="p-12 text-center glass-panel rounded-2xl border border-border flex flex-col items-center justify-center min-h-[300px]">
              <Heart className="w-12 h-12 text-rose-500/30 animate-pulse mb-3" />
              <h3 className="text-sm font-semibold text-foreground">Select a CRM Client to Match</h3>
              <p className="text-xs text-foreground/60 mt-1 max-w-xs leading-relaxed">
                Click a client in the left-hand panel to calculate compatibility scores and generate matrimonial suggestions.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header metrics */}
              <div className="flex justify-between items-center text-xs px-2">
                <span className="font-semibold text-foreground/60">
                  Found <span className="text-foreground font-bold">{candidatesWithScore.length}</span> opposite-gender matches for <span className="text-brand-500 font-bold">{clientA.firstName} {clientA.lastName}</span>
                </span>
                <span className="text-[10px] bg-brand-500/10 text-brand-500 font-bold px-2 py-0.5 rounded-full">
                  Ranked compatibility
                </span>
              </div>

              {/* Candidates Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidatesWithScore.slice(0, 12).map(({ candidate, report }) => {
                  const isSaved = clientA.savedMatches.includes(candidate.id);
                  const isSent = clientA.sentMatches.includes(candidate.id);

                  return (
                    <div
                      key={candidate.id}
                      className="p-5 rounded-2xl glass-panel border border-border flex flex-col justify-between hover:border-brand-500/30 transition-all duration-200"
                    >
                      {/* Top Row: Initials & Score */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white bg-gradient-to-tr ${candidate.gender === "Male" ? "from-brand-600 to-indigo-600" : "from-pink-500 to-purple-500"}`}>
                            {candidate.firstName[0]}{candidate.lastName[0]}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-sm text-foreground">{candidate.firstName} {candidate.lastName}</h4>
                            <p className="text-[10px] text-foreground/60 mt-0.5">{candidate.age} yrs • {candidate.city} • ₹{candidate.career.income} LPA</p>
                          </div>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getScoreColorClass(report.score)}`}>
                          {report.score}% Match
                        </span>
                      </div>

                      {/* Summary Explanation */}
                      <div className="mt-4 text-xs text-foreground/80 leading-relaxed text-left font-medium border-t border-border/80 pt-3">
                        {report.explanation}
                      </div>

                      {/* Strengths & Highlights */}
                      <div className="mt-3.5 space-y-1.5 text-left">
                        <h5 className="text-[9px] font-bold text-foreground/45 uppercase tracking-wider">Key Highlights</h5>
                        {report.strengths.slice(0, 2).map((str, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-semibold">
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{str}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-5 pt-3 border-t border-border/80">
                        <button
                          onClick={() => router.push(`/dashboard/customers/${candidate.id}`)}
                          className="flex-1 py-1.5 rounded-lg bg-input/40 border border-border text-[10px] font-semibold hover:bg-input text-foreground transition-all flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Profile
                        </button>
                        
                        <button
                          onClick={() => handleSaveForLater(candidate.id, candidate.firstName)}
                          disabled={isSaved}
                          className={`px-3 py-1.5 rounded-lg border text-[10px] font-semibold transition-all flex items-center justify-center gap-1 ${
                            isSaved
                              ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                              : "bg-input/40 border-border text-foreground hover:bg-input"
                          }`}
                          title="Save to Pipeline"
                        >
                          <Bookmark className="w-3.5 h-3.5" /> {isSaved ? "Saved" : "Save"}
                        </button>

                        <button
                          onClick={() => handleOpenSendMatchModal(candidate, report.suggestedIntro)}
                          disabled={isSent}
                          className={`flex-1 py-1.5 rounded-lg font-semibold text-[10px] transition-all flex items-center justify-center gap-1 ${
                            isSent
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-brand-600 hover:bg-brand-500 text-white shadow-glow"
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" /> {isSent ? "Proposal Sent" : "Send Match"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Send Match Modal (Mock Email Preview) */}
      {isModalOpen && selectedMatch && clientA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-border shadow-glow-lg bg-[#ffffff] dark:bg-[#0c081e] p-6 z-10 text-left">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Mail className="w-4.5 h-4.5 text-brand-500" /> Send Match Proposal
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-input text-foreground/50 hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendMatchSubmit} className="space-y-4 text-xs font-semibold">
              <div className="space-y-3.5 bg-input/20 p-4 rounded-xl border border-border">
                <div className="grid grid-cols-6 items-center gap-2">
                  <span className="col-span-1 text-foreground/60">From:</span>
                  <span className="col-span-5 text-foreground">matchmaker@thedatecrew.com (The Date Crew Portal)</span>
                </div>
                <div className="grid grid-cols-6 items-center gap-2">
                  <span className="col-span-1 text-foreground/60">To:</span>
                  <span className="col-span-5 text-foreground">{clientA.email} ({clientA.firstName} {clientA.lastName})</span>
                </div>
                <div className="grid grid-cols-6 items-center gap-2 border-t border-border/80 pt-2.5">
                  <span className="col-span-1 text-foreground/60">Subject:</span>
                  <input
                    type="text"
                    required
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="col-span-5 p-1.5 rounded border border-border bg-background focus:outline-none focus:border-brand-500 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-foreground/80">Message Body (Editable Intro)</label>
                <textarea
                  rows={10}
                  required
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:border-brand-500 text-xs font-medium leading-relaxed font-sans"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-border mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-input text-foreground/80 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-glow hover:from-purple-500 hover:to-indigo-500 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
