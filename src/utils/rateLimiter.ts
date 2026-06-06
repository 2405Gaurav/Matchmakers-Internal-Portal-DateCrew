/**
 * A simple memory-based rate limiter to keep things safe and prevent brute-force attempts.
 * This is a humanoid way of saying: "Don't spam our login, please!"
 */

interface RateLimitInfo {
  count: number;
  lastReset: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();

// Set limits: 5 attempts per 1 minute per IP/Identifier
const LIMIT = 5;
const WINDOW_MS = 60 * 1000; // 1 minute

/**
 * Checks if the identifier (like an email or IP) has exceeded the rate limit.
 * @param identifier The unique key to track (e.g., user email)
 * @returns { isLimited: boolean, remaining: number }
 */
export function checkRateLimit(identifier: string) {
  const now = Date.now();
  const info = rateLimitMap.get(identifier);

  // If no info exists or the window has passed, reset the count
  if (!info || (now - info.lastReset) > WINDOW_MS) {
    const newInfo = { count: 1, lastReset: now };
    rateLimitMap.set(identifier, newInfo);
    return { isLimited: false, remaining: LIMIT - 1 };
  }

  // Increment the count
  info.count += 1;

  // Check if limit exceeded
  if (info.count > LIMIT) {
    return { isLimited: true, remaining: 0 };
  }

  return { isLimited: false, remaining: LIMIT - info.count };
}

/**
 * Resets the rate limit for a specific identifier (e.g., after a successful login).
 * @param identifier The unique key to reset
 */
export function resetRateLimit(identifier: string) {
  rateLimitMap.delete(identifier);
}
