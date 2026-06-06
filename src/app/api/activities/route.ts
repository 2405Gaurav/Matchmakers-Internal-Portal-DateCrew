/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    console.error("GET /api/activities error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const activities = await prisma.activityUpdate.findMany({
      orderBy: {
        timestamp: "desc"
      },
      take: 50 // Limit to latest 50 logs for performance
    });

    return NextResponse.json(activities);
  } catch (error: any) {
    console.error("GET /api/activities error:", error);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) {
    console.error("POST /api/activities error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { profileId, profileName, type, message, details } = body;

    if (!profileId || !profileName || !type || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const activity = await prisma.activityUpdate.create({
      data: {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        profileId,
        profileName,
        type,
        message,
        details: details || null
      }
    });

    return NextResponse.json(activity);
  } catch (error: any) {
    console.error("POST /api/activities error:", error);
    return NextResponse.json({ error: "Failed to create activity log" }, { status: 500 });
  }
}

