"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { Tooltip } from "@/components/ui/tooltip";
import { techStackRow1, techStackRow2, TechItem } from "@/lib/constants";
import { FADE_UP_VARIANT, STAGGER_CONTAINER } from "@/lib/motion";

function TechPill({ item }: { item: TechItem }) {
  return (
    <Tooltip content={item.tooltip}>
      <div className="flex items-center gap-3 bg-white/90 border border-neutral-200 shadow-xs text-neutral-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:bg-neutral-900/60 dark:border-white/10 dark:text-neutral-200 dark:hover:border-emerald-500/40 dark:hover:bg-neutral-800/80 backdrop-blur-md rounded-xl px-5 py-3 transition-all duration-300 cursor-pointer group shrink-0">
        <div className="w-5 h-5 relative flex items-center justify-center text-neutral-600 group-hover:text-emerald-600 dark:text-neutral-400 dark:group-hover:text-emerald-400 transition-colors">
          <Image
            src={`/icons/${item.iconName}.svg`}
            alt={`${item.name} icon`}
            width={18}
            height={18}
            className="opacity-80 group-hover:opacity-100 transition-opacity dark:invert"
          />
        </div>
        <span className="font-mono text-sm font-medium text-neutral-800 group-hover:text-neutral-950 dark:text-neutral-200 dark:group-hover:text-white transition-colors">
          {item.name}
        </span>
      </div>
    </Tooltip>
  );
}

export function TechMarquee() {
  return (
    <section id="stack" className="py-28 relative border-t border-neutral-200 dark:border-white/10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl"
        >
          <motion.p
            variants={FADE_UP_VARIANT}
            className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2"
          >
            [ Stack ]
          </motion.p>
          <motion.h2
            variants={FADE_UP_VARIANT}
            className="text-3xl sm:text-5xl font-geist font-medium tracking-tighter text-neutral-950 dark:text-white"
          >
            Core Technologies
          </motion.h2>
        </motion.div>
      </div>

      {/* Dual opposing horizontal marquees */}
      <div className="flex flex-col gap-5">
        <Marquee speed="slow" pauseOnHover={true} reverse={false} gap="1.25rem">
          {techStackRow1.map((item) => (
            <TechPill key={item.name} item={item} />
          ))}
        </Marquee>

        <Marquee speed="slow" pauseOnHover={true} reverse={true} gap="1.25rem">
          {techStackRow2.map((item) => (
            <TechPill key={item.name} item={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
