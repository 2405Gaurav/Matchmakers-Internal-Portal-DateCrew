"use client";

import React, { useState, useEffect } from "react";
import { useCRMStore } from "@/store/crmStore";
import {
  Settings,
  User,
  Bell,
  Cpu,
  ShieldAlert,
  Save,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

export default function SettingsPage() {
  const { session, login } = useCRMStore();

  // Form states
  const [profileName, setProfileName] = useState(session.name || "Meera Sharma");
  const [profileRole, setProfileRole] = useState(session.role || "Senior Matchmaking Director");
  
  // AI Config states
  const [aiModel, setAiModel] = useState("llama-3.3-70b-versatile");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [temperature, setTemperature] = useState(0.7);

  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotes, setPushNotes] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Security password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch settings on load
  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.profileName) setProfileName(data.profileName);
        if (data.profileRole) setProfileRole(data.profileRole);
        if (data.aiModel) setAiModel(data.aiModel);
        if (data.apiKey) setApiKey(data.apiKey);
        if (data.temperature !== undefined) setTemperature(data.temperature);
        if (data.emailAlerts !== undefined) setEmailAlerts(data.emailAlerts);
        if (data.pushNotes !== undefined) setPushNotes(data.pushNotes);
        if (data.weeklyDigest !== undefined) setWeeklyDigest(data.weeklyDigest);
      })
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileName,
          profileRole
        })
      });
      if (res.ok) {
        login(session.email, profileName, profileRole);
        showToast("Profile configuration saved successfully.");
      } else {
        showToast("Failed to save profile configurations.");
      }
    } catch {
      showToast("Error saving profile configurations.");
    }
  };

  const handleAiSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aiModel,
          apiKey,
          temperature
        })
      });
      if (res.ok) {
        showToast("AI configuration settings updated successfully.");
      } else {
        showToast("Failed to update AI settings.");
      }
    } catch {
      showToast("Error saving AI settings.");
    }
  };

  const handleCheckboxChange = async (field: string, val: boolean) => {
    if (field === "emailAlerts") setEmailAlerts(val);
    if (field === "pushNotes") setPushNotes(val);
    if (field === "weeklyDigest") setWeeklyDigest(val);

    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [field]: val
        })
      });
      showToast("Notification preferences updated.");
    } catch (err) {
      console.error("Error updating notification preference:", err);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.");
      return;
    }

    try {
      // Validate current password
      const getRes = await fetch("/api/settings");
      const currentSettings = await getRes.json();
      const actualPassword = currentSettings.portalPassword || "admin123";

      if (currentPassword !== actualPassword) {
        showToast("Current password is incorrect.");
        return;
      }

      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portalPassword: newPassword
        })
      });

      if (res.ok) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showToast("Security credentials updated successfully.");
      } else {
        showToast("Failed to update security credentials.");
      }
    } catch {
      showToast("Error updating security credentials.");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 text-left relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 p-4 rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-400 font-semibold text-xs shadow-glow-lg animate-fade-in-up">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Settings className="w-5.5 h-5.5 text-brand-500" /> CRM Settings & Configurations
        </h1>
        <p className="text-xs text-foreground/60 mt-1">
          Adjust portal preferences, customize AI scoring parameters, toggle UI themes, and manage user security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile & AI settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile settings */}
          <div className="p-5 rounded-2xl glass-panel space-y-4 border border-border">
            <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-500" /> Profile Configurations
            </h3>

            <form onSubmit={handleProfileSave} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-foreground/80">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-foreground/80">Assigned Role</label>
                  <input
                    type="text"
                    required
                    value={profileRole}
                    onChange={(e) => setProfileRole(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-foreground/80">Active Email</label>
                <input
                  type="email"
                  disabled
                  value={session.email || "admin@thedatecrew.com"}
                  className="w-full p-2 rounded-lg border border-border bg-input/10 text-foreground/40 cursor-not-allowed text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-glow"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </form>
          </div>

          {/* AI configurations */}
          <div className="p-5 rounded-2xl glass-panel space-y-4 border border-border">
            <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-brand-500" /> AI Scoring & Integration Settings
            </h3>

            <form onSubmit={handleAiSave} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-foreground/80">Groq Model Selector</label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                  >
                    <option value="llama-3.3-70b-versatile">Llama 3.3 70B Versatile (Recommended)</option>
                    <option value="llama-3.1-8b-instant">Llama 3.1 8B Instant (Fast)</option>
                    <option value="qwen/qwen3-32b">Qwen 3 32B</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-foreground/80">Creativity (Temperature: {temperature})</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-lg bg-input accent-brand-500 cursor-pointer mt-3"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-foreground/80">Groq API Key (Ready for connection)</label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-medium pr-10"
                    placeholder="gsk-..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-3 text-foreground/50 hover:text-foreground"
                  >
                    {showApiKey ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-glow"
              >
                <Save className="w-3.5 h-3.5" /> Save AI Keys
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Notifications & Security Change Password */}
        <div className="space-y-6">
          {/* Notifications feed preferences */}
          <div className="p-5 rounded-2xl glass-panel space-y-4 border border-border text-left">
            <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-brand-500" /> Notifications Feed Preferences
            </h3>

            <div className="space-y-3 text-xs font-semibold">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <span>Email alerts on match success</span>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => handleCheckboxChange("emailAlerts", e.target.checked)}
                  className="w-4 h-4 rounded border-border text-brand-500 focus:ring-brand-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer select-none pt-2 border-t border-border/40">
                <span>Push notifications on timeline notes</span>
                <input
                  type="checkbox"
                  checked={pushNotes}
                  onChange={(e) => handleCheckboxChange("pushNotes", e.target.checked)}
                  className="w-4 h-4 rounded border-border text-brand-500 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer select-none pt-2 border-t border-border/40">
                <span>Weekly summary reporting digests</span>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => handleCheckboxChange("weeklyDigest", e.target.checked)}
                  className="w-4 h-4 rounded border-border text-brand-500 focus:ring-brand-500"
                />
              </label>
            </div>
          </div>

          {/* Change password */}
          <div className="p-5 rounded-2xl glass-panel space-y-4 border border-border text-left">
            <h3 className="text-xs font-bold tracking-wider text-foreground/45 uppercase border-b border-border pb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-brand-500" /> Security Configurations
            </h3>

            <form onSubmit={handleSecuritySubmit} className="space-y-3 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-foreground/80">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-foreground/80">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-foreground/80">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-input border border-border hover:bg-input/80 text-foreground font-semibold text-xs transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
