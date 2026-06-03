import { NextResponse } from "next/server";

/**
 * Email subscribe → MailerLite. Hardened against abuse:
 *  - honeypot field ("company") — bots fill hidden fields; we accept silently
 *  - best-effort per-IP rate limit (in-memory; catches bursts on a warm instance)
 *  - strict email validation; the API key stays server-side
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email;
  const company = body?.company; // honeypot

  // Bots tend to fill every field, including the hidden honeypot. If it's set,
  // pretend it worked and do nothing — don't tip them off, don't hit MailerLite.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    "unknown"
  ).trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  if (
    !email ||
    typeof email !== "string" ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupId) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    if (res.status === 422) {
      return NextResponse.json({ error: "That email address isn't valid. Please check and try again." }, { status: 422 });
    }
    if (process.env.NODE_ENV === "development") console.error("MailerLite error:", res.status, data);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
