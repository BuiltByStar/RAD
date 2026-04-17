"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container, Eyebrow } from "@/components/ui";

type Milestone = {
  year: string;
  title: string;
  detail: string;
};

const milestones: Milestone[] = [
  {
    year: "2023",
    title: "Founded",
    detail: "RAD establishes its identity — red, black, white, and relentless."
  },
  {
    year: "2024",
    title: "Marvel Rivals",
    detail: "Official entry into competitive Marvel Rivals with a world-class starting lineup."
  },
  {
    year: "Aug 2025",
    title: "Ignite World Champions",
    detail: "Inaugural Marvel Rivals Ignite: Mid-Season World Championship secured."
  },
  {
    year: "Mar 2026",
    title: "EMEA Title",
    detail: "Season 6: EMEA PC champions. Back-to-back titles locked in."
  }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeChampionsStrip() {
  const reduced = useReducedMotion();

  return (
    <section className="relative border-y border-white/10 bg-gradient-to-b from-black/60 via-black to-black/60 py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-rad)]/60 to-transparent"
      />
      <Container size="xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-md"
          >
            <Eyebrow>RAD / Record</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase leading-tight tracking-tight sm:text-5xl">
              Built in <span className="text-[color:var(--color-rad)]">three years.</span>{" "}
              Winning at the top.
            </h2>
            <p className="mt-4 text-sm text-white/60 sm:text-base">
              We didn&apos;t wait for an invitation. RAD broke in, took the belt, and now
              sets the tempo of the Marvel Rivals scene.
            </p>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } }
            }}
            className="grid w-full flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-4"
          >
            {milestones.map((m, i) => (
              <motion.li
                key={m.year}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.7, ease: EASE }}
                className="group relative flex flex-col gap-2 border-l border-white/10 pl-5 transition-colors hover:border-[color:var(--color-rad)]/60"
              >
                <span className="absolute -left-[4px] top-1 inline-flex h-2 w-2">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-rad)]/60"
                    animate={reduced ? undefined : { scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_12px_rgb(255_43_69_/_0.8)]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  {String(i + 1).padStart(2, "0")} / {m.year}
                </span>
                <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-tight">
                  {m.title}
                </span>
                <span className="text-xs text-white/60">{m.detail}</span>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
