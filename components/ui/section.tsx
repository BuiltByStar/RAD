import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";

type Tone = "default" | "surface" | "inverse";
type Padding = "xs" | "sm" | "md" | "lg";

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  padding?: Padding;
  children: ReactNode;
};

const tones: Record<Tone, string> = {
  default: "bg-transparent text-[var(--text)]",
  surface: "bg-[var(--bg-alt)] text-[var(--text)]",
  inverse: "bg-[#151f21] text-white"
};

const paddings: Record<Padding, string> = {
  xs: "py-8 sm:py-10",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-22",
  lg: "py-20 sm:py-28"
};

export function Section({
  tone = "default",
  padding = "md",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn("relative", tones[tone], paddings[padding], className)}
      {...rest}
    >
      {children}
    </section>
  );
}
