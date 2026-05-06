import type { ReactNode } from "react";

import { cn } from "./cn";

type BadgeProps = {
  tone?: "neutral" | "rad" | "live";
  className?: string;
  children: ReactNode;
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-white/5 text-white/80 border-white/10",
  rad: "bg-[color:var(--color-rad-ember)]/72 text-[color:var(--color-rad-hi)] border-[color:var(--color-rad)]/40",
  live: "bg-[color:var(--color-rad-ember)]/90 text-white border-[color:var(--color-rad)]/50"
};

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
        tones[tone],
        className
      )}
    >
      {tone === "live" ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-rad)] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)]" />
        </span>
      ) : null}
      {children}
    </span>
  );
}
