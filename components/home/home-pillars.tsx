"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";

const features = [
  {
    title: "Match center",
    kicker: "Competition",
    body: "Public proof, title history, schedule-ready structure, and clear links into the active roster."
  },
  {
    title: "Roster profiles",
    kicker: "Players",
    body: "PFP-first cards, socials, roles, and a layout ready for upgraded portraits without a redesign."
  },
  {
    title: "Media engine",
    kicker: "Content",
    body: "YouTube, articles, announcements, and future creator drops can live in one clean content layer."
  },
  {
    title: "Activation path",
    kicker: "Business",
    body: "No fake sponsors. Clear open partner slots, campaign language, and direct contact routing."
  }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomePillars() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#040405] py-12 sm:py-16">
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,0,0,0.16),transparent_34%,rgba(255,0,0,0.1)_74%,transparent)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff0000]/70 to-transparent" />
      <Container size="xl">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff4040]">
              Site features
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-white">
              Built like an org hub.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/64 sm:text-lg">
            This is the core public feature set an esports site needs now: roster, proof, content, community, and sponsor flow. The design makes those pieces feel alive instead of buried in generic cards.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              variants={{
                hidden: reduced ? {} : { opacity: 0, y: 22 },
                show: reduced ? {} : { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.62, ease: EASE }}
              className="group relative min-h-[260px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035] p-5 transition duration-500 hover:-translate-y-1 hover:border-[#ff0000]/36 hover:bg-white/[0.055]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff0000] via-white/30 to-transparent opacity-80" />
              <span className="absolute right-4 top-4 font-[family-name:var(--font-display)] text-7xl font-extrabold uppercase leading-none text-white/[0.045]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative z-10 flex h-full flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff4040]">
                  {feature.kicker}
                </p>
                <h3 className="mt-10 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.9] text-white">
                  {feature.title}
                </h3>
                <p className="mt-auto pt-6 text-sm leading-relaxed text-white/62">
                  {feature.body}
                </p>
              </div>
              <motion.span
                aria-hidden
                className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,0,0,0.18),transparent_66%)]"
                animate={reduced ? undefined : { scale: [1, 1.16, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
