import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma Client instances in development (Next.js hot reload)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseProfile(p: any) {
  return {
    ...p,
    languages: typeof p.languages === "string" ? JSON.parse(p.languages) : p.languages,
    education: typeof p.education === "string" ? JSON.parse(p.education) : p.education,
    career: typeof p.career === "string" ? JSON.parse(p.career) : p.career,
    preferences: typeof p.preferences === "string" ? JSON.parse(p.preferences) : p.preferences,
    familyInfo: typeof p.familyInfo === "string" ? JSON.parse(p.familyInfo) : p.familyInfo,
    savedMatches: typeof p.savedMatches === "string" ? JSON.parse(p.savedMatches) : p.savedMatches,
    sentMatches: typeof p.sentMatches === "string" ? JSON.parse(p.sentMatches) : p.sentMatches,
    notes: p.notes
      ? p.notes.map((n: any) => ({ ...n, isAiGenerated: !!n.isAiGenerated }))
      : [],
  };
}
