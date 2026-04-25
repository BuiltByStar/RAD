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
        "relative mb-10 grid gap-5 pb-6",
        compact ? "grid-cols-1" : "lg:grid-cols-[1.05fr_0.95fr] lg:items-end",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <motion.p
            className="relative inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]"
            initial={reduced ? undefined : { opacity: 0, x: -8 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE_EMPHASIS }}
          >
            <motion.span
              className="inline-block h-[6px] w-[6px] rounded-full bg-[color:var(--color-rad)] shadow-[0_0_8px_rgb(255_43_69_/_0.9)]"
              animate={reduced ? undefined : { opacity: [1, 0.4, 1], scale: [1, 1.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            {eyebrow}
          </motion.p>
        ) : null}
        <h2 className="relative mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.4vw,4rem)] uppercase leading-[0.96] tracking-normal text-white [text-wrap:balance]">
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
            <Link
              href={actionHref}
              className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-rad-hi)] transition-[border-color,color,background] hover:border-[color:var(--color-rad)]/30 hover:bg-[color:var(--color-rad)]/8 hover:text-white"
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-white/16 via-[color:var(--color-rad)]/28 to-transparent"
      />
    </motion.header>
  );
}
