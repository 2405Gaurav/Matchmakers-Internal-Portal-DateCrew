import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { checkRateLimit, resetRateLimit } from "@/utils/rateLimiter";
import { prisma } from "@/lib/db";

/**
 * Server-side authentication handler with database verification and rate limiting.
 * Now verifies Gaurav Thakur's profile directly from the NeonDB/PostgreSQL.
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Check rate limit for this email to prevent spam
    const { isLimited, remaining } = checkRateLimit(email);
    if (isLimited) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again in a minute." },
        { status: 429 }
      );
    }

    // 2. Fetch the matchmaker account from our database (NeonDB)
    const userAccount = await prisma.matchmakerAccount.findUnique({
      where: { email }
    });

    // 3. Validate credentials against the stored bcrypt hash
    if (userAccount && await bcrypt.compare(password, userAccount.password)) {
      // Success! Reset rate limit and return the profile info
      resetRateLimit(email);
      return NextResponse.json({
        success: true,
        user: { 
          email: userAccount.email, 
          name: userAccount.name, 
          role: userAccount.role 
        }
      });
    }

    // 4. Failed attempt - let them know how many tries are left
    return NextResponse.json(
      { error: `Invalid credentials. ${remaining} attempts left.` },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed on the server" }, { status: 500 });
  }
}
