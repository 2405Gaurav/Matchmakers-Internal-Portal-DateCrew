import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/unused-fallback";

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function parseProfile(p: any) {
  return {
    ...p,
    languages: JSON.parse(p.languages),
    education: JSON.parse(p.education),
    career: JSON.parse(p.career),
    preferences: JSON.parse(p.preferences),
    familyInfo: JSON.parse(p.familyInfo),
    savedMatches: JSON.parse(p.savedMatches),
    sentMatches: JSON.parse(p.sentMatches),
    notes: p.notes ? p.notes.map((n: any) => ({
      ...n,
      isAiGenerated: !!n.isAiGenerated
    })) : []
  };
}
