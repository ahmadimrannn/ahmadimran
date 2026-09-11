"use client";

import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { FADE_UP_VARIANT, STAGGER_CONTAINER } from "@/lib/motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    return (
        <section
            id="top"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 transition-colors duration-300"
        >
            {/* Blurred radial background - emerald tinted glow in both modes */}
            <div
                className="pointer-events-none absolute -top-40 right-[-15%] w-[850px] h-[650px] rounded-full bg-radial from-emerald-200/50 via-emerald-100/20 to-transparent dark:from-[#013220] dark:via-[#012417] dark:to-transparent blur-[120px] opacity-75 transition-colors duration-500"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-start sm:text-center flex  items-center gap-0">
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start sm:items-center"
                >
                    {/* Headline with fixed punctuation and space */}
                    <motion.p
                        variants={FADE_UP_VARIANT}
                        className="sm:mt-8 text-6xl lg:text-8xl font-geist tracking-tighter text-neutral-950 dark:text-white leading-[1.05] sm:leading-[0.90] max-w-4xl transition-colors duration-300"
                    >
                        Engineering AI Agents for Real-World Action
                    </motion.p>

                    {/* Subtitle */}
                    <motion.p
                        variants={FADE_UP_VARIANT}
                        className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors duration-300"
                    >
                        I build autonomous multi agentic systems. I take the product from 0
                        -&gt; 1.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={FADE_UP_VARIANT}
                        className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
                    >
                        {/* Primary Shimmer Button */}
                        <a href="#projects" className="inline-block">
                            <ShimmerButton
                                background="#052e16"
                                shimmerColor="#34d399"
                                className="font-medium text-sm sm:text-base px-7 py-3.5 flex items-center gap-2 shadow-md"
                            >
                                <span>View Projects</span>
                                <ArrowDown size={16} className="text-emerald-300" />
                            </ShimmerButton>
                        </a>

                        {/* Plain secondary outline button */}
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-neutral-300 bg-white/70 hover:bg-neutral-100 text-neutral-900 shadow-sm dark:border-white/20 dark:bg-transparent dark:hover:bg-white/10 dark:text-white text-sm sm:text-base font-medium transition-colors"
                        >
                            <span>Get in Touch</span>
                            <ArrowUpRight size={16} className="text-neutral-500 dark:text-neutral-400" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
