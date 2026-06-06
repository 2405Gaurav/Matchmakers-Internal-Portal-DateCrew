/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

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
    return NextResponse.json({
      apiKey: env.GROQ_API_KEY || "",
      aiModel: env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: parseFloat(env.GROQ_TEMPERATURE || "0.7"),
      profileName: env.PORTAL_NAME || "Meera Sharma",
      profileRole: env.PORTAL_ROLE || "Senior Matchmaking Director",
      portalPassword: env.PORTAL_PASSWORD || "admin123",
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

    if (body.apiKey !== undefined) updates.GROQ_API_KEY = body.apiKey;
    if (body.aiModel !== undefined) updates.GROQ_MODEL = body.aiModel;
    if (body.temperature !== undefined) updates.GROQ_TEMPERATURE = String(body.temperature);
    if (body.profileName !== undefined) updates.PORTAL_NAME = body.profileName;
    if (body.profileRole !== undefined) updates.PORTAL_ROLE = body.profileRole;
    if (body.portalPassword !== undefined) updates.PORTAL_PASSWORD = body.portalPassword;
    if (body.emailAlerts !== undefined) updates.NOTIFICATION_EMAIL_ALERTS = String(body.emailAlerts);
    if (body.pushNotes !== undefined) updates.NOTIFICATION_PUSH_NOTES = String(body.pushNotes);
    if (body.weeklyDigest !== undefined) updates.NOTIFICATION_WEEKLY_DIGESTS = String(body.weeklyDigest);

    updateEnvFile(updates);

    return NextResponse.json({ success: true, message: "Settings updated in .env successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save settings" }, { status: 500 });
  }
}
