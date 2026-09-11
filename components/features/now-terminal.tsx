"use client";

import { motion } from "framer-motion";
import { Terminal } from "@/components/ui/terminal";
import { FADE_UP_VARIANT, STAGGER_CONTAINER } from "@/lib/motion";

export function NowTerminal() {
  return (
    <section id="now" className="py-28 relative border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-10"
        >
          {/* Section Heading */}
          <motion.div variants={FADE_UP_VARIANT}>
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
              [ Now ]
            </p>
            <h2 className="text-3xl sm:text-5xl font-geist font-medium tracking-tighter text-neutral-950 dark:text-white">
              What I&apos;m building now
            </h2>
          </motion.div>

          {/* Terminal Shell */}
          <motion.div variants={FADE_UP_VARIANT}>
            <Terminal tab="live_agent_status.sh — zsh">
              <p className="font-mono text-sm text-neutral-300 leading-relaxed">
                <span className="text-emerald-400 font-medium">&gt; Currently building: </span>
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                  Runa
                </span>{" "}
                — Custom AI voice agent for small businesses (restaurants &amp; dental clinics).
                Automates phone call orders with real-time dialogue using LiveKit &amp; LangGraph.
              </p>
            </Terminal>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
