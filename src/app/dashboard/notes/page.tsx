"use client";

import React, { useState, useMemo } from "react";
import { useCRMStore } from "@/store/crmStore";
import { useRouter } from "next/navigation";
import {
  Notebook,
  Search,
  Sparkles,
  User,
  Trash2,
  Edit2,
  Calendar,
  ArrowRight,
  Check,
  X
} from "lucide-react";

export default function NotesFeedPage() {
  const router = useRouter();
  const { profiles, editNote, deleteNote, selectProfile, setSidebarTab } = useCRMStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [aiFilter, setAiFilter] = useState<"all" | "ai" | "manual">("all");

  // Editing States
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Gather all notes across all profiles
  const allNotes = useMemo(() => {
    const list: Array<{
      profileId: string;
      profileName: string;
      profileGender: "Male" | "Female";
      noteId: string;
      date: string;
      author: string;
      content: string;
      isAiGenerated?: boolean;
    }> = [];

    profiles.forEach((p) => {
      p.notes.forEach((n) => {
        list.push({
          profileId: p.id,
          profileName: `${p.firstName} ${p.lastName}`,
          profileGender: p.gender,
          noteId: n.id,
          date: n.date,
          author: n.author,
          content: n.content,
          isAiGenerated: n.isAiGenerated
        });
      });
    });

    // Sort newest notes first
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [profiles]);

  // Extract unique authors
  const uniqueAuthors = useMemo(() => {
    const set = new Set(allNotes.map((n) => n.author));
    return Array.from(set).sort();
  }, [allNotes]);

  // Filter notes
  const filteredNotes = useMemo(() => {
    let list = [...allNotes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (n) =>
          n.content.toLowerCase().includes(q) ||
          n.profileName.toLowerCase().includes(q)
      );
    }

    if (authorFilter !== "All") {
      list = list.filter((n) => n.author === authorFilter);
    }

    if (aiFilter === "ai") {
      list = list.filter((n) => n.isAiGenerated === true);
    } else if (aiFilter === "manual") {
      list = list.filter((n) => !n.isAiGenerated);
    }

    return list;
  }, [allNotes, searchQuery, authorFilter, aiFilter]);

  const handleGoToProfile = (profileId: string) => {
    selectProfile(profileId);
    setSidebarTab("Customers");
    router.push(`/dashboard/customers/${profileId}`);
  };

  const handleStartEdit = (profileId: string, noteId: string, content: string) => {
    setEditingProfileId(profileId);
    setEditingNoteId(noteId);
    setEditingContent(content);
  };

  const handleSaveEdit = () => {
    if (!editingProfileId || !editingNoteId || !editingContent.trim()) return;
    editNote(editingProfileId, editingNoteId, editingContent.trim());
    setEditingProfileId(null);
    setEditingNoteId(null);
    setEditingContent("");
  };

  return (
    <div className="space-y-6 text-left relative">
      {/* Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Notebook className="w-5.5 h-5.5 text-brand-500" /> Matchmaker Consult Notes Archive
        </h1>
        <p className="text-xs text-foreground/60 mt-1">
          Monitor recent feedback logs, filter by matchmaker author, and quickly navigate to client profiles.
        </p>
      </div>

      {/* Filter panel */}
      <div className="p-4 rounded-2xl glass-panel grid grid-cols-1 md:grid-cols-3 gap-4 border border-border">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-foreground/45" />
          <input
            type="text"
            placeholder="Search notes content or client name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-semibold"
          />
        </div>

        {/* Author filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/60 font-semibold shrink-0">Author:</span>
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
          >
            <option value="All">All Authors</option>
            {uniqueAuthors.map((auth) => (
              <option key={auth} value={auth}>
                {auth}
              </option>
            ))}
          </select>
        </div>

        {/* AI toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/60 font-semibold shrink-0">Source:</span>
          <select
            value={aiFilter}
            onChange={(e) => setAiFilter(e.target.value as typeof aiFilter)}
            className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
          >
            <option value="all">All Sources</option>
            <option value="manual">Matchmaker Only</option>
            <option value="ai">AI Generated Summaries</option>
          </select>
        </div>
      </div>

      {/* Notes Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-2 p-12 text-center glass-panel rounded-2xl text-foreground/50 text-xs font-semibold">
            No notes found matching the selected filters.
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isEditing = editingNoteId === note.noteId;

            return (
              <div
                key={note.noteId}
                className="p-4 rounded-2xl glass-panel border border-border hover:border-brand-500/20 transition-all duration-200 flex flex-col justify-between group text-left relative"
              >
                {/* Upper info */}
                <div>
                  <div className="flex justify-between items-start gap-2">
                    {/* Client navigation */}
                    <button
                      onClick={() => handleGoToProfile(note.profileId)}
                      className="font-bold text-xs text-brand-500 dark:text-brand-400 hover:underline flex items-center gap-1 text-left"
                    >
                      {note.profileName}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Date stamp */}
                    <span className="text-[10px] text-foreground/45 font-medium flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {new Date(note.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>

                  {/* Author and AI Tag */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] text-foreground/60 font-semibold flex items-center gap-0.5">
                      <User className="w-3 h-3 text-foreground/40" />
                      {note.author}
                    </span>
                    {note.isAiGenerated && (
                      <span className="text-[8px] bg-purple-500/10 text-purple-400 font-bold px-1.5 py-0.5 rounded border border-purple-500/15 uppercase tracking-wider flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5 animate-pulse" /> AI Summary
                      </span>
                    )}
                  </div>

                  {/* Note Content */}
                  <div className="mt-3 text-xs leading-relaxed text-foreground/90 font-medium">
                    {isEditing ? (
                      <div className="flex gap-1.5 mt-1 w-full">
                        <input
                          type="text"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="w-full px-2 py-1 rounded border border-brand-500 focus:outline-none bg-background text-xs font-semibold"
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="p-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingNoteId(null);
                            setEditingProfileId(null);
                          }}
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

                {/* Bottom actions */}
                {!isEditing && (
                  <div className="flex justify-end gap-1 mt-4 pt-2 border-t border-border/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleStartEdit(note.profileId, note.noteId, note.content)}
                      className="p-1.5 rounded hover:bg-input text-foreground/60 hover:text-brand-500 transition-colors"
                      title="Edit Note"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.profileId, note.noteId)}
                      className="p-1.5 rounded hover:bg-input text-foreground/60 hover:text-red-500 transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
