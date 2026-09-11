"use client";

import type { Variants, Transition } from "framer-motion";

export const TRANSITION_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]; // Custom cubic-bezier for luxury feel

export const FADE_UP_VARIANT: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

/* ── backward compatible motion helpers ──────────────────────── */
export const spring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
};

export const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export const STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

export const SCALE_IN: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
  },
};
