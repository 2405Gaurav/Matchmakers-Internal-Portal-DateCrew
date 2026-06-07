/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // if no db url we will hav a errror 
  if (!process.env.DATABASE_URL) {
    console.error("POST /api/notes error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    // gittig body from d reqest 
    const body = await req.json();
    const { profileId, author, content, isAiGenerated } = body;

    if (!profileId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // creatin a noot in db so we remimber it ltr
    const note = await prisma.matchNote.create({
      data: {
        id: `note-${Date.now()}`,
        profileId,
        date: new Date().toISOString(),
        author: author || "Matchmaker",
        content,
        isAiGenerated: !!isAiGenerated
      }
    });

    return NextResponse.json(note);
  } catch (error: any) {
    // ops somthin went worng wen savin note
    console.error("POST /api/notes error:", error);
    return NextResponse.json({ error: "Failed to create consulting note" }, { status: 500 });
  }
}
