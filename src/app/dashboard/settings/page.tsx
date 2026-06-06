"use client";

import React, { useState, useEffect } from "react";
import { useCRMStore } from "@/store/crmStore";
import { DEFAULT_GEMINI_MODEL } from "@/utils/geminiConfig";
import { getStoredGeminiPreferences, saveGeminiPreferences } from "@/utils/geminiClient";
import {
  Settings,
  User,
  Bell,
  Cpu,
  ShieldAlert,
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  KeyRound
} from "lucide-react";

export default function SettingsPage() {
  const { session, login } = useCRMStore();

  // Form states
  const [profileName, setProfileName] = useState(session.name || "Gaurav Thakur");
  const [profileRole, setProfileRole] = useState(session.role || "Fullstack Developer");
  
  // AI Config states
  const [aiModel, setAiModel] = useState(DEFAULT_GEMINI_MODEL);
  const [personalApiKey, setPersonalApiKey] = useState("");
  const [showPersonalApiKey, setShowPersonalApiKey] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [keySource, setKeySource] = useState<"backend" | "personal">("backend");
  const [allowBackendFallback, setAllowBackendFallback] = useState(true);
  const [backendApiKeyConfigured, setBackendApiKeyConfigured] = useState(false);
  const [backendApiKeyVariable, setBackendApiKeyVariable] = useState("GEMINI_API_KEY");

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
        if (data.temperature !== undefined) setTemperature(data.temperature);
        if (data.backendApiKeyConfigured !== undefined) setBackendApiKeyConfigured(data.backendApiKeyConfigured);
        if (data.backendApiKeyVariable) setBackendApiKeyVariable(data.backendApiKeyVariable);
        if (data.emailAlerts !== undefined) setEmailAlerts(data.emailAlerts);
        if (data.pushNotes !== undefined) setPushNotes(data.pushNotes);
        if (data.weeklyDigest !== undefined) setWeeklyDigest(data.weeklyDigest);
      })
      .catch((err) => console.error("Error loading settings:", err));

    const storedPreferences = getStoredGeminiPreferences();
    setPersonalApiKey(storedPreferences.personalApiKey);
    setKeySource(storedPreferences.keySource);
    setAllowBackendFallback(storedPreferences.allowBackendFallback);
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
          temperature
        })
      });
      if (res.ok) {
        saveGeminiPreferences({
          allowBackendFallback,
          keySource,
          personalApiKey
        });
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
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.email || "gaurav123@tdc.com",
          currentPassword,
          portalPassword: newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showToast("Security credentials updated successfully.");
      } else {
        showToast(data.error || "Failed to update security credentials.");
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
          Adjust portal preferences, configure Gemini AI behavior, and manage access plus security settings.
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
                  value={session.email || "gaurav123@tdc.com"}
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
              <div className="rounded-xl border border-border bg-input/10 p-3 space-y-2">
                <div className="flex items-center gap-2 text-foreground/85">
                  <KeyRound className="w-4 h-4 text-brand-500" />
                  <span>Backend Gemini key status: {backendApiKeyConfigured ? "Configured" : "Not configured"}</span>
                </div>
                <p className="text-[11px] font-medium text-foreground/60">
                  The shared backend key is detected from <span className="font-bold">{backendApiKeyVariable}</span>. Personal keys are stored only in this browser.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-foreground/80">Gemini Model</label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs"
                  >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash (Recommended)</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                    <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash-Lite</option>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setKeySource("backend")}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    keySource === "backend"
                      ? "border-brand-500 bg-brand-500/10 text-foreground"
                      : "border-border bg-input/10 text-foreground/70"
                  }`}
                >
                  <div className="font-bold">Use backend Gemini key</div>
                  <p className="mt-1 text-[11px] font-medium">
                    Best for shared testing and evaluator flows without exposing your team key in the UI.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setKeySource("personal")}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    keySource === "personal"
                      ? "border-brand-500 bg-brand-500/10 text-foreground"
                      : "border-border bg-input/10 text-foreground/70"
                  }`}
                >
                  <div className="font-bold">Use my personal Gemini key</div>
                  <p className="mt-1 text-[11px] font-medium">
                    Good for evaluator-specific usage limits while keeping the backend key as optional fallback.
                  </p>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-foreground/80">Personal Gemini API Key</label>
                <div className="relative">
                  <input
                    type={showPersonalApiKey ? "text" : "password"}
                    value={personalApiKey}
                    onChange={(e) => setPersonalApiKey(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border bg-input/20 focus:outline-none focus:border-brand-500 text-xs font-medium pr-10"
                    placeholder="AIza..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowPersonalApiKey(!showPersonalApiKey)}
                    className="absolute right-3 top-3 text-foreground/50 hover:text-foreground"
                  >
                    {showPersonalApiKey ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
                <p className="text-[11px] font-medium text-foreground/55">
                  This key stays in your browser only and is sent to the backend per request when personal mode is enabled.
                </p>
              </div>

              <label className="flex items-center justify-between gap-3 rounded-xl border border-border bg-input/10 p-3 cursor-pointer select-none">
                <div>
                  <div className="text-foreground/85">Allow backend fallback</div>
                  <p className="text-[11px] font-medium text-foreground/55">
                    If your personal key is missing or fails, AI summaries and insights can fall back to the shared backend Gemini key.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={allowBackendFallback}
                  onChange={(e) => setAllowBackendFallback(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-brand-500 focus:ring-brand-500"
                />
              </label>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-glow"
              >
                <Save className="w-3.5 h-3.5" /> Save Gemini Settings
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
