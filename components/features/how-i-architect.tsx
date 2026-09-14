"use client";

import { steps } from "@/lib/constants";
import { motion, Variants } from "framer-motion";

const stepVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1.0],
        },
    },
};

export function HowIArchitect() {
    return (
        <section id="how-i-architect" className="w-full bg-[#fafaf8] text-[#000000] py-24 sm:py-32">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                {/* Section Heading */}
                <div className="mb-16 sm:mb-24">
                    <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
                        [ Process ]
                    </p>
                    <h2 className="font-geist text-3xl sm:text-4xl md:text-5xl font-normal tracking-tighter text-[#000000]">
                        How I Architect
                    </h2>
                </div>

                {/* Vertical Stacked List with Timeline Rail */}
                <div className="relative border-l border-[#1A1A1A]/10 ml-3 sm:ml-4 pl-6 sm:pl-10 space-y-12 sm:space-y-16">
                    {steps.map((step) => (
                        <motion.div
                            key={step.number}
                            variants={stepVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            className="relative group"
                        >
                            {/* Optional timeline node subtle marker */}
                            <div className="absolute -left-7.75 sm:-left-11.75 top-1.5 w-2.5 h-2.5 rounded-full bg-[#fafaf8] border border-[#1A1A1A]/20" />

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-start">
                                {/* Step Number & Title */}
                                <div className="md:col-span-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                                    <span className="font-geist text-sm sm:text-base font-normal text-[#A0A0A0] tracking-tighter shrink-0">
                                        {step.number}
                                    </span>
                                    <h3 className="font-geist text-xl sm:text-2xl font-normal tracking-tighter text-[#000000]">
                                        {step.title}
                                    </h3>
                                </div>

                                {/* Step Body Paragraph */}
                                <div className="md:col-span-7 pt-1 md:pt-0">
                                    <p className="font-inter text-base font-normal text-[#000000]/80 leading-[1.6]">
                                        {step.body}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowIArchitect;