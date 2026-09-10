"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={cn("aurora-wrap", className)}>
      <div className="aurora-layer" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>
      {children}
    </div>
  );
}
