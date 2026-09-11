"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label?: string;
  className?: string;
  pulseColor?: string;
}

export function StatusBadge({
  label = "Verified Live Runtime",
  className,
}: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-medium text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>{label}</span>
    </div>
  );
}
