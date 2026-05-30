"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "./cn";
import { EASE_EMPHASIS } from "./motion-tokens";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  compact?: boolean;
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  actionHref,
  actionLabel,
  compact = false,
  className
}: SectionHeadingProps) {
  const hasMeta = description || (actionHref && actionLabel);
  const reduced = useReducedMotion();

  const motionProps = reduced
    ? {}
    : {
        initial: false,
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.52, ease: EASE_EMPHASIS }
      };

  return (
    <motion.header
      {...motionProps}
      className={cn(
        "relative grid",
        compact ? "mb-5 grid-cols-1 gap-3 pb-3" : "mb-8 gap-4 pb-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end",
        className
      )}
    >
      <div>
        {eyebrow ? <p className="rad-kicker">{eyebrow}</p> : null}
        <h2 className="relative mt-3 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.35rem)] uppercase leading-[0.98] tracking-normal text-white [text-wrap:balance]">
          {title}
        </h2>
      </div>

      {hasMeta ? (
        <div className="flex flex-col items-start gap-4 lg:pb-1">
          {description ? (
            <div className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              {description}
            </div>
          ) : null}
          {actionHref && actionLabel ? (
            <Link href={actionHref} className="rad-link">
              {actionLabel}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
      ) : null}

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--border)]"
      />
    </motion.header>
  );
}
