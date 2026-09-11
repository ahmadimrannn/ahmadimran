"use client";

import { cn } from "@/lib/utils";

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  tab?: string;
}

export function Terminal({
  children,
  className,
  tab = "live_agent_status.sh — zsh",
}: TerminalProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-7 shadow-2xl font-mono text-neutral-300 w-full overflow-hidden transition-all duration-300 dark:border-white/10 dark:bg-black/80",
        className
      )}
    >
      {/* Window Controls Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 dark:border-white/10 mb-5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 dark:bg-white/5 dark:border-white/5 text-xs text-neutral-400 font-mono">
          <span className="text-emerald-400">$</span>
          <span>{tab}</span>
        </div>
        <div className="w-12" /> {/* balancer spacer */}
      </div>

      {/* Terminal Content */}
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
