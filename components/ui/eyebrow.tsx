import type { ReactNode } from "react";

import { cn } from "./cn";

type EyebrowProps = {
  tone?: "white" | "rad";
  className?: string;
  children: ReactNode;
};

export function Eyebrow({ tone = "white", className, children }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone === "rad" ? "text-[color:var(--color-rad-hi)]" : "text-white/70",
        className
      )}
    >
      <span className="h-px w-8 bg-current opacity-60" aria-hidden />
      {children}
    </span>
  );
}
