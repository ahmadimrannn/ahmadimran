"use client";

import { motion } from "framer-motion";
import { FADE_UP_VARIANT, STAGGER_CONTAINER } from "@/lib/motion";

export function AboutSection() {
  return (
    <section id="about" className="py-28 relative border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto gap-6 px-6 sm:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          {/* Section Kicker */}
          <motion.div variants={FADE_UP_VARIANT}>
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
              [ About ]
            </p>
            <h2 className="text-3xl sm:text-5xl font-geist font-medium tracking-tighter text-neutral-950 dark:text-white leading-tight">
              Systems that know when to ask, decide, and hand over.
            </h2>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={FADE_UP_VARIANT}
            className="text-base sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-6"
          >
            <p>
              Ahmad started in web development — HTML, CSS, JavaScript, React,
              Next.js, and Node.js — then moved through cloud computing into
              agentic AI.
            </p>
            <p>
              Self-taught and based in Gujranwala, Pakistan, he focuses on genuine
              dynamic agents: systems where an LLM decides what to do at runtime,
              not fixed pipelines, with real guardrails, evals, human approval
              steps, and persistent memory.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
