"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const microcopy = [
    "Runtime judgment, bounded by real controls.",
    "Evidence first. Human approval before action.",
    "Designed for the moment the model is uncertain.",
];

function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
    const [copyIndex, setCopyIndex] = useState(0);
    const cycleMicrocopy = () => setCopyIndex((index) => (index + 1) % microcopy.length);

    return (
        <section id="top" className="hero" aria-labelledby="hero-title">
            <div className="hero-glow" />
            <div className="wrap hero-content flex flex-col gap-2 justify-start items-start md:px-4 ">
                <p className="availability">
                    <span />
                    Available for select collaborations
                </p>
                <p id="hero-title" className="font-geist tracking-tighter text-3xl md:text-7xl">
                    Engineering autonomous agency by building AI Agents.
                </p>
                <button
                    className="hero-microcopy my-1 ml-1"
                    type="button"
                    onMouseEnter={cycleMicrocopy}
                    onFocus={cycleMicrocopy}
                    onClick={cycleMicrocopy}
                >
                    <span aria-hidden="true">✦ </span>
                    {microcopy[copyIndex]}
                </button>
                <div className="actions">
                    <Button onClick={() => scrollToSection("projects")}>View Projects</Button>
                    <Button variant="secondary" onClick={() => scrollToSection("contact")}>
                        Get in Touch
                    </Button>
                </div>
            </div>
        </section>
    );
}
