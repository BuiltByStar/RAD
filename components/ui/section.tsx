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
  default: "bg-transparent text-white",
  surface: "bg-white/[.025] text-white",
  inverse: "bg-white text-black"
};

const paddings: Record<Padding, string> = {
  xs: "py-10 sm:py-12",
  sm: "py-16 sm:py-22",
  md: "py-22 sm:py-30",
  lg: "py-30 sm:py-38"
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
