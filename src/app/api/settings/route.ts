/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { DEFAULT_GEMINI_MODEL, getBackendGeminiApiKey, getGeminiModel, getGeminiTemperature } from "@/utils/gemini";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const DEFAULT_MATCHMAKER_EMAIL = "gaurav123@tdc.com";

// Helper to read and parse the .env file
function getEnvVariables() {
  const envPath = path.resolve(process.cwd(), ".env");
  const vars: Record<string, string> = {};
  
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    const lines = content.split(/\r?\n/);
    
    lines.forEach(line => {
      const match = line.match(/^\s*([\w.\-_]+)\s*=\s*["']?(.*?)["']?\s*$/);
      if (match) {
        vars[match[1]] = match[2];
      }
    });
  }
  
  return vars;
}

// Helper to update the .env file
function updateEnvFile(updates: Record<string, string>) {
  const envPath = path.resolve(process.cwd(), ".env");
  let content = "";
  
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, "utf-8");
  }
  
  const lines = content.split(/\r?\n/);
  const updatedKeys = new Set<string>();

  const newLines = lines.map(line => {
    const match = line.match(/^\s*([\w.\-_]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      if (updates[key] !== undefined) {
        updatedKeys.add(key);
        return `${key}="${updates[key]}"`;
      }
    }
    return line;
  });

  // Append keys that weren't in the original file
  Object.entries(updates).forEach(([key, val]) => {
    if (!updatedKeys.has(key)) {
      newLines.push(`${key}="${val}"`);
    }
  });

  // Filter out empty lines at the end if any
  fs.writeFileSync(envPath, newLines.join("\n"), "utf-8");
}

export async function GET() {
  try {
    const env = getEnvVariables();
    const matchmaker = await prisma.matchmakerAccount.findUnique({
      where: { email: DEFAULT_MATCHMAKER_EMAIL },
    });

    return NextResponse.json({
      backendApiKeyConfigured: Boolean(getBackendGeminiApiKey(env)),
      backendApiKeyVariable: env.GEMINI_API_KEY ? "GEMINI_API_KEY" : env.GEMINI_API ? "GEMINI_API" : "GEMINI_API_KEY",
      aiModel: getGeminiModel(env),
      temperature: getGeminiTemperature(0.7, env),
      profileName: matchmaker?.name || "Gaurav Thakur",
      profileRole: matchmaker?.role || "Fullstack Developer",
      profileEmail: matchmaker?.email || DEFAULT_MATCHMAKER_EMAIL,
      emailAlerts: env.NOTIFICATION_EMAIL_ALERTS !== "false",
      pushNotes: env.NOTIFICATION_PUSH_NOTES !== "false",
      weeklyDigest: env.NOTIFICATION_WEEKLY_DIGESTS === "true"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updates: Record<string, string> = {};
    const targetEmail = body.email || DEFAULT_MATCHMAKER_EMAIL;

    if (body.backendApiKey !== undefined) updates.GEMINI_API_KEY = body.backendApiKey;
    if (body.apiKey !== undefined) updates.GEMINI_API_KEY = body.apiKey;
    if (body.aiModel !== undefined) updates.GEMINI_MODEL = body.aiModel || DEFAULT_GEMINI_MODEL;
    if (body.temperature !== undefined) updates.GEMINI_TEMPERATURE = String(body.temperature);
    if (body.emailAlerts !== undefined) updates.NOTIFICATION_EMAIL_ALERTS = String(body.emailAlerts);
    if (body.pushNotes !== undefined) updates.NOTIFICATION_PUSH_NOTES = String(body.pushNotes);
    if (body.weeklyDigest !== undefined) updates.NOTIFICATION_WEEKLY_DIGESTS = String(body.weeklyDigest);

    if (Object.keys(updates).length > 0) {
      updateEnvFile(updates);
    }

    if (body.profileName !== undefined || body.profileRole !== undefined) {
      await prisma.matchmakerAccount.update({
        where: { email: targetEmail },
        data: {
          ...(body.profileName !== undefined ? { name: body.profileName } : {}),
          ...(body.profileRole !== undefined ? { role: body.profileRole } : {}),
        },
      });
    }

    if (body.portalPassword !== undefined) {
      const currentPassword = String(body.currentPassword || "");
      const nextPassword = String(body.portalPassword || "");

      if (!currentPassword || !nextPassword) {
        return NextResponse.json({ error: "Current and new passwords are required." }, { status: 400 });
      }

      const account = await prisma.matchmakerAccount.findUnique({
        where: { email: targetEmail },
      });

      if (!account) {
        return NextResponse.json({ error: "Matchmaker account not found." }, { status: 404 });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, account.password);

      if (!isCurrentPasswordValid) {
        return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
      }

      const passwordHash = await bcrypt.hash(nextPassword, 10);

      await prisma.matchmakerAccount.update({
        where: { email: targetEmail },
        data: { password: passwordHash },
      });
    }

    return NextResponse.json({ success: true, message: "Settings updated successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save settings" }, { status: 500 });
  }
}
