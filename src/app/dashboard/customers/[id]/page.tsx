"use client";

import React, { useState, use } from "react";
import { useCRMStore } from "@/store/crmStore";
import { exportProfileToPdf } from "@/utils/pdfExport";
import { ProfileStatus } from "@/types/crm";
import { useRouter } from "next/navigation";
import {
  Heart,
  FileDown,
  ArrowLeft,
  Briefcase,
  MapPin,
  HeartHandshake,
  User,
  Users,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Sparkles,
  Phone,
  Mail,
  GraduationCap,
  Loader2
} from "lucide-react";

export default function CustomerProfilePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrapping params as required by Next.js 15
  const { id: profileId } = use(params);
  const router = useRouter();

  const {
    profiles,
    updateProfileStatus,
    addNote,
    editNote,
    deleteNote,
    selectProfile,
    setSidebarTab
  } = useCRMStore();

  const profile = profiles.find((p) => p.id === profileId);

  // Note management states
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  
  // Tab states
  const [activeTab, setActiveTab] = useState<"info" | "preferences" | "journey">("info");

  if (!profile) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-left">
        <h2 className="text-xl font-bold text-foreground">Client Profile Not Found</h2>
        <p className="text-xs text-foreground/60 mt-1">The requested profile ID does not exist in the database.</p>
        <button
          onClick={() => router.push("/dashboard/customers")}
          className="mt-4 px-4 py-2 rounded-lg bg-input border border-border text-xs font-semibold hover:bg-input/80 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Database
        </button>
      </div>
    );
  }

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    addNote(profile.id, newNoteContent.trim());
    setNewNoteContent("");
  };

  const handleStartEditNote = (noteId: string, content: string) => {
    setEditingNoteId(noteId);
    setEditingContent(content);
  };

  const handleSaveEditNote = (noteId: string) => {
    if (!editingContent.trim()) return;
    editNote(profile.id, noteId, editingContent.trim());
    setEditingNoteId(null);
    setEditingContent("");
  };

  const handleTriggerAiSummary = async () => {
    if (isAiGenerating) return;
    setIsAiGenerating(true);
    try {
      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile })
      });

      if (res.ok) {
        const data = await res.json();
        await addNote(profile.id, data.summary, true);
      }
    } catch (e) {
      console.error("Error generating AI summary:", e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleFindMatches = () => {
    selectProfile(profile.id);
    setSidebarTab("Matches");
    router.push("/dashboard/matches");
  };

  const getStatusBadgeClass = (status: ProfileStatus) => {
    switch (status) {
      case "New Lead":
        return "bg-sky-500/10 text-sky-500 border-sky-500/20";
      case "Verification Pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Profile Verified":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Active Search":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Matched":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "Engaged":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "Married":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  };

  return (
    <div className="space-y-6 text-left print-container">
      {/* Back Button & Dossier Actions */}
      <div className="flex justify-between items-center print-hidden border-b border-border/85 pb-4">
        <button
          onClick={() => {
            selectProfile(null);
            router.push("/dashboard/customers");
          }}
          className="flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Customers
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => exportProfileToPdf(`${profile.firstName}_${profile.lastName}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-input/40 text-foreground/80 font-semibold text-xs hover:bg-input transition-all duration-200"
          >
            <FileDown className="w-4 h-4" /> Export Dossier (PDF)
          </button>
          
          <button
            onClick={handleFindMatches}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-glow"
          >
            <HeartHandshake className="w-4 h-4 animate-pulse" /> Find Matches
          </button>
        </div>
      </div>

      {/* Profile Dossier Header */}
      <div className="p-6 rounded-2xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Avatar Graphic */}
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg text-white border-2 border-brand-500/30 shadow-glow ${profile.gender === "Male" ? "bg-gradient-to-tr from-brand-600 to-indigo-600" : "bg-gradient-to-tr from-pink-500 to-purple-500"}`}>
            {profile.firstName[0]}
            {profile.lastName[0]}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
              {profile.firstName} {profile.lastName}
            </h1>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-foreground/60 flex-wrap">
              <span className="font-semibold text-foreground/90">{profile.gender}</span>
              <span>•</span>
              <span>{profile.age} Years Old</span>
              <span>•</span>
              <span className="flex items-center gap-0.5"><MapPin className="w-3.5 h-3.5" />{profile.city}, {profile.country}</span>
            </div>
          </div>
        </div>

        {/* Pipeline Status Select Dropdown */}
        <div className="flex flex-col text-left md:text-right print-hidden shrink-0">
          <label className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider mb-1">
            Pipeline Status
          </label>
          <select
            value={profile.status}
            onChange={(e) => updateProfileStatus(profile.id, e.target.value as ProfileStatus)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none ${getStatusBadgeClass(
              profile.status
            )}`}
          >
            <option value="New Lead">New Lead</option>
            <option value="Verification Pending">Verification Pending</option>
            <option value="Profile Verified">Profile Verified</option>
            <option value="Active Search">Active Search</option>
            <option value="Matched">Matched</option>
            <option value="Engaged">Engaged</option>
            <option value="Married">Married</option>
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Information Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab navigation */}
          <div className="flex border-b border-border print-hidden">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "info" ? "border-brand-500 text-brand-500" : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              A-D. Profile Details
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "preferences" ? "border-brand-500 text-brand-500" : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              E-F. Preferences & Family
            </button>
            <button
              onClick={() => setActiveTab("journey")}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === "journey" ? "border-brand-500 text-brand-500" : "border-transparent text-foreground/60 hover:text-foreground"
              }`}
            >
              Customer Journey
            </button>
          </div>

          {/* TAB 1: Profile Details (Sections A-D) */}
          {(activeTab === "info" || typeof window === "undefined") && (
            <div className="space-y-6">
              {/* Section A: Personal Information */}
              <div className="p-5 rounded-2xl glass-panel space-y-4">
                <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-brand-500" /> A. Personal Information
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs text-left">
                  <div>
                    <span className="text-foreground/50 block">First Name</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.firstName}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Last Name</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.lastName}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Gender</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.gender}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Date of Birth</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.dob}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Age</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.age} Years</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Height</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.height} cm</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-foreground/50 block">Languages Spoken</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.languages.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Religion / Caste</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.religion} ({profile.caste})</span>
                  </div>
                </div>
              </div>

              {/* Section B & C: Contact & Education */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="p-5 rounded-2xl glass-panel space-y-4">
                  <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-brand-500" /> B. Contact Information
                  </h3>
                  <div className="space-y-3 text-xs text-left">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-foreground/50 shrink-0" />
                      <div>
                        <span className="text-[10px] text-foreground/50 block">Email</span>
                        <span className="font-semibold text-foreground">{profile.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-foreground/50 shrink-0" />
                      <div>
                        <span className="text-[10px] text-foreground/50 block">Phone</span>
                        <span className="font-semibold text-foreground">{profile.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-foreground/50 shrink-0" />
                      <div>
                        <span className="text-[10px] text-foreground/50 block">Residence</span>
                        <span className="font-semibold text-foreground">{profile.city}, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Info */}
                <div className="p-5 rounded-2xl glass-panel space-y-4">
                  <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-brand-500" /> C. Education
                  </h3>
                  <div className="space-y-3 text-xs text-left">
                    <div>
                      <span className="text-foreground/50 block">College</span>
                      <span className="font-semibold text-foreground block truncate">{profile.education.college}</span>
                    </div>
                    <div>
                      <span className="text-foreground/50 block">Degree</span>
                      <span className="font-semibold text-foreground block">{profile.education.degree}</span>
                    </div>
                    <div>
                      <span className="text-foreground/50 block">University</span>
                      <span className="font-semibold text-foreground block truncate">{profile.education.university}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section D: Career */}
              <div className="p-5 rounded-2xl glass-panel space-y-4">
                <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-brand-500" /> D. Career & Income
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-left">
                  <div>
                    <span className="text-foreground/50 block">Company</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.career.company}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Designation</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.career.designation}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Annual Income</span>
                    <span className="font-semibold text-emerald-500 mt-0.5 block">₹{profile.career.income} LPA</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Industry</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.career.industry}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Preferences & Family (Sections E-F) */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              {/* Section E: Preferences */}
              <div className="p-5 rounded-2xl glass-panel space-y-4">
                <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-brand-500" /> E. Matrimonial Preferences
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs text-left">
                  <div>
                    <span className="text-foreground/50 block">Preferred Age Range</span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      {profile.preferences.preferredAgeRange.min} - {profile.preferences.preferredAgeRange.max} years
                    </span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Want Kids?</span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      {profile.preferences.wantKids === "open"
                        ? "Open"
                        : profile.preferences.wantKids
                        ? "Yes"
                        : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Open to Relocate?</span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      {profile.preferences.openToRelocate === "depends"
                        ? "Depends on Partner"
                        : profile.preferences.openToRelocate
                        ? "Yes"
                        : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Open to Pets?</span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      {profile.preferences.openToPets === "depends"
                        ? "Depends"
                        : profile.preferences.openToPets
                        ? "Yes"
                        : "No"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-foreground/50 block">Preferred Locations</span>
                    <span className="font-semibold text-foreground mt-0.5 block">
                      {profile.preferences.preferredLocation.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <h4 className="text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Lifestyle Preferences</h4>
                  <div className="grid grid-cols-3 gap-4 text-xs text-left">
                    <div>
                      <span className="text-foreground/50 block">Dietary Choice</span>
                      <span className="font-semibold text-foreground mt-0.5 block uppercase">{profile.preferences.lifestyleChoices.diet}</span>
                    </div>
                    <div>
                      <span className="text-foreground/50 block">Social Drinking</span>
                      <span className="font-semibold text-foreground mt-0.5 block uppercase">{profile.preferences.lifestyleChoices.drinking}</span>
                    </div>
                    <div>
                      <span className="text-foreground/50 block">Smoking Habits</span>
                      <span className="font-semibold text-foreground mt-0.5 block uppercase">{profile.preferences.lifestyleChoices.smoking}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section F: Family Info */}
              <div className="p-5 rounded-2xl glass-panel space-y-4">
                <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-500" /> F. Family Information
                </h3>
                <div className="space-y-4 text-xs text-left">
                  <div>
                    <span className="text-foreground/50 block">Siblings</span>
                    <span className="font-semibold text-foreground mt-0.5 block">{profile.familyInfo.siblings}</span>
                  </div>
                  <div>
                    <span className="text-foreground/50 block">Family Background & Standing</span>
                    <span className="font-semibold text-foreground/90 mt-1 block leading-relaxed">{profile.familyInfo.background}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Customer Journey Status Log */}
          {activeTab === "journey" && (
            <div className="p-5 rounded-2xl glass-panel text-left space-y-4">
              <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5">
                Client Status Milestone Tracker
              </h3>
              
              {/* Journey Timeline visual progress */}
              <div className="relative border-l-2 border-border pl-6 ml-3 space-y-6 py-2">
                <div className="relative">
                  <div className="absolute -left-9 top-0.5 w-4 h-4 rounded-full bg-brand-500 border-4 border-background flex items-center justify-center shadow-glow" />
                  <h4 className="text-xs font-bold text-foreground">Registered Lead Received</h4>
                  <p className="text-[10px] text-foreground/60 mt-1">Lead received via premium landing page.</p>
                </div>

                <div className="relative">
                  <div className={`absolute -left-9 top-0.5 w-4 h-4 rounded-full border-4 border-background flex items-center justify-center ${
                    profile.status !== "New Lead" ? "bg-brand-500 shadow-glow" : "bg-input"
                  }`} />
                  <h4 className="text-xs font-bold text-foreground">Verification Dossier Checked</h4>
                  <p className="text-[10px] text-foreground/60 mt-1">Aadhaar documentation, qualifications, and income checked.</p>
                </div>

                <div className="relative">
                  <div className={`absolute -left-9 top-0.5 w-4 h-4 rounded-full border-4 border-background flex items-center justify-center ${
                    profile.status !== "New Lead" && profile.status !== "Verification Pending"
                      ? "bg-brand-500 shadow-glow"
                      : "bg-input"
                  }`} />
                  <h4 className="text-xs font-bold text-foreground">Profile Live & Active</h4>
                  <p className="text-[10px] text-foreground/60 mt-1">Profile verified. Added to active search pipelines.</p>
                </div>

                <div className="relative">
                  <div className={`absolute -left-9 top-0.5 w-4 h-4 rounded-full border-4 border-background flex items-center justify-center ${
                    profile.status === "Matched" || profile.status === "Engaged" || profile.status === "Married"
                      ? "bg-brand-500 shadow-glow"
                      : "bg-input"
                  }`} />
                  <h4 className="text-xs font-bold text-foreground">Matrimonial Matching Proposals</h4>
                  <p className="text-[10px] text-foreground/60 mt-1">Shared curated portfolios and compiled matchmaking briefs.</p>
                </div>
              </div>
            </div>
          )}

          {/* Section G: Matchmaking Notes (Timeline) */}
          <div className="p-5 rounded-2xl glass-panel space-y-6 print-hidden">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase">
                G. Matchmaker Consult Notes
              </h3>
              
              <button
                type="button"
                onClick={handleTriggerAiSummary}
                disabled={isAiGenerating}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-brand-500/10 border border-brand-500/20 text-brand-400 font-semibold text-[10px] hover:bg-brand-500/20 transition-all duration-200 disabled:opacity-50"
              >
                {isAiGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Auto AI Summary
                  </>
                )}
              </button>
            </div>

            {/* Note input form */}
            <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a new consult note (e.g. 'Prefers partner with tech background')..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-input/40 focus:bg-input focus:outline-none text-xs transition-colors"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Note
              </button>
            </form>

            {/* Notes Timeline List */}
            <div className="space-y-4">
              {profile.notes.length === 0 ? (
                <p className="text-center py-6 text-foreground/50 text-xs font-medium">
                  No matchmaking notes recorded yet.
                </p>
              ) : (
                <div className="relative border-l border-border/80 pl-6 ml-3.5 space-y-4">
                  {profile.notes.map((note) => {
                    const isAi = note.isAiGenerated;
                    const isEditing = editingNoteId === note.id;

                    return (
                      <div key={note.id} className="relative group text-left">
                        {/* Note Dot Indicator */}
                        <div className={`absolute -left-9 top-1 w-3 h-3 rounded-full border border-background ${
                          isAi ? "bg-purple-500 animate-pulse shadow-glow" : "bg-brand-500"
                        }`} />

                        {/* Note Card */}
                        <div className="p-3 rounded-lg border border-border bg-input/20 group-hover:border-brand-500/20 transition-all">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-xs text-foreground">
                                {note.author}
                              </span>
                              {isAi && (
                                <span className="text-[8px] bg-purple-500/10 text-purple-400 font-bold px-1.5 py-0.5 rounded border border-purple-500/15 uppercase tracking-wider flex items-center gap-0.5">
                                  <Sparkles className="w-2.5 h-2.5" /> AI Consultant
                                </span>
                              )}
                              <span className="text-[10px] text-foreground/45 font-medium">
                                • {new Date(note.date).toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })}
                              </span>
                            </div>

                            {/* Note Action Buttons */}
                            {!isEditing && (
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleStartEditNote(note.id, note.content)}
                                  className="p-1 rounded text-foreground/60 hover:text-brand-500 hover:bg-input transition-all"
                                  title="Edit Note"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteNote(profile.id, note.id)}
                                  className="p-1 rounded text-foreground/60 hover:text-red-500 hover:bg-input transition-all"
                                  title="Delete Note"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Note Content Text */}
                          <div className="mt-2 text-xs leading-relaxed text-foreground/90 font-medium">
                            {isEditing ? (
                              <div className="flex gap-1.5 mt-1">
                                <input
                                  type="text"
                                  value={editingContent}
                                  onChange={(e) => setEditingContent(e.target.value)}
                                  className="w-full px-2 py-1 rounded border border-brand-500 focus:outline-none bg-background text-xs font-semibold"
                                />
                                <button
                                  onClick={() => handleSaveEditNote(note.id)}
                                  className="p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="p-1 rounded bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              note.content
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Summary details */}
        <div className="space-y-6">
          {/* Assigned details panel */}
          <div className="p-5 rounded-2xl glass-panel text-left space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5">
              CRM Matchmaker Brief
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-foreground/50 block">Assigned Matchmaker</span>
                <span className="font-semibold text-foreground mt-0.5 block">{profile.assignedMatchmaker}</span>
              </div>
              
              <div>
                <span className="text-foreground/50 block">Marital Status</span>
                <span className="font-semibold text-foreground mt-0.5 block">{profile.maritalStatus}</span>
              </div>

              <div>
                <span className="text-foreground/50 block">Dossier Completed On</span>
                <span className="font-semibold text-foreground mt-0.5 block">
                  {new Date(profile.lastActivity).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>

              <div className="pt-3 border-t border-border flex justify-between text-[11px] font-bold">
                <span className="text-foreground/50">MATCH PROPOSALS</span>
                <span className="text-brand-500">{profile.sentMatches.length} Sent</span>
              </div>
            </div>
          </div>

          {/* AI Match recommendations quick panel */}
          <div className="p-5 rounded-2xl bg-brand-500/5 border border-brand-500/15 text-left space-y-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-brand-500 fill-brand-500/20" />
              <h3 className="text-xs font-bold tracking-wider text-brand-400 uppercase">
                AI Recommendation Brief
              </h3>
            </div>
            
            <p className="text-xs leading-relaxed text-foreground/80 font-medium">
              Based on {profile.firstName}{"'s"} income (₹{profile.career.income} LPA), religion ({profile.religion}), and career preferences, our matching algorithm recommends filtering for Grooms/Brides residing in {profile.preferences.preferredLocation[0] || "Mumbai"} with a compatibility target above 80%.
            </p>

            <button
              onClick={handleFindMatches}
              className="w-full py-2 text-center rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shadow-glow"
            >
              Analyze Live Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
