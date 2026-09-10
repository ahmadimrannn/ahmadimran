"use client";

import type { Variants, Transition } from "framer-motion";

/* ── shared spring ─────────────────────────────────────────── */
export const spring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
};

/* ── fade-up entrance ──────────────────────────────────────── */
export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

/* ── stagger container ─────────────────────────────────────── */
export const STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

/* ── scale-in for cards ────────────────────────────────────── */
export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
  },
};
