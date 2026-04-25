"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";

const milestones = [
  {
    year: "2023",
    title: "Founded",
    detail: "RAD starts with a clear red, black, and white identity built to travel."
  },
  {
    year: "2025",
    title: "World title",
    detail: "The inaugural Marvel Rivals Ignite: Mid-Season World Championship becomes real proof."
  },
  {
    year: "2026",
    title: "EMEA crown",
    detail: "The regional title proves the standard can repeat under pressure."
  }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeChampionsStrip() {
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-black py-20 sm:py-24">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-rad)]">
              Proof
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.96] tracking-normal text-white sm:text-6xl">
              The results are already visible.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/62">
              The site should not have to over-explain RAD. The wins give the brand a foundation, and the interface should make that easy to scan.
            </p>
          </motion.div>

          <ol className="grid gap-4">
            {milestones.map((milestone, index) => (
              <motion.li
                key={milestone.title}
                initial={reduced ? undefined : { opacity: 0, y: 18 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
                className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[110px_1fr] sm:p-6"
              >
                <div>
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-[color:var(--color-rad)]">
                    {milestone.year}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/38">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62 sm:text-base">
                    {milestone.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
