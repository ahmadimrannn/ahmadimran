import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { LenisProvider } from "@/components/shared/lenis-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Imran — Agentic AI Engineer & Autonomous Systems",
  description:
    "Production portfolio of Ahmad Imran. Engineering autonomous multi-agent systems, LangGraph pipelines, real-time voice agents, and deterministic LLM architectures from 0 to 1.",
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
    title: "Ahmad Imran — Agentic AI Engineer",
    description:
      "Engineering autonomous agency. From reactive LLMs to accountable execution.",
    type: "website",
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
      <body className="min-h-screen bg-(--bg) text-(--text) transition-colors duration-300 selection:bg-emerald-500/30 selection:text-emerald-500">
        <ThemeProvider>
          <LenisProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
