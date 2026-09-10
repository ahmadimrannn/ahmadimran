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
    <div className={cn("terminal", className)}>
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-tab">{tab}</span>
        <div className="terminal-dots-spacer" />
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}
