import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
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
  title: "Ahmad — Agentic AI Engineer",
  description: "I build autonomous multi agentic systems. I take the product from 0 -> 1.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html 
        lang="en" 
        suppressHydrationWarning 
        className={`${geistSans.variable} ${inter.variable} font-sans h-full antialiased`}>
      <body>{children}</body>
    </html>
  );
}
