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

const AUTO_DELAY_MS = 10000;
const EASE = [0.22, 1, 0.36, 1] as const;

export function MilestoneWheel({ items }: MilestoneWheelProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeItem = items[active];
  const historyItems = useMemo(() => items.filter((item) => item.kind === "history"), [items]);
  const futureItems = useMemo(() => items.filter((item) => item.kind === "future"), [items]);

  const goTo = useCallback(
    (index: number) => {
      if (!items.length) return;
      setActive(index < 0 ? items.length - 1 : index % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    if (reduced || paused || items.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, AUTO_DELAY_MS);

    return () => window.clearInterval(intervalId);
  }, [items.length, paused, reduced]);

  if (!activeItem) return null;

  const renderTrack = (label: string, trackItems: WheelMilestone[]) => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[#ff5a5a]/60 to-transparent" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/34">{label}</p>
      </div>
      <div className="space-y-2">
        {trackItems.map((item) => {
          const index = items.findIndex((entry) => entry.date === item.date && entry.title === item.title);
          const isActive = index === active;

          return (
            <button
              key={`${item.date}-${item.title}`}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "grid w-full grid-cols-[88px_1fr] items-start gap-3 rounded-lg border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]",
                isActive
                  ? "border-[#ff7a7a]/28 bg-[linear-gradient(145deg,rgba(255,94,94,0.14),rgba(255,255,255,0.04))] text-white shadow-[0_14px_38px_-24px_rgba(255,70,70,0.72)]"
                  : "border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.018))] text-white/62 hover:border-white/16 hover:bg-white/[0.045]"
              )}
            >
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.18em]", isActive ? "text-[#ff6666]" : "text-white/35")}>
                {item.date}
              </span>
              <span className="min-w-0">
                <span className="block font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none text-white">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-white/48">
                  {isActive ? item.description : item.kind === "future" ? "Upcoming stage." : "Key org moment."}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#09090b]/92 p-4 shadow-[0_34px_120px_-74px_rgba(255,0,0,0.46)] sm:p-6 lg:p-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(62%_46%_at_78%_24%,rgba(255,72,72,0.16),transparent_58%),radial-gradient(52%_42%_at_18%_82%,rgba(160,32,32,0.12),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_22%,transparent_78%,rgba(255,90,90,0.06))]" />
      <div aria-hidden className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff4040]">Milestones</p>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/44">
              Guided track
            </span>
          </div>
          {renderTrack("Past", historyItems)}
          {futureItems.length ? renderTrack("Next", futureItems) : null}
        </div>

        <motion.div
          key={`${activeItem.date}-${activeItem.title}`}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative overflow-hidden rounded-[1.25rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,90,90,0.045),rgba(255,255,255,0.02))] p-5 sm:p-6"
        >
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6a6a] to-transparent" />
          <div aria-hidden className="absolute inset-y-5 left-5 w-px bg-gradient-to-b from-[#ff6a6a]/0 via-[#ff6a6a]/70 to-[#ff6a6a]/0" />
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#ff0000]/28 bg-[#ff0000]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78">
              {activeItem.kind === "future" ? "Next stage" : "Past milestone"}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">{activeItem.date}</span>
          </div>
          <h3 className="mt-5 pl-6 font-[family-name:var(--font-display)] text-[clamp(2.6rem,5vw,5.2rem)] font-extrabold uppercase leading-[0.86] text-white">
            {activeItem.title}
          </h3>
          <p className="mt-5 max-w-2xl pl-6 text-sm leading-relaxed text-white/66 sm:text-base">
            {activeItem.description}
          </p>

          <div className="mt-8 flex gap-3 pl-6">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="grid h-11 w-11 place-items-center rounded-md border border-white/12 bg-white/[0.04] text-xl text-white/72 transition hover:border-[#ff0000]/42 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]"
              aria-label="Previous milestone"
            >
              <span aria-hidden>&uarr;</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="grid h-11 w-11 place-items-center rounded-md border border-white/12 bg-white/[0.04] text-xl text-white/72 transition hover:border-[#ff0000]/42 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000]"
              aria-label="Next milestone"
            >
              <span aria-hidden>&darr;</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
