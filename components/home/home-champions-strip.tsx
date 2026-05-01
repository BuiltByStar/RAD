"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";
import { igniteSchedule } from "@/lib/site-data";

const milestones = [
  {
    year: "2023",
    title: "Founded",
    detail: "Identity locked early: red, black, white, and a name built to travel."
  },
  {
    year: "2025",
    title: "World title",
    detail: "Inaugural Marvel Rivals Ignite: Mid-Season World Champions."
  },
  {
    year: "2026",
    title: "EMEA crown",
    detail: "Season 6 EMEA PC Champions. Proof that the standard repeats."
  }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeChampionsStrip() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-24">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_52%_at_22%_40%,rgba(255,0,0,0.18),transparent_60%)]" />
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff4040]">
              Results stack
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-white">
              Wins that hit the brand.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/64">
              RAD's proof should feel immediate: titles, pressure, and a brand that can carry the next stage.
            </p>
            <Link
              href="/content"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.045] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:border-[#ff0000]/40 hover:text-white"
            >
              View content →
            </Link>
          </motion.div>

          <div className="grid gap-4">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.title}
                initial={reduced ? undefined : { opacity: 0, x: 22 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#ff0000]/34 hover:bg-white/[0.055] sm:grid sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6 sm:p-6"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[#ff0000] opacity-70" />
                <p className="font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase leading-none text-white">
                  {milestone.year}
                </p>
                <div className="mt-4 sm:mt-0">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base">
                    {milestone.detail}
                  </p>
                </div>
                <span className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#ff4040] transition group-hover:translate-x-1 sm:mt-0">
                  →
                </span>
              </motion.article>
            ))}

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.64, ease: EASE, delay: 0.18 }}
              className="relative overflow-hidden rounded-[1.25rem] border border-[#ff0000]/25 bg-[#ff0000]/10 p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b6b]">
                Season structure
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {igniteSchedule.slice(0, 6).map((event) => (
                  <div key={event.stage} className="rounded-xl border border-white/10 bg-black/32 p-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white">{event.stage}</p>
                    <p className="mt-1 text-xs text-white/48">{event.dates}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
