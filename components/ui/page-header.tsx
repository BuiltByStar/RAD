"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_OUT_EXPO } from "./motion-tokens";
import { cn } from "./cn";
import { FluidContainer } from "./fluid-container";

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function PageHeader({ title, eyebrow, description, meta, className }: PageHeaderProps) {
  const reduced = useReducedMotion();

  return (
    <header className={cn("relative overflow-hidden border-b border-neutral-900 bg-black", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_320px_at_12%_0%,rgba(229,6,47,0.12),transparent_60%)]"
      />

      <FluidContainer>
        <div className="relative border-x border-neutral-900 px-4 py-8 sm:px-6 md:px-8 md:py-10">
          {eyebrow ? (
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]"
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.05 }}
            className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-normal text-white"
          >
            {title}
          </motion.h1>

          {description ? (
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.1 }}
              className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base"
            >
              {description}
            </motion.p>
          ) : null}

          {meta ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.14 }}
              className="mt-4 flex flex-wrap items-center gap-2"
            >
              {meta}
            </motion.div>
          ) : null}
        </div>
      </FluidContainer>
    </header>
  );
}
