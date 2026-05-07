"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

import { cn } from "./cn";
import { EASE_EMPHASIS } from "./motion-tokens";

type Tone = "default" | "lead" | "metric" | "compact" | "tall";

type CardProps = Omit<HTMLMotionProps<"article">, "children"> & {
  tone?: Tone;
  accent?: boolean;
  children: ReactNode;
  hover?: boolean;
  spotlight?: boolean;
};

const tones: Record<Tone, string> = {
  default: "p-5 sm:p-6",
  lead: "p-6 sm:p-8",
  metric: "p-6 min-h-[180px] grid content-end gap-1",
  compact: "p-5 min-h-[190px]",
  tall: "p-6 min-h-[260px] grid content-start gap-3"
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EMPHASIS }
  }
};

export function Card({
  tone = "default",
  accent = true,
  hover = true,
  spotlight = false,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: CardProps) {
  const reduced = useReducedMotion();

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(255,43,69,0.22), transparent 65%)`;

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
    onMouseMove?.(event);
  };

  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    mouseX.set(-200);
    mouseY.set(-200);
    onMouseLeave?.(event);
  };

  const motionProps = reduced
    ? {}
    : {
        variants: cardVariants,
        initial: false,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-60px" },
        whileHover: hover ? { y: -3 } : undefined
      };

  return (
    <motion.article
      {...motionProps}
      onMouseMove={spotlight ? handleMove : onMouseMove}
      onMouseLeave={spotlight ? handleLeave : onMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-[1.15rem] border border-white/10",
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_48%,rgba(255,0,0,0.035))]",
        "shadow-[0_18px_52px_-34px_rgba(0,0,0,0.98)]",
        "transition-[border-color,box-shadow] duration-500",
        "hover:border-[#ff0000]/34",
        "hover:shadow-[0_24px_72px_-42px_rgba(255,0,0,0.5)]",
        tones[tone],
        className
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,0,0,0.16),transparent_34%),linear-gradient(120deg,transparent,rgba(255,255,255,0.04)_42%,transparent_58%)] opacity-70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-[-45%] top-0 h-px w-[90%] bg-gradient-to-r from-transparent via-[#ff0000]/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:[animation:rad-border-run_1.35s_ease-out]"
      />

      {spotlight && !reduced ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlightBg } as Record<string, unknown>}
        />
      ) : null}

      {accent ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-32 origin-left bg-[color:var(--color-rad)]/90"
          initial={false}
          whileInView={reduced ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_EMPHASIS, delay: 0.1 }}
        />
      ) : null}

      <div className="relative z-10">{children}</div>
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
