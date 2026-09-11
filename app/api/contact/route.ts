import { NextResponse } from "next/server";

// Simple in-memory sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { email, message, name } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required." },
        { status: 400 }
      );
    }

    // In production, if RESEND_API_KEY is configured, dispatch through Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      // Optional Resend email dispatch
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "portfolio@ahmadimran.dev",
            to: "ahmadimran67208@gmail.com",
            subject: `Portfolio Contact from ${name || email}`,
            text: `From: ${name || "Anonymous"} (${email})\n\nMessage:\n${message || "No message provided."}`,
          }),
        });
      } catch (err) {
        console.error("Email dispatch failure:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully. Thank you for reaching out!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
