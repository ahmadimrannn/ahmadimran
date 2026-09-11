"use client";

import React, { useRef, useState, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 4 | 6 | 8 | 12;
}

export function BentoCard({
  children,
  className,
  colSpan = 6,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const colSpanClasses = {
    4: "md:col-span-4",
    6: "md:col-span-6",
    8: "md:col-span-8",
    12: "md:col-span-12",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: -1000, y: -1000 });
      }}
      style={
        {
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        } as CSSProperties
      }
      className={cn(
        "group relative rounded-3xl border border-neutral-200/90 bg-white/90 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:border-neutral-300 dark:border-white/10 dark:bg-neutral-950/80 dark:hover:border-white/20 dark:shadow-xl",
        colSpanClasses[colSpan],
        className
      )}
    >
      {/* Mouse-following spotlight border / glow overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16,185,129,0.12), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle border highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.6 : 0,
          border: "1px solid rgba(16,185,129,0.25)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full w-full">{children}</div>
    </div>
  );
}
