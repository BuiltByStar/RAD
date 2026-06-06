"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

const EASE = [0.22, 1, 0.36, 1] as const;

function yearFromDate(date: string): string {
  const match = date.match(/\b(20\d{2})\b/);
  if (match) return match[1];
  const trimmed = date.trim();
  if (/^\d{4}$/.test(trimmed)) return trimmed;
  return trimmed.split(/\s+/).pop() ?? trimmed;
}

export function MilestoneWheel({ items }: MilestoneWheelProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem = items[active];
  const historyItems = useMemo(() => items.filter((item) => item.kind === "history"), [items]);
  const futureItems = useMemo(() => items.filter((item) => item.kind === "future"), [items]);

  const goTo = useCallback(
    (index: number) => {
      if (!items.length) return;
      const next = index < 0 ? items.length - 1 : index % items.length;
      setActive(next);
      rowRefs.current[next]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    },
    [items.length, reduced]
  );

  useEffect(() => {
    if (reduced || items.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );

    rowRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [items, reduced]);

  if (!activeItem) return null;

  const stickyYear = yearFromDate(activeItem.date);
  const isNumericYear = /^\d{4}$/.test(stickyYear);

  const renderTimeline = (label: string | null, trackItems: WheelMilestone[]) => (
    <div className="space-y-1">
      {label ? (
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-600">{label}</p>
      ) : null}
      {trackItems.map((item) => {
        const index = items.findIndex((entry) => entry.date === item.date && entry.title === item.title);
        const isActive = index === active;
        const isCompleted = index <= active;

        return (
          <button
            key={`${item.date}-${item.title}`}
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            type="button"
            data-index={index}
            onClick={() => goTo(index)}
            className={cn(
              "group relative w-full py-5 pl-8 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blood)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              isActive ? "text-white" : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            {index > 0 ? (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[5px] top-0 h-1/2 w-px -translate-x-1/2 bg-neutral-900 transition-colors",
                  isCompleted && "bg-[var(--color-blood)]"
                )}
              />
            ) : null}
            <span
              aria-hidden
              className={cn(
                "absolute bottom-0 left-[5px] top-1/2 w-px -translate-x-1/2 bg-neutral-900 transition-colors",
                index < active && "bg-[var(--color-blood)]"
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute left-0 top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 transition",
                isActive
                  ? "border-[var(--color-blood)] bg-[var(--color-blood)] shadow-[0_0_12px_rgba(229,6,47,0.55)]"
                  : isCompleted
                    ? "border-[var(--color-blood)] bg-[var(--color-blood)]"
                    : "border-neutral-800 bg-black group-hover:border-neutral-600"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.18em]",
                isCompleted ? "text-[var(--color-blood)]" : "text-neutral-600"
              )}
            >
              {item.date}
            </span>
            <span className="mt-1 block font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none sm:text-2xl">
              {item.title}
            </span>
            {isActive ? (
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-3 text-sm leading-relaxed text-neutral-400 sm:text-base sm:leading-[1.7]"
              >
                {item.description}
              </motion.p>
            ) : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(7rem,9.5rem)_1fr] md:gap-10 lg:gap-14 xl:grid-cols-[11rem_1fr]">
      <div className="relative z-10 min-w-0 overflow-hidden md:sticky md:top-[5.25rem] md:self-start md:bg-black md:pb-6 md:pr-6 lg:pr-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-600">Timeline</p>
        <motion.p
          key={stickyYear}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={cn(
            "mt-2 max-w-full whitespace-nowrap font-[family-name:var(--font-display)] font-extrabold leading-none text-[var(--color-blood)]",
            isNumericYear
              ? "tabular-nums text-[clamp(2.35rem,5.4vw,4rem)]"
              : "overflow-hidden text-ellipsis text-[clamp(1.5rem,3vw,2.15rem)]"
          )}
          aria-live="polite"
        >
          {stickyYear}
        </motion.p>
        <motion.div
          key={`${activeItem.date}-${activeItem.title}`}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-neutral-600">{activeItem.date}</p>
          <p className="mt-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase leading-tight text-white [hyphens:auto] [word-break:break-word]">
            {activeItem.title}
          </p>
        </motion.div>
      </div>

      <div className="relative min-w-0 border-t border-neutral-900 pt-2 md:border-t-0 md:pt-0">
        <div aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-neutral-900" />
        {renderTimeline("History", historyItems)}
        {futureItems.length ? (
          <div className="mt-20 border-t border-neutral-700 pt-10 sm:mt-24 sm:pt-12">
            <div aria-hidden className="mb-5 h-px w-12 bg-[var(--color-blood)]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-blood)]">
              Looking forward
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-4xl">
              Season ahead
            </h3>
            <div className="mt-8">{renderTimeline(null, futureItems)}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
