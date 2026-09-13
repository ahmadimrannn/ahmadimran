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
                            [ About Me ]
                        </p>
                        <h2 className="text-3xl sm:text-5xl font-geist font-medium tracking-tighter text-neutral-950 dark:text-white leading-tight">
                            I build systems that know when to ask, decide, and hand over.
                        </h2>
                    </motion.div>

                    {/* Copy */}
                    <motion.div
                        variants={FADE_UP_VARIANT}
                        className="text-base sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-6"
                    >
                        <p>
                            As a kid, I was addicted to mobile phones, remote control cars, and video
                            games. I used to wonder how they worked. How does an app open when you tap
                            it? How does a phone sense your touch? How do games get built to look and
                            feel the way they do? Eventually I learned that programming is what powers
                            all of it, every mobile and every computer. That&apos;s what pulled me in.
                        </p>
                        <p>
                            At matriculation level, I had to choose between Computer Science and
                            Biology. Almost everyone around me pushed me toward biology. I picked
                            computer science anyway, because I already loved it and I was amazed by
                            what the field could do. What really got me was realizing that almost
                            every piece of software people use every day is built through computer
                            science.
                        </p>
                        <p>
                            I started in web development, building with HTML, CSS, JavaScript, React,
                            Next.js, and Node.js. That work took me through cloud computing before a
                            mentor pointed me toward a bigger shift: agentic AI was becoming the next
                            real wave, not just another framework to learn.
                        </p>
                        <p>
                            I&apos;m based in Pakistan, and I learn by building,
                            not by watching. My early projects were tutorial-driven, and when a mentor
                            told me straight that my portfolio lacked original work, I dropped them
                            and started over from blank repositories instead. That&apos;s still how I work:
                            build a rough version, trace where it breaks, fix the weakest part, and
                            repeat, rather than following a course from start to finish.
                        </p>
                        <p>
                            My focus now is genuine dynamic agents: systems where an LLM decides what
                            to do at runtime instead of following a fixed pipeline. That means real
                            guardrails, evals, human approval steps before anything ships, and memory
                            that persists across runs, not just chatbots that answer one question at a
                            time.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
