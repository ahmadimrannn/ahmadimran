"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root className={cn("theme-switch", className)} {...props}>
      <SwitchPrimitive.Thumb className="theme-switch-thumb" />
    </SwitchPrimitive.Root>
  );
}
