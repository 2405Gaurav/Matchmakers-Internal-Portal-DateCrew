import { create } from "zustand";
import { CustomerProfile, ProfileStatus, MatchmakerSession, ActivityUpdate } from "../types/crm";

interface CRMState {
  profiles: CustomerProfile[];
  session: MatchmakerSession;
  notifications: ActivityUpdate[];
  searchQuery: string;
  aiSearchQuery: string;
  selectedProfileId: string | null;
  activeSidebarTab: string;
  theme: "dark" | "light";
  isSidebarCollapsed: boolean;
  quickActionsOpen: boolean;

  // Actions
  fetchInitialData: () => Promise<void>;
  login: (email: string, name: string, role: string) => void;
  logout: () => void;
  selectProfile: (id: string | null) => void;
  setSidebarTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setAiSearchQuery: (query: string) => void;
  toggleTheme: () => void;
  setTheme: (theme: "dark" | "light") => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleQuickActions: (open?: boolean) => void;
  updateProfileStatus: (profileId: string, status: ProfileStatus) => Promise<void>;
  addNote: (profileId: string, content: string, isAi?: boolean) => Promise<void>;
  editNote: (profileId: string, noteId: string, content: string) => Promise<void>;
  deleteNote: (profileId: string, noteId: string) => Promise<void>;
  saveMatch: (profileId: string, matchId: string) => Promise<void>;
  sendMatchProposal: (profileId: string, matchId: string) => Promise<void>;
  addProfile: (profile: Omit<CustomerProfile, "id" | "notes" | "savedMatches" | "sentMatches" | "lastActivity">) => Promise<void>;
}

const getSavedSession = () => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("tdc-crm-session");
      if (saved) return JSON.parse(saved);
    } catch {}
  }
  return {
    email: "",
    name: "",
    role: "",
    isAuthenticated: false
  };
};

export const useCRMStore = create<CRMState>((set, get) => {
  // Theme helper
  const updateDOMTheme = (theme: "dark" | "light") => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      // Always enforce light theme per user request
      if (theme === "dark" || theme === "light") {
        root.classList.remove("dark");
        localStorage.setItem("tdc-crm-theme", "light");
      }
    }
  };

  // Get initial theme
  const getInitialTheme = (): "dark" | "light" => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tdc-crm-theme", "light");
      return "light";
    }
    return "light"; // Default server side
  };

  return {
    profiles: [],
    session: getSavedSession(),
    notifications: [],
    searchQuery: "",
    aiSearchQuery: "",
    selectedProfileId: null,
    activeSidebarTab: "Dashboard",
    theme: getInitialTheme(),
    isSidebarCollapsed: false,
    quickActionsOpen: false,

    fetchInitialData: async () => {
      try {
        const [profilesRes, activitiesRes] = await Promise.all([
          fetch("/api/customers"),
          fetch("/api/activities")
        ]);

        if (profilesRes.ok && activitiesRes.ok) {
          const profiles = await profilesRes.json();
          const notifications = await activitiesRes.json();
          set({ profiles, notifications });
        }
      } catch (error) {
        console.error("Error loading initial CRM data:", error);
      }
    },

    login: (email, name, role) => {
      const session = {
        email,
        name,
        role,
        isAuthenticated: true
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("tdc-crm-session", JSON.stringify(session));
      }
      set({ session });
    },

    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("tdc-crm-session");
      }
      set({
        session: {
          email: "",
          name: "",
          role: "",
          isAuthenticated: false
        },
        activeSidebarTab: "Dashboard",
        selectedProfileId: null
      });
    },

    selectProfile: (id) => set({ selectedProfileId: id }),

    setSidebarTab: (tab) => set({ activeSidebarTab: tab }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    setAiSearchQuery: (query) => set({ aiSearchQuery: query }),

    toggleTheme: () => {
      const current = get().theme;
      const next = current === "dark" ? "light" : "dark";
      set({ theme: next });
      updateDOMTheme(next);
    },

    setTheme: (theme) => {
      set({ theme });
      updateDOMTheme(theme);
    },

    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

    setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),

    toggleQuickActions: (open) => set((state) => ({ 
      quickActionsOpen: open !== undefined ? open : !state.quickActionsOpen 
    })),

    updateProfileStatus: async (profileId, status) => {
      try {
        const res = await fetch(`/api/customers/${profileId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, lastActivity: new Date().toISOString() })
        });

        if (res.ok) {
          const updatedProfile = await res.json();
          
          // Log Activity in DB
          const actRes = await fetch("/api/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              profileId,
              profileName: `${updatedProfile.firstName} ${updatedProfile.lastName}`,
              type: "status_change",
              message: `Status updated to ${status}`,
              details: `Modified by ${get().session.name || "Matchmaker"}`
            })
          });

          // Sync Store State
          set((state) => {
            const newProfiles = state.profiles.map((p) => p.id === profileId ? updatedProfile : p);
            return {
              profiles: newProfiles
            };
          });
          
          // Fetch activities fresh to ensure sync
          if (actRes.ok) {
            const newAct = await actRes.json();
            set((state) => ({ notifications: [newAct, ...state.notifications] }));
          }
        }
      } catch (error) {
        console.error("Error updating profile status:", error);
      }
    },

    addNote: async (profileId, content, isAi = false) => {
      try {
        const author = isAi ? "AI Matchmaker Assistant" : (get().session.name || "Matchmaker");
        const res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileId, author, content, isAiGenerated: isAi })
        });

        if (res.ok) {
          const newNote = await res.json();

          // Also patch profile lastActivity in DB
          await fetch(`/api/customers/${profileId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lastActivity: new Date().toISOString() })
          });

          // Log Activity in DB
          const profile = get().profiles.find((p) => p.id === profileId);
          const name = profile ? `${profile.firstName} ${profile.lastName}` : "Client";
          const actRes = await fetch("/api/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              profileId,
              profileName: name,
              type: "note_added",
              message: isAi ? "AI Meeting Summary generated" : "New matchmaking note added",
              details: content.substring(0, 80) + (content.length > 80 ? "..." : "")
            })
          });

          // Sync Store State locally
          set((state) => {
            const newProfiles = state.profiles.map((p) => {
              if (p.id === profileId) {
                return {
                  ...p,
                  notes: [newNote, ...p.notes],
                  lastActivity: new Date().toISOString()
                };
              }
              return p;
            });

            return { profiles: newProfiles };
          });

          if (actRes.ok) {
            const newAct = await actRes.json();
            set((state) => ({ notifications: [newAct, ...state.notifications] }));
          }
        }
      } catch (error) {
        console.error("Error adding consult note:", error);
      }
    },

    editNote: async (profileId, noteId, content) => {
      try {
        const res = await fetch(`/api/notes/${noteId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content })
        });

        if (res.ok) {
          set((state) => {
            const newProfiles = state.profiles.map((p) => {
              if (p.id === profileId) {
                return {
                  ...p,
                  notes: p.notes.map((n) => n.id === noteId ? { ...n, content, date: new Date().toISOString() } : n),
                  lastActivity: new Date().toISOString()
                };
              }
              return p;
            });
            return { profiles: newProfiles };
          });
        }
      } catch (error) {
        console.error("Error editing consult note:", error);
      }
    },

    deleteNote: async (profileId, noteId) => {
      try {
        const res = await fetch(`/api/notes/${noteId}`, {
          method: "DELETE"
        });

        if (res.ok) {
          set((state) => {
            const newProfiles = state.profiles.map((p) => {
              if (p.id === profileId) {
                return {
                  ...p,
                  notes: p.notes.filter((n) => n.id !== noteId),
                  lastActivity: new Date().toISOString()
                };
              }
              return p;
            });
            return { profiles: newProfiles };
          });
        }
      } catch (error) {
        console.error("Error deleting consult note:", error);
      }
    },

    saveMatch: async (profileId, matchId) => {
      try {
        const profile = get().profiles.find((p) => p.id === profileId);
        if (!profile) return;

        const alreadySaved = profile.savedMatches.includes(matchId);
        const newSavedMatches = alreadySaved
          ? profile.savedMatches
          : [...profile.savedMatches, matchId];

        const res = await fetch(`/api/customers/${profileId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            savedMatches: newSavedMatches,
            lastActivity: new Date().toISOString()
          })
        });

        if (res.ok) {
          const updatedProfile = await res.json();
          const match = get().profiles.find((p) => p.id === matchId);
          const matchName = match ? `${match.firstName} ${match.lastName}` : "Match";

          // Log Activity in DB
          const actRes = await fetch("/api/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              profileId,
              profileName: `${updatedProfile.firstName} ${updatedProfile.lastName}`,
              type: "match_saved",
              message: `Saved potential match: ${matchName}`,
              details: `Kept in pipeline for further review.`
            })
          });

          // Sync Store State
          set((state) => {
            const newProfiles = state.profiles.map((p) => p.id === profileId ? updatedProfile : p);
            return { profiles: newProfiles };
          });

          if (actRes.ok) {
            const newAct = await actRes.json();
            set((state) => ({ notifications: [newAct, ...state.notifications] }));
          }
        }
      } catch (error) {
        console.error("Error saving match:", error);
      }
    },

    sendMatchProposal: async (profileId, matchId) => {
      try {
        const profile = get().profiles.find((p) => p.id === profileId);
        if (!profile) return;

        const alreadySent = profile.sentMatches.includes(matchId);
        const newSentMatches = alreadySent
          ? profile.sentMatches
          : [...profile.sentMatches, matchId];

        const newStatus = profile.status === "Active Search" || profile.status === "Profile Verified"
          ? "Matched"
          : profile.status;

        const res = await fetch(`/api/customers/${profileId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sentMatches: newSentMatches,
            status: newStatus,
            lastActivity: new Date().toISOString()
          })
        });

        if (res.ok) {
          const updatedProfile = await res.json();
          const match = get().profiles.find((p) => p.id === matchId);
          const matchName = match ? `${match.firstName} ${match.lastName}` : "Match";

          // Log Activity in DB
          const actRes = await fetch("/api/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              profileId,
              profileName: `${updatedProfile.firstName} ${updatedProfile.lastName}`,
              type: "match_sent",
              message: `Match proposal sent to ${matchName}`,
              details: `Personalized email introduction dispatched.`
            })
          });

          // Sync Store State
          set((state) => {
            const newProfiles = state.profiles.map((p) => p.id === profileId ? updatedProfile : p);
            return { profiles: newProfiles };
          });

          if (actRes.ok) {
            const newAct = await actRes.json();
            set((state) => ({ notifications: [newAct, ...state.notifications] }));
          }
        }
      } catch (error) {
        console.error("Error sending match proposal:", error);
      }
    },

    addProfile: async (newProfileData) => {
      try {
        const tempId = `profile-${Date.now()}`;
        const res = await fetch("/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newProfileData,
            id: tempId,
            notes: [],
            savedMatches: [],
            sentMatches: [],
            lastActivity: new Date().toISOString()
          })
        });

        if (res.ok) {
          const createdProfile = await res.json();

          // Log Activity in DB
          const actRes = await fetch("/api/activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              profileId: createdProfile.id,
              profileName: `${createdProfile.firstName} ${createdProfile.lastName}`,
              type: "lead_created",
              message: `New Customer Profile Created`,
              details: `Manually added to CRM. Assigned to ${createdProfile.assignedMatchmaker}`
            })
          });

          // Sync Store State
          set((state) => ({
            profiles: [...state.profiles, createdProfile]
          }));

          if (actRes.ok) {
            const newAct = await actRes.json();
            set((state) => ({ notifications: [newAct, ...state.notifications] }));
          }
        }
      } catch (error) {
        console.error("Error creating customer profile:", error);
      }
    }
  };
});
