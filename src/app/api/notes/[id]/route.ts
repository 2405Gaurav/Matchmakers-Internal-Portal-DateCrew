/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!process.env.DATABASE_URL) {
    // chacking if the databse url is there orelse we carsh
    console.error("PATCH /api/notes/[id] error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const { id } = await params;
    // gittig the id from paramaterrs
    const body = await req.json();
    const { content } = body;

    const note = await prisma.matchNote.update({
      where: { id },
      data: { content }
    });
    // save the nue contnt to the daytabse

    return NextResponse.json(note);
  } catch (error: any) {
    console.error("PATCH /api/notes/[id] error:", error);
    return NextResponse.json({ error: "Failed to update consulting note" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!process.env.DATABASE_URL) {
    console.error("DELETE /api/notes/[id] error: DATABASE_URL is not set");
    return NextResponse.json({ error: "Database connection string is missing." }, { status: 500 });
  }

  try {
    const { id } = await params;
    // we need to dlete it so we get id furst

    await prisma.matchNote.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/notes/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete consulting note" }, { status: 500 });
  }
}
