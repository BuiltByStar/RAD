"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/components/ui";

export type WheelMilestone = {
  date: string;
  title: string;
  description: string;
  kind: "history" | "future";
};

type MilestoneWheelProps = {
  items: WheelMilestone[];
};

const AUTO_DELAY_MS = 8200;
const WHEEL_EASE = [0.22, 1, 0.36, 1] as const;

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function getShortestOffset(index: number, active: number, length: number) {
  let offset = index - active;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

export function MilestoneWheel({ items }: MilestoneWheelProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeItem = items[active];
  const visibleItems = useMemo(
    () =>
      items
        .map((item, index) => ({
          item,
          index,
          offset: getShortestOffset(index, active, items.length)
        }))
        .filter(({ offset }) => Math.abs(offset) <= 2),
    [active, items]
  );

  const goTo = useCallback(
    (index: number) => {
      if (!items.length) return;
      setActive(wrapIndex(index, items.length));
    },
    [items.length]
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduced || paused || items.length < 2) return;

    const interval = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1, items.length));
    }, AUTO_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [items.length, paused, reduced]);

  if (!items.length || !activeItem) return null;

  return (
    <div
      className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/46 p-4 shadow-[0_34px_120px_-74px_rgba(255,0,0,0.68)] sm:p-6 lg:p-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_56%_at_50%_50%,rgba(255,0,0,0.22),transparent_64%),linear-gradient(180deg,rgba(255,0,0,0.12),transparent_28%,transparent_72%,rgba(255,0,0,0.1))]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:50px_50px]" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff0000] to-transparent" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff4040]">
            Milestone wheel
          </p>
          <motion.div
            key={activeItem.title}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: WHEEL_EASE }}
          >
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {activeItem.date}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,6.1rem)] font-extrabold uppercase leading-[0.8] text-white">
              {activeItem.title}
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/64 sm:text-base">
              {activeItem.description}
            </p>
          </motion.div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="grid h-11 w-11 place-items-center rounded-md border border-white/12 bg-white/[0.04] text-xl text-white/72 transition hover:border-[#ff0000]/42 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]"
              aria-label="Previous milestone"
            >
              <span aria-hidden>&uarr;</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="grid h-11 w-11 place-items-center rounded-md border border-white/12 bg-white/[0.04] text-xl text-white/72 transition hover:border-[#ff0000]/42 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]"
              aria-label="Next milestone"
            >
              <span aria-hidden>&darr;</span>
            </button>
          </div>
        </div>

        <div className="relative h-[470px] overflow-hidden [perspective:1200px] sm:h-[540px]">
          <div aria-hidden className="absolute left-[6.35rem] top-1/2 h-[82%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#ff0000]/70 to-transparent" />
          {visibleItems.map(({ item, index, offset }) => (
            <motion.button
              key={`${item.title}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "absolute left-0 right-0 mx-auto grid w-[min(100%,620px)] grid-cols-[76px_1fr] gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000] sm:grid-cols-[96px_1fr] sm:gap-4 sm:p-4",
                offset === 0
                  ? "z-30 border-[#ff0000]/45 bg-[#10090a]"
                  : "z-10 border-white/10 bg-white/[0.035] hover:border-[#ff0000]/28"
              )}
              animate={{
                y: `calc(190px + ${offset * 112}px)`,
                x: Math.abs(offset) * 10,
                rotateX: offset * -16,
                rotateZ: offset * 0.85,
                scale: offset === 0 ? 1 : 0.91 - Math.abs(offset) * 0.035,
                opacity: Math.abs(offset) > 1 ? 0.42 : offset === 0 ? 1 : 0.7,
                filter: offset === 0 ? "brightness(1)" : "brightness(0.72)"
              }}
              transition={reduced ? { duration: 0 } : { duration: 1.05, ease: WHEEL_EASE }}
            >
              <span
                className={cn(
                  "self-center rounded-md border px-2 py-2 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em]",
                  offset === 0
                    ? "border-[#ff0000]/45 bg-[#ff0000]/12 text-white"
                  : "border-white/10 bg-black/24 text-white/44"
                )}
              >
                {item.date}
              </span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5656]">
                  {item.kind === "future" ? "Next stage" : "Milestone"}
                </span>
                <span className="mt-1 block font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
                  {item.title}
                </span>
                <span
                  className={cn(
                    "mt-2 text-sm leading-relaxed text-white/58",
                    offset === 0 ? "block" : "hidden sm:block"
                  )}
                >
                  {item.description}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={`${item.title}-${index}-dot`}
            type="button"
            onClick={() => goTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]",
              index === active ? "w-10 bg-[#ff0000]" : "w-4 bg-white/24 hover:bg-white/52"
            )}
            aria-label={`Show ${item.title}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
