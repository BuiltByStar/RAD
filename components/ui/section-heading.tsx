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
        compact ? "mb-5 grid-cols-1 gap-3 pb-3" : "mb-8 gap-4 pb-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <motion.p
            className="relative inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-rad-hi)]/90"
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE_EMPHASIS }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_18px_rgba(220,20,60,0.55)]" />
            {eyebrow}
          </motion.p>
        ) : null}
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
            <Link
              href={actionHref}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/78 backdrop-blur-xl transition-[border-color,color,background,transform] hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.09] hover:text-white"
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
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
      />
    </motion.header>
  );
}
