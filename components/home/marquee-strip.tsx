"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  "World Champions",
  "EMEA S6 Champions",
  "Marvel Rivals",
  "Untamed",
  "#GoWild",
  "Built for pressure",
  "Roster-first",
  "Open for activations"
];

export function MarqueeStrip() {
  const reduced = useReducedMotion();
  const row = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-black/80 py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reduced ? undefined : { x: ["0%", "-33.333%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {row.map((label, i) => (
          <div key={`${label}-${i}`} className="flex items-center gap-10">
            <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.08em] text-white/80 sm:text-2xl">
              {label}
            </span>
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_10px_rgb(255_43_69_/_0.8)]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
