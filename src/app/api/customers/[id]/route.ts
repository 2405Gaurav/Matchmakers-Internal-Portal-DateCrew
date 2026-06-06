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

    // Prepare update data and keep JSON fields as real JSON values for Prisma.
    const updateData: any = {};
    
    const fields = [
      "firstName", "lastName", "gender", "dob", "age", "height", 
      "religion", "caste", "maritalStatus", "email", "phone", 
      "country", "city", "status", "assignedMatchmaker", "lastActivity", 
      "imageUrl", "languages", "education", "career", "preferences", 
      "familyInfo", "savedMatches", "sentMatches"
    ];

    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Ensure numeric values are numbers
    if (updateData.age !== undefined) updateData.age = Number(updateData.age);
    if (updateData.height !== undefined) updateData.height = Number(updateData.height);

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
