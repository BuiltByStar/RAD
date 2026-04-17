import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type ChipRowProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode };
export function ChipRow({ className, children, ...rest }: ChipRowProps) {
  return (
    <div className={cn("mt-4 flex flex-wrap items-center gap-2", className)} {...rest}>
      {children}
    </div>
  );
}

type ChipProps = HTMLAttributes<HTMLSpanElement> & { children: ReactNode };
export function Chip({ className, children, ...rest }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
