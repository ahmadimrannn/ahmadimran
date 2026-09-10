"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ── Grid container ────────────────────────────────────────── */
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("bento-grid", className)}>
      {children}
    </div>
  );
}

/* ── Card with mouse-tracking spotlight ────────────────────── */
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
}

export function BentoCard({ children, className, cols = 6 }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const colClass = `bento-col-${cols}`;

  return (
    <div
      ref={ref}
      className={cn("bento-card", colClass, className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, opacity: 0 }))}
    >
      {/* spotlight glow */}
      <div
        className="bento-spotlight"
        aria-hidden="true"
        style={{
          background: `radial-gradient(640px circle at ${spotlight.x}px ${spotlight.y}px, rgba(61,220,132,0.06), transparent 40%)`,
          opacity: spotlight.opacity,
        }}
      />
      <div className="bento-card-inner">{children}</div>
    </div>
  );
}
