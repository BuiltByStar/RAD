"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  "RAD",
  "#GoWild",
  "Identity",
  "Pressure-built",
  "Untamed",
  "teamrad.gg",
  "Competition",
  "Activations"
];

export function MarqueeStrip() {
  const reduced = useReducedMotion();
  const row = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01)),black] py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:py-3.5">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,43,69,0.08)_50%,transparent_100%)]" />
      <motion.div
        className="flex w-max items-center gap-12 whitespace-nowrap sm:gap-14"
        animate={reduced ? undefined : { x: ["0%", "-33.333%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {row.map((label, i) => (
          <div key={`${label}-${i}`} className="flex items-center gap-12 sm:gap-14">
            <span className="font-[family-name:var(--font-display)] text-lg font-medium uppercase tracking-[0.16em] text-white/54 sm:text-xl">
              {label}
            </span>
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-rad)]/65"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
