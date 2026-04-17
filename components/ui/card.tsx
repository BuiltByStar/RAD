"use client";

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "./cn";
import { EASE_EMPHASIS } from "./motion-tokens";

type Tone = "default" | "lead" | "metric" | "compact" | "tall";

type CardProps = Omit<HTMLMotionProps<"article">, "children"> & {
  tone?: Tone;
  accent?: boolean;
  children: ReactNode;
  hover?: boolean;
};

const tones: Record<Tone, string> = {
  default: "p-5 sm:p-6",
  lead: "p-6 sm:p-8",
  metric: "p-6 min-h-[180px] grid content-end gap-1",
  compact: "p-5 min-h-[190px]",
  tall: "p-6 min-h-[260px] grid content-start gap-3"
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EMPHASIS }
  }
};

export function Card({
  tone = "default",
  accent = true,
  hover = true,
  className,
  children,
  ...rest
}: CardProps) {
  const reduced = useReducedMotion();

  const motionProps = reduced
    ? {}
    : {
        variants: cardVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-60px" },
        whileHover: hover ? { y: -4 } : undefined
      };

  return (
    <motion.article
      {...motionProps}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10",
        "bg-gradient-to-b from-white/[.04] to-white/[0.01]",
        "transition-[border-color,background-color] duration-300 ease-[var(--ease-emphasis)]",
        "hover:border-white/20 hover:from-white/[.06]",
        tones[tone],
        className
      )}
      {...rest}
    >
      {accent ? (
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-1 w-24 bg-[color:var(--color-rad)]/90"
        />
      ) : null}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(255_43_69_/_0.14),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </motion.article>
  );
}

type CardEyebrowProps = HTMLAttributes<HTMLParagraphElement>;
export function CardEyebrow({ className, ...rest }: CardEyebrowProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-rad-hi)]",
        className
      )}
      {...rest}
    />
  );
}

type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  size?: "sm" | "md" | "lg";
};
export function CardTitle({ className, size = "md", ...rest }: CardTitleProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl sm:text-[1.65rem]",
    lg: "text-3xl sm:text-4xl"
  } as const;
  return (
    <h3
      className={cn(
        "mt-2 font-[family-name:var(--font-display)] uppercase leading-[1.05] tracking-tight text-white [text-wrap:balance]",
        sizes[size],
        className
      )}
      {...rest}
    />
  );
}

type CardBodyProps = HTMLAttributes<HTMLParagraphElement>;
export function CardBody({ className, ...rest }: CardBodyProps) {
  return (
    <p className={cn("mt-3 text-sm leading-relaxed text-white/65 sm:text-[0.95rem]", className)} {...rest} />
  );
}

type CardMetricProps = HTMLAttributes<HTMLParagraphElement>;
export function CardMetric({ className, ...rest }: CardMetricProps) {
  return (
    <p
      className={cn(
        "font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-tight sm:text-6xl",
        className
      )}
      style={{ fontVariantNumeric: "tabular-nums" }}
      {...rest}
    />
  );
}
