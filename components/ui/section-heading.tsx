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
        transition: { duration: 0.6, ease: EASE_EMPHASIS }
      };

  return (
    <motion.header
      {...motionProps}
      className={cn(
        "relative grid",
        compact ? "mb-6 grid-cols-1 gap-3 pb-4" : "mb-10 gap-5 pb-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <motion.p
            className="relative inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]/90"
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE_EMPHASIS }}
          >
            <span className="inline-block h-[6px] w-[6px] rounded-full bg-[color:var(--color-rad)]" />
            {eyebrow}
          </motion.p>
        ) : null}
        <h2 className="relative mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.4vw,4rem)] uppercase leading-[0.96] tracking-normal text-[var(--text)] [text-wrap:balance]">
          {title}
        </h2>
      </div>

      {hasMeta ? (
        <div className="flex flex-col items-start gap-4 lg:pb-1">
          {description ? (
            <div className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {description}
            </div>
          ) : null}
          {actionHref && actionLabel ? (
            <Link
              href={actionHref}
              className="group inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] transition-[border-color,color,background] hover:border-[var(--border-md)] hover:bg-[var(--surface-hi)] hover:text-[var(--text)]"
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
        initial={false}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE_EMPHASIS, delay: 0.15 }}
        style={{ originX: 0 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[var(--border)] via-[var(--border-md)] to-transparent"
      />
    </motion.header>
  );
}
