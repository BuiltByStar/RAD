"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";

const lanes = [
  {
    label: "Roster",
    meta: "Player cards, roles, socials, and future PFP uploads.",
    href: "/roster",
    stat: "07"
  },
  {
    label: "Content",
    meta: "YouTube, articles, announcements, and media drops.",
    href: "/content",
    stat: "Media"
  },
  {
    label: "Community",
    meta: "Discord gateway and fan energy without extra clutter.",
    href: "https://discord.com/invite/radgg",
    stat: "RADGG"
  },
  {
    label: "Activations",
    meta: "Sponsor slots, campaigns, and brand contact paths.",
    href: "/partners",
    stat: "Open"
  }
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeWorldsPortal() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="relative overflow-hidden border-y border-white/10 bg-[#070707] py-12 sm:py-16">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(72%_54%_at_84%_18%,rgba(255,0,0,0.12),transparent_60%)]" />
      <Container size="xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff4040]">Explore</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5vw,5.3rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
              Explore RAD.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/66 sm:text-lg">
              A cleaner route into the important parts of the org: players, content, community, and business.
            </p>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="relative grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] sm:grid-cols-2">
              {lanes.map((system, index) => (
                <Link
                  key={system.label}
                  href={system.href}
                  className="group relative min-h-[170px] overflow-hidden border-white/10 p-5 transition hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000] sm:border-l sm:[&:nth-child(odd)]:border-l-0 sm:[&:nth-child(n+3)]:border-t"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-5 top-5 h-px scale-x-0 bg-[#ff0000] transition-transform duration-500 group-hover:scale-x-100"
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="absolute right-5 top-5 font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase leading-none text-white/[0.035]">
                    {system.stat}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                    {system.label}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/58">{system.meta}</p>
                  <span className="mt-5 inline-flex text-sm text-[#ff4040] transition group-hover:translate-x-1">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
