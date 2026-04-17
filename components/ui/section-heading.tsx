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
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: EASE_EMPHASIS }
      };

  return (
    <motion.header
      {...motionProps}
      className={cn(
        "relative mb-10 grid gap-5 pb-5",
        compact ? "grid-cols-1" : "lg:grid-cols-[1.05fr_0.95fr] lg:items-end",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-rad-hi)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] uppercase leading-[0.98] tracking-tight text-white [text-wrap:balance]">
          {title}
        </h2>
      </div>

      {hasMeta ? (
        <div className="flex flex-col items-start gap-4">
          {description ? (
            <div className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              {description}
            </div>
          ) : null}
          {actionHref && actionLabel ? (
            <Link
              href={actionHref}
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-rad-hi)] transition-colors hover:text-white"
            >
              {actionLabel}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          ) : null}
        </div>
      ) : null}

      <motion.span
        aria-hidden
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE_EMPHASIS, delay: 0.15 }}
        style={{ originX: 0 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-white/30 via-white/10 to-transparent"
      />
    </motion.header>
  );
}
