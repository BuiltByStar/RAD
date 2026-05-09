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
    detail: "A championship result that gave the RAD identity real competitive weight."
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
    <section className="relative overflow-hidden bg-black py-12 sm:py-18">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_52%_at_22%_40%,rgba(220,20,60,0.11),transparent_60%)]" />
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6f88]">Proof</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5vw,5.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
              Proof, not filler.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/64">
              Short, readable milestones tell the client what matters without bloating the page.
            </p>
            <Link
              href="/content"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.08] hover:text-white"
            >
              View content →
            </Link>
          </motion.div>

          <div className="grid gap-4">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.title}
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_70px_-58px_rgba(0,0,0,0.95)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] sm:grid sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-6 sm:p-6"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[#dc143c] opacity-70" />
                <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white sm:text-5xl">
                  {milestone.year}
                </p>
                <div className="mt-4 sm:mt-0">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base">
                    {milestone.detail}
                  </p>
                </div>
                <span className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#ff6f88] transition group-hover:translate-x-1 group-hover:border-white/20 sm:mt-0">
                  →
                </span>
              </motion.article>
            ))}

            <motion.div
              initial={false}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.64, ease: EASE, delay: 0.18 }}
              className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_70px_-58px_rgba(0,0,0,0.95)] backdrop-blur-xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff6b6b]">
                Season structure
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {igniteSchedule.slice(0, 6).map((event) => (
                    <div key={event.stage} className="rounded-[1.05rem] border border-white/10 bg-black/28 p-3">
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
