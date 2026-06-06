/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma, parseProfile } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!process.env.DATABASE_URL) {
    console.error("GET /api/customers/[id] error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const { id } = await params;
    const profile = await prisma.customerProfile.findUnique({
      where: { id },
      include: { notes: true }
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(parseProfile(profile));
  } catch (error: any) {
    console.error("GET /api/customers/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!process.env.DATABASE_URL) {
    console.error("PATCH /api/customers/[id] error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    // Prepare update data by serializing nested structures if present
    const updateData: any = {};
    
    const fields = [
      "firstName", "lastName", "gender", "dob", "age", "height", 
      "religion", "caste", "maritalStatus", "email", "phone", 
      "country", "city", "status", "assignedMatchmaker", "lastActivity", 
      "imageUrl"
    ];

    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Number conversions
    if (body.age !== undefined) updateData.age = Number(body.age);
    if (body.height !== undefined) updateData.height = Number(body.height);

    // Serialization of nested objects/arrays
    if (body.languages !== undefined) updateData.languages = JSON.stringify(body.languages);
    if (body.education !== undefined) updateData.education = JSON.stringify(body.education);
    if (body.career !== undefined) updateData.career = JSON.stringify(body.career);
    if (body.preferences !== undefined) updateData.preferences = JSON.stringify(body.preferences);
    if (body.familyInfo !== undefined) updateData.familyInfo = JSON.stringify(body.familyInfo);
    if (body.savedMatches !== undefined) updateData.savedMatches = JSON.stringify(body.savedMatches);
    if (body.sentMatches !== undefined) updateData.sentMatches = JSON.stringify(body.sentMatches);

    const updatedProfile = await prisma.customerProfile.update({
      where: { id },
      data: updateData,
      include: { notes: true }
    });

    return NextResponse.json(parseProfile(updatedProfile));
  } catch (error: any) {
    console.error("PATCH /api/customers/[id] error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!process.env.DATABASE_URL) {
    console.error("DELETE /api/customers/[id] error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const { id } = await params;
    
    await prisma.customerProfile.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/customers/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}
