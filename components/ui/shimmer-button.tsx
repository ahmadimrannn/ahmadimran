"use client";

import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <button className={cn("shimmer-btn", className)} {...props}>
      <span className="shimmer-btn-text">{children}</span>
      <span className="shimmer-btn-shine" aria-hidden="true" />
    </button>
  );
}
