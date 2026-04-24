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
    detail: "RAD establishes its identity early: red, black, white, and a standard that is supposed to travel."
  },
  {
    year: "2024",
    title: "Top tier",
    detail: "The organization enters international competition with a roster built for LAN pressure and deep runs."
  },
  {
    year: "AUG 2025",
    title: "World title",
    detail: "An inaugural global championship locks in proof on the biggest stage."
  },
  {
    year: "MAR 2026",
    title: "EMEA crown",
    detail: "The regional title confirms that the standard is repeatable, not accidental."
  }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeChampionsStrip() {
  const reduced = useReducedMotion();

  return (
    <section className="relative border-y border-white/10 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.005)),rgba(4,4,4,0.96)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_260px_at_15%_10%,rgba(255,43,69,0.12),transparent_60%)]" />

      <Container size="xl" className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-lg"
          >
            <Eyebrow>Proof stack</Eyebrow>
            <h2 className="mt-4 max-w-[11ch] font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl">
              Built fast. Proven early.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/62 sm:text-base">
              The brand reads better when the proof is obvious. This is the compact record of why RAD already carries weight beyond visual style.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)),rgba(5,5,5,0.78)] p-5 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]">
                <p className="font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-tight text-white">02</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/46">Titles secured</p>
              </div>
              <div className="border border-white/10 bg-black/55 p-5 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]">
                <p className="font-[family-name:var(--font-display)] text-5xl uppercase leading-none tracking-tight text-[color:var(--color-rad-hi)]">03</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/46">Years of growth</p>
              </div>
            </div>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-4"
          >
            {milestones.map((milestone, index) => (
              <motion.li
                key={milestone.year}
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: EASE }}
                className="group grid gap-4 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)),rgba(5,5,5,0.82)] p-5 transition-colors duration-300 hover:border-[color:var(--color-rad)]/36 md:grid-cols-[120px_1fr_180px] md:items-start md:p-6 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[color:var(--color-rad)]/28 bg-[color:var(--color-rad)]/10 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--color-rad-hi)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/44">
                    {milestone.year}
                  </p>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none tracking-tight text-white">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/62 sm:text-base">
                    {milestone.detail}
                  </p>
                </div>
                <div className="flex items-start justify-start md:justify-end">
                  <div className="border border-white/10 bg-black/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/46 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%,0_0)]">
                    {index === 0 ? "Foundation" : index === 1 ? "Breakthrough" : index === 2 ? "World stage" : "Regional repeat"}
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>

      {!reduced ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-rad)]/65 to-transparent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </section>
  );
}
