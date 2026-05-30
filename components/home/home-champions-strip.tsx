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
    <section className="rad-section rad-dot-surface relative overflow-hidden bg-black py-12 sm:py-18">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.52, ease: EASE }}
          >
            <p className="rad-kicker">Proof</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5vw,5.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
              Proof, not filler.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">
              Short, readable milestones tell the client what matters without bloating the page.
            </p>
            <Link href="/roster" className="rad-link mt-7">
              View team →
            </Link>
          </motion.div>

          <div className="rad-divide-y border border-white/10">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.title}
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.48, ease: EASE, delay: index * 0.04 }}
                className="group relative bg-[#030304] p-5 sm:grid sm:grid-cols-[120px_1fr_auto] sm:items-center sm:gap-6 sm:p-6"
              >
                <div className="absolute inset-y-0 left-0 w-px bg-[#dc143c]" />
                <p className="pl-3 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white sm:pl-0 sm:text-5xl">
                  {milestone.year}
                </p>
                <div className="mt-4 pl-3 sm:mt-0 sm:pl-0">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/58 sm:text-base">
                    {milestone.detail}
                  </p>
                </div>
                <span className="mt-5 hidden pr-1 text-[#ff6f88] transition-colors group-hover:text-white sm:mt-0 sm:inline">
                  →
                </span>
              </motion.article>
            ))}

            <motion.div
              initial={false}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48, ease: EASE, delay: 0.12 }}
              className="bg-[#030304] p-5 sm:p-6"
            >
              <p className="rad-kicker">Season structure</p>
              <div className="mt-4 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                {igniteSchedule.slice(0, 6).map((event) => (
                  <div key={event.stage} className="bg-[#030304] p-3">
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
