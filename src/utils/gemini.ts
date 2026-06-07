import { GoogleGenAI } from "@google/genai";
import { DEFAULT_GEMINI_MODEL, type GeminiKeySource } from "@/utils/geminiConfig";

export { DEFAULT_GEMINI_MODEL, type GeminiKeySource } from "@/utils/geminiConfig";

type EnvLike = Record<string, string | undefined>;

export type GeminiRuntimeConfig = {
  allowBackendFallback: boolean;
  backendApiKey: string;
  keySource: GeminiKeySource;
  model: string;
  personalApiKey: string;
  temperature: number;
};

export function getBackendGeminiApiKey(env: EnvLike = process.env) {
  return (env.GEMINI_API_KEY || env.GEMINI_API || "").trim();
}

export function getGeminiModel(env: EnvLike = process.env) {
  return env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
}

export function getGeminiTemperature(defaultValue = 0.7, env: EnvLike = process.env) {
  const rawValue = env.GEMINI_TEMPERATURE;
  const parsed = rawValue ? Number.parseFloat(rawValue) : defaultValue;

  return Number.isFinite(parsed) ? parsed : defaultValue;
}

export function resolveGeminiRuntimeConfig(
  req: Request,
  defaultTemperature = 0.7,
  env: EnvLike = process.env
): GeminiRuntimeConfig {
  const requestedKeySource = req.headers.get("x-gemini-key-source");
  const keySource: GeminiKeySource = requestedKeySource === "personal" ? "personal" : "backend";

  return {
    allowBackendFallback: req.headers.get("x-gemini-backend-fallback") !== "false",
    backendApiKey: getBackendGeminiApiKey(env),
    keySource,
    model: getGeminiModel(env),
    personalApiKey: (req.headers.get("x-gemini-api-key") || "").trim(),
    temperature: getGeminiTemperature(defaultTemperature, env)
  };
}

export function hasGeminiApiKey(config: GeminiRuntimeConfig) {
  return Boolean(config.personalApiKey || config.backendApiKey);
}

type GeminiExecutionResult<T> = {
  data: T;
  warning?: string;
};

export async function runGeminiRequest<T>(
  config: GeminiRuntimeConfig,
  execute: (client: GoogleGenAI) => Promise<T>
): Promise<GeminiExecutionResult<T>> {
  const runWithKey = async (apiKey: string) => execute(new GoogleGenAI({ apiKey }));

  const primaryApiKey = config.keySource === "personal" ? config.personalApiKey : config.backendApiKey;
  const canFallbackToBackend =
    config.keySource === "personal" &&
    config.allowBackendFallback &&
    Boolean(config.backendApiKey)

  if (primaryApiKey) {
    try {
      return { data: await runWithKey(primaryApiKey) };
    } catch (error) {
      if (!canFallbackToBackend) {
        throw error;
      }
    }
  }

  if (canFallbackToBackend) {
    return {
      data: await runWithKey(config.backendApiKey),
      warning: "Personal Gemini key was unavailable or failed, so the backend Gemini key was used as fallback."
    };
  }

  throw new Error("No Gemini API key is configured.");
}
