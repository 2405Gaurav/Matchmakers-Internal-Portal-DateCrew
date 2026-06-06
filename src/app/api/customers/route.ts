/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma, parseProfile } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    console.error("GET /api/customers error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const profiles = await prisma.customerProfile.findMany({
      include: {
        notes: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const parsedProfiles = profiles.map(parseProfile);
    return NextResponse.json(parsedProfiles);
  } catch (error: any) {
    console.error("GET /api/customers error:", error);
    return NextResponse.json({ error: "Failed to fetch customer profiles" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) {
    console.error("POST /api/customers error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const body = await req.json();
    const {
      id,
      firstName,
      lastName,
      gender,
      dob,
      age,
      height,
      languages,
      religion,
      caste,
      maritalStatus,
      email,
      phone,
      country,
      city,
      education,
      career,
      preferences,
      familyInfo,
      status,
      assignedMatchmaker,
      lastActivity,
      savedMatches,
      sentMatches,
      imageUrl
    } = body;

    const newProfile = await prisma.customerProfile.create({
      data: {
        id: id || `profile-${Date.now()}`,
        firstName,
        lastName,
        gender,
        dob,
        age: Number(age),
        height: Number(height),
        languages: JSON.stringify(languages || []),
        religion,
        caste,
        maritalStatus,
        email,
        phone,
        country,
        city,
        education: JSON.stringify(education),
        career: JSON.stringify(career),
        preferences: JSON.stringify(preferences),
        familyInfo: JSON.stringify(familyInfo),
        status: status || "New Lead",
        assignedMatchmaker: assignedMatchmaker || "Meera Sharma",
        lastActivity: lastActivity || new Date().toISOString(),
        savedMatches: JSON.stringify(savedMatches || []),
        sentMatches: JSON.stringify(sentMatches || []),
        imageUrl: imageUrl || null
      }
    });

    return NextResponse.json(parseProfile(newProfile));
  } catch (error: any) {
    console.error("POST /api/customers error:", error);
    return NextResponse.json({ error: "Failed to create customer profile" }, { status: 500 });
  }
}
