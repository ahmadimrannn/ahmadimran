"use client";

import { motion } from "framer-motion";
import { projects, Project } from "@/lib/constants";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FADE_UP_VARIANT, STAGGER_CONTAINER } from "@/lib/motion";

function ProjectCardItem({ project }: { project: Project }) {
  return (
    <BentoCard colSpan={project.cols as 4 | 6 | 8 | 12}>
      <div className="flex flex-col h-full justify-between space-y-6">
        {/* Top: Header with title & actual status label */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl sm:text-3xl font-geist font-medium tracking-tighter text-neutral-950 dark:text-white">
              {project.name}
            </h3>
            <span className="shrink-0 px-3 py-1 rounded-full border border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 text-xs font-mono">
              {project.status}
            </span>
          </div>

          {/* Problem description */}
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {project.problem}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full border border-neutral-200 bg-neutral-100 text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 text-xs font-mono"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Real Bug-and-Fix line */}
        <div className="pt-4 border-t border-neutral-200 dark:border-white/10 space-y-1.5 font-mono text-xs">
          <p className="font-semibold text-neutral-900 dark:text-neutral-200">
            Real bug caught &amp; resolved:
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 font-sans text-xs leading-relaxed">
            {project.bug}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

export function ProjectsBento() {
  return (
    <section id="projects" className="py-28 relative border-t border-neutral-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={FADE_UP_VARIANT} className="max-w-3xl">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
              [ Projects ]
            </p>
            <h2 className="text-3xl sm:text-5xl font-geist font-medium tracking-tighter text-neutral-950 dark:text-white">
              Selected Work
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
              Autonomous agents, RAG systems, and speech intelligence built with
              rigorous error handling and production guardrails.
            </p>
          </motion.div>

          {/* Asymmetric Bento Matrix */}
          <BentoGrid>
            {projects.map((proj) => (
              <ProjectCardItem key={proj.name} project={proj} />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
