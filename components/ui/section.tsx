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
  xs: "py-8 sm:py-10",
  sm: "py-14 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-28 sm:py-36"
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
