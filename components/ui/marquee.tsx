"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: "slow" | "normal" | "fast";
  gap?: string;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = "slow",
  gap = "1.5rem",
}: MarqueeProps) {
  const durationMap = {
    slow: "45s",
    normal: "30s",
    fast: "18s",
  };

  const duration = durationMap[speed] || "35s";

  return (
    <div
      className={cn(
        "group flex overflow-hidden p-2 select-none [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]",
        className
      )}
      style={
        {
          "--duration": duration,
          "--gap": gap,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: "var(--duration)",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration: "var(--duration)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
