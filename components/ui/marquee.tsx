"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  speed?: number; // seconds for one full cycle
}

export function Marquee({
  children,
  className,
  direction = "left",
  pauseOnHover = true,
  speed = 40,
}: MarqueeProps) {
  const style = {
    "--marquee-duration": `${speed}s`,
    "--marquee-direction": direction === "right" ? "reverse" : "normal",
  } as React.CSSProperties;

  return (
    <div
      className={cn("marquee-container", pauseOnHover && "marquee-pause-hover", className)}
      style={style}
    >
      <div className="marquee-track">
        {children}
        {/* duplicate for seamless loop */}
        {children}
      </div>
    </div>
  );
}
