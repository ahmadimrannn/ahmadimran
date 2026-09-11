"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function DynamicCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 35 });
  const haloX = useSpring(0, { stiffness: 180, damping: 25 });
  const haloY = useSpring(0, { stiffness: 180, damping: 25 });

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      haloX.set(e.clientX);
      haloY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], input, [data-interactive]");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handlePointerOver);
    };
  }, [cursorX, cursorY, haloX, haloY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer halo tracker */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: haloX,
          y: haloY,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          background: isHovered
            ? "radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 60%)",
          border: isHovered
            ? "1px solid rgba(52,211,153,0.4)"
            : "1px solid rgba(52,211,153,0.15)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-emerald-400 shadow-[0_0_8px_#34d399]"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          transition: "width 0.15s, height 0.15s",
        }}
      />
    </div>
  );
}
