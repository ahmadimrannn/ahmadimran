"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FADE_UP_VARIANT, STAGGER_CONTAINER } from "@/lib/motion";
import { Copy, Check, ArrowUpRight } from "lucide-react";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const email = "ahmadimran67208@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard!", {
        description: "Looking forward to speaking with you.",
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy email to clipboard.");
    }
  };

  return (
    <footer id="contact" className="relative border-t border-neutral-200 dark:border-white/10 pt-28 pb-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-16"
        >
          {/* Display Typography CTA */}
          <motion.div variants={FADE_UP_VARIANT} className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              [ Contact ]
            </p>
            <h2 className="text-4xl md:text-7xl font-geist font-medium tracking-tighter bg-gradient-to-b from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-500 bg-clip-text text-transparent leading-[1.05]">
              Let&apos;s build together.
            </h2>
          </motion.div>

          {/* 1-Click Copy Email & Direct Links */}
          <motion.div
            variants={FADE_UP_VARIANT}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            {/* 1-Click Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-neutral-200 hover:border-emerald-500 hover:bg-neutral-50 shadow-md dark:bg-neutral-900 dark:border-white/15 dark:hover:border-emerald-500/50 dark:hover:bg-neutral-800/80 transition-all duration-300 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  1-Click Copy Email
                </p>
                <p className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-300 transition-colors">
                  {email}
                </p>
              </div>
            </button>

            {/* Direct Mailto link */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/80 border border-neutral-200 hover:bg-neutral-100 text-neutral-800 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:text-white transition-all duration-300 font-mono text-sm shadow-xs"
            >
              <span>Send Mail</span>
              <ArrowUpRight size={16} className="text-neutral-400" />
            </a>

            {/* GitHub Profile */}
            <a
              href="https://github.com/ahmadimrannn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/80 border border-neutral-200 hover:bg-neutral-100 text-neutral-800 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:text-white transition-all duration-300 font-mono text-sm shadow-xs"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
              <ArrowUpRight size={16} className="text-neutral-400" />
            </a>

            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/ahmadimrannn/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/80 border border-neutral-200 hover:bg-neutral-100 text-neutral-800 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:text-white transition-all duration-300 font-mono text-sm shadow-xs"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn</span>
              <ArrowUpRight size={16} className="text-neutral-400" />
            </a>
          </motion.div>

          {/* Simple Clean Copyright Bar */}
          <motion.div
            variants={FADE_UP_VARIANT}
            className="pt-10 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500"
          >
            <span>© {new Date().getFullYear()} Ahmad Imran. All rights reserved.</span>
            <span>Gujranwala, Pakistan</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
