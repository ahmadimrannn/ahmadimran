import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "sonner";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
    variable: "--font-geist",
    subsets: ["latin"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ahmad Imran | Agentic AI Engineer & Autonomous Systems Architect",
    description:
        "This is my production portfolio. I Engineer Autonomous multi-agent systems, LangGraph pipelines, real-time voice agents, and deterministic LLM architectures from 0 to 1.",
    keywords: [
        "Agentic AI Engineer",
        "LangGraph",
        "FastAPI",
        "Postgres",
        "pgvector",
        "LiveKit",
        "Voice AI",
        "Autonomous Agents",
    ],
    authors: [{ name: "Ahmad Imran" }],
    openGraph: {
        title: "Ahmad Imran | Agentic AI Engineer",
        description:
            "Engineering AI Agents for Real-World Action",
        type: "website",
    },
    verification: {
        google: "VMDzTCjPuPvMQv8nE4t_obHGaCBtmmY28Bm3IwrfeME",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${inter.variable} font-sans h-full antialiased`}
        >
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-T582FH00TY"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-T582FH00TY');
                `}
                </Script>
            </head>
            <body className="min-h-screen bg-(--bg) text-(--text) transition-colors duration-300 selection:bg-emerald-500/30 selection:text-emerald-500" suppressHydrationWarning>
                <ThemeProvider>
                    {children}
                    <Toaster position="bottom-right" richColors />
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
