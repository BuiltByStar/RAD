"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  lead: "p-6 sm:p-7",
  metric: "p-5 sm:p-6 min-h-[150px] grid content-end gap-1",
  compact: "p-5 min-h-[160px]",
  tall: "p-5 sm:p-6 min-h-[220px] grid content-start gap-3"
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE_EMPHASIS }
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
        initial: false,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-60px" }
      };

  return (
    <motion.article
      {...motionProps}
      className={cn(
        "group relative overflow-hidden rounded-none border border-white/[0.1] bg-white/[0.025]",
        "transition-[border-color,background-color] duration-[220ms]",
        hover ? "hover:border-white/18 hover:bg-white/[0.04]" : "",
        tones[tone],
        className
      )}
      {...rest}
    >
      {accent ? (
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-full bg-[color:var(--color-rad)]/70"
        />
      ) : null}

      <div className="relative z-10">{children}</div>
    </motion.article>
  );
}

type CardEyebrowProps = HTMLAttributes<HTMLParagraphElement>;
export function CardEyebrow({ className, ...rest }: CardEyebrowProps) {
  return <p className={cn("rad-kicker", className)} {...rest} />;
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
        "mt-2 font-[family-name:var(--font-display)] uppercase leading-[1.05] tracking-normal text-white [text-wrap:balance]",
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
export function CardMetric({ className, children, ...rest }: CardMetricProps) {
  const reduced = useReducedMotion();
  const raw = typeof children === "string" ? children : String(children ?? "");
  const target = parseInt(raw, 10);
  const isNumeric = !Number.isNaN(target);

  return (
    <p
      className={cn(
        "font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-normal sm:text-6xl",
        className
      )}
      style={{ fontVariantNumeric: "tabular-nums" }}
      {...rest}
    >
      {isNumeric ? <CountUp target={target} pad={raw.length} reduced={!!reduced} /> : children}
    </p>
  );
}

type CountUpProps = { target: number; pad: number; reduced: boolean };

function CountUp({ target, pad, reduced }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced || !inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target]);

  return <span ref={ref}>{String(value).padStart(pad, "0")}</span>;
}
