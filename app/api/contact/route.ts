import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

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
                { error: "Rate limit exceeded. Please wait a moment before trying again." },
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

        const { name, email, phone, projectType, hearAbout, projectDetails } = body;

        // Validation for required fields: name, email, phone
        if (!name || typeof name !== "string" || name.trim() === "") {
            return NextResponse.json(
                { error: "Name is required." },
                { status: 400 }
            );
        }

        if (!email || typeof email !== "string" || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email address is required." },
                { status: 400 }
            );
        }

        if (!phone || typeof phone !== "string" || phone.trim() === "") {
            return NextResponse.json(
                { error: "Phone number is required." },
                { status: 400 }
            );
        }

        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
            const emailTextContent = `
                ══════════════════════════════════════════════════════════════
                            INBOUND PROJECT INQUIRY | CONTACT FORM
                ══════════════════════════════════════════════════════════════

                CLIENT OVERVIEW
                ──────────────────────────────────────────────────────────────
                • Full Name     : ${name}
                • Email Address : ${email}
                • Phone Number  : ${phone || "Not provided"}

                PROJECT SPECIFICATIONS
                ──────────────────────────────────────────────────────────────
                • Scope / Type  : ${projectType || "Not specified"}
                • Acquisition   : ${hearAbout || "Not specified"}

                EXECUTIVE SUMMARY & BRIEF
                ──────────────────────────────────────────────────────────────
                ${projectDetails ? projectDetails.trim() : "No additional details provided."}

                ══════════════════════════════════════════════════════════════
                Timestamp: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })} PKT
                `.trim();

            // 2. Luxury Dark-Mode HTML Template
            const emailHtmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Project Inquiry</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; padding: 40px 20px;">
                    <tr>
                    <td align="center">
                        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #121215; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
                        
                        <!-- Header Bar -->
                        <tr>
                            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                            <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #10b981; font-weight: 600;">[ NEW INQUIRY RECEIVED ]</span>
                            <h1 style="margin: 8px 0 0 0; font-size: 24px; font-weight: 500; color: #ffffff; letter-spacing: -0.02em;">New Project Inquiry</h1>
                            </td>
                        </tr>

                        <!-- Client Overview -->
                        <tr>
                            <td style="padding: 32px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                <tr>
                                <td style="padding-bottom: 12px; font-family: monospace; font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.05em;">Client Details</td>
                                </tr>
                                <tr>
                                <td style="background-color: #18181b; padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                                    <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #ffffff;">${name}</p>
                                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #10b981; font-family: monospace;">${email}</p>
                                    <p style="margin: 0; font-size: 13px; color: #a1a1aa; font-family: monospace;">${phone || "Phone not provided"}</p>
                                </td>
                                </tr>
                            </table>

                            <!-- Project Specs -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                                <tr>
                                <td width="50%" style="padding-right: 8px; vertical-align: top;">
                                    <div style="background-color: #18181b; padding: 16px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                                    <p style="margin: 0 0 4px 0; font-family: monospace; font-size: 10px; color: #71717a; text-transform: uppercase;">Project Type</p>
                                    <p style="margin: 0; font-size: 13px; font-weight: 500; color: #e4e4e7;">${projectType || "Not specified"}</p>
                                    </div>
                                </td>
                                <td width="50%" style="padding-left: 8px; vertical-align: top;">
                                    <div style="background-color: #18181b; padding: 16px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                                    <p style="margin: 0 0 4px 0; font-family: monospace; font-size: 10px; color: #71717a; text-transform: uppercase;">Lead Source</p>
                                    <p style="margin: 0; font-size: 13px; font-weight: 500; color: #e4e4e7;">${hearAbout || "Not specified"}</p>
                                    </div>
                                </td>
                                </tr>
                            </table>

                            <!-- Brief -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                <td style="padding-bottom: 12px; font-family: monospace; font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.05em;">Project Brief</td>
                                </tr>
                                <tr>
                                <td style="background-color: #18181b; padding: 20px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); font-size: 14px; line-height: 1.6; color: #d4d4d8; white-space: pre-wrap;">${projectDetails ? projectDetails.trim() : "No project details provided."}</td>
                                </tr>
                            </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 32px; background-color: #0f0f12; border-top: 1px solid rgba(255, 255, 255, 0.05); font-family: monospace; font-size: 11px; color: #52525b;">
                            <span>Automated System Notification</span>
                            </td>
                        </tr>

                        </table>
                    </td>
                    </tr>
                </table>
                </body>
                </html>
            `.trim();

            const resendRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${resendKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "onboarding@resend.dev",
                    to: ["ahmadimran67208@gmail.com"],
                    replyTo: email,
                    subject: `Inquiry: ${projectType || "New Lead"} — ${name}`,
                    text: emailTextContent,
                    html: emailHtmlContent,
                }),
            });

            if (!resendRes.ok) {
                const resendErr = await resendRes.json();
                console.error("Resend API error:", resendErr);
                return NextResponse.json(
                    { error: "Failed to dispatch email notification." },
                    { status: 500 }
                );
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