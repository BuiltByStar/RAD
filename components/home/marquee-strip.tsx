"use client";

import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  "RAD",
  "#GoWild",
  "Built around players",
  "Remembered through history",
  "Pressure-built",
  "teamrad.gg",
  "Competition",
  "Activations"
];

export function MarqueeStrip() {
  const reduced = useReducedMotion();
  const row = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-[#dc143c]/42 bg-[linear-gradient(90deg,#340106,#dc143c,#340106)] py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:py-3.5">
      <motion.div
        className="flex w-max items-center gap-12 whitespace-nowrap sm:gap-14"
        animate={reduced ? undefined : { x: ["0%", "-33.333%"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
      >
        {row.map((label, i) => (
          <div key={`${label}-${i}`} className="flex items-center gap-12 sm:gap-14">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-[0.12em] text-white sm:text-xl">
              {label}
            </span>
            <span
              aria-hidden
              className="inline-block h-1.5 w-8 shrink-0 rounded-full bg-black/45"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
