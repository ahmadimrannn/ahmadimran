"use client";

import { motion } from "framer-motion";
import { projects, Project } from "@/lib/constants";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FADE_UP_VARIANT, STAGGER_CONTAINER } from "@/lib/motion";
import { ThreeDCardDemo } from "../ui/three-d-card";

function ProjectCardItem({ project }: { project: Project }) {
    return (
        <ThreeDCardDemo />
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
                            Projects I&apos;m proud of
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
                            Autonomous agents, RAG systems, and speech intelligence built with
                            rigorous error handling and production guardrails.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((proj) => (
                            <ProjectCardItem key={proj.name} project={proj} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
