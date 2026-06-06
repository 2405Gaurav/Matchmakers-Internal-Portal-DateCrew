import { PrismaClient } from "../../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function parseJsonField<T>(value: any): T {
  if (value === null || value === undefined) return [] as unknown as T;
  if (typeof value === "string") {
    try { return JSON.parse(value) as T; } catch { return value as unknown as T; }
  }
  return value as T;
}

export function parseProfile(profile: any) {
  if (!profile) return null;
  return {
    ...profile,
    languages:    parseJsonField(profile.languages),
    education:    parseJsonField(profile.education),
    career:       parseJsonField(profile.career),
    preferences:  parseJsonField(profile.preferences),
    familyInfo:   parseJsonField(profile.familyInfo),
    savedMatches: parseJsonField(profile.savedMatches),
    sentMatches:  parseJsonField(profile.sentMatches),
    notes: profile.notes
      ? profile.notes.map((note: any) => ({ ...note, isAiGenerated: Boolean(note.isAiGenerated) }))
      : [],
  };
}