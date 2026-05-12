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
  lead: "p-6 sm:p-7",
  metric: "p-5 sm:p-6 min-h-[150px] grid content-end gap-1",
  compact: "p-5 min-h-[160px]",
  tall: "p-5 sm:p-6 min-h-[220px] grid content-start gap-3"
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
  const spotlightBg = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(241,58,93,0.16), transparent 70%)`;

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
        whileHover: hover ? { y: -2 } : undefined
      };

  return (
    <motion.article
      {...motionProps}
      onMouseMove={spotlight ? handleMove : onMouseMove}
      onMouseLeave={spotlight ? handleLeave : onMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-[1.65rem] border border-white/[0.085]",
        "bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025)_44%,rgba(220,20,60,0.045))] backdrop-blur-xl",
        "shadow-[0_24px_70px_-52px_rgba(0,0,0,0.95)]",
        "transition-[border-color,background,box-shadow] duration-300",
        "hover:border-white/18 hover:bg-white/[0.07] hover:shadow-[0_30px_90px_-58px_rgba(220,20,60,0.55)]",
        tones[tone],
        className
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/24 to-transparent"
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
          className="pointer-events-none absolute left-5 top-5 h-1.5 w-10 origin-left rounded-full bg-[color:var(--color-rad)]/80 shadow-[0_0_22px_rgba(220,20,60,0.3)]"
          initial={false}
          whileInView={reduced ? undefined : { scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_EMPHASIS, delay: 0.1 }}
        />
      ) : null}

      <div className={cn("relative z-10", accent ? "pt-4" : null)}>{children}</div>
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
