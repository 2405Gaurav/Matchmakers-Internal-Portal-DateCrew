import type { GeminiKeySource } from "@/utils/geminiConfig";

const PERSONAL_KEY_STORAGE_KEY = "tdc-gemini-personal-key";
const KEY_SOURCE_STORAGE_KEY = "tdc-gemini-key-source";
const BACKEND_FALLBACK_STORAGE_KEY = "tdc-gemini-backend-fallback";

export type StoredGeminiPreferences = {
  allowBackendFallback: boolean;
  keySource: GeminiKeySource;
  personalApiKey: string;
};

export function getStoredGeminiPreferences(): StoredGeminiPreferences {
  if (typeof window === "undefined") {
    return {
      allowBackendFallback: true,
      keySource: "backend",
      personalApiKey: ""
    };
  }

  const storedKeySource = window.localStorage.getItem(KEY_SOURCE_STORAGE_KEY);
  const storedFallback = window.localStorage.getItem(BACKEND_FALLBACK_STORAGE_KEY);

  return {
    allowBackendFallback: storedFallback !== "false",
    keySource: storedKeySource === "personal" ? "personal" : "backend",
    personalApiKey: window.localStorage.getItem(PERSONAL_KEY_STORAGE_KEY) || ""
  };
}

export function saveGeminiPreferences(preferences: StoredGeminiPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PERSONAL_KEY_STORAGE_KEY, preferences.personalApiKey);
  window.localStorage.setItem(KEY_SOURCE_STORAGE_KEY, preferences.keySource);
  window.localStorage.setItem(BACKEND_FALLBACK_STORAGE_KEY, String(preferences.allowBackendFallback));
}

export function buildGeminiRequestHeaders() {
  const preferences = getStoredGeminiPreferences();

  return {
    "x-gemini-api-key": preferences.personalApiKey,
    "x-gemini-backend-fallback": String(preferences.allowBackendFallback),
    "x-gemini-key-source": preferences.keySource
  };
}
