"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "./cn";

type SectionDividerProps = {
  label?: string;
  className?: string;
};

export function SectionDivider({ label, className }: SectionDividerProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative flex items-center justify-center gap-4 py-10", className)} aria-hidden>
      <motion.span
        className="h-px flex-1 origin-right bg-gradient-to-r from-transparent via-white/15 to-[color:var(--color-rad)]/40"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <div className="flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_10px_rgb(255_43_69_/_0.9)]"
          animate={reduced ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        {label ? (
          <span className="font-[family-name:var(--font-display)] text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
            {label}
          </span>
        ) : null}
      </div>
      <motion.span
        className="h-px flex-1 origin-left bg-gradient-to-l from-transparent via-white/15 to-[color:var(--color-rad)]/40"
        initial={reduced ? undefined : { scaleX: 0 }}
        whileInView={reduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </div>
  );
}
