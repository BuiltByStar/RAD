"use client";

import Image from "next/image";
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
    <section id="experience" className="relative overflow-hidden border-y border-white/10 bg-[#070707] py-14 sm:py-20">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_56%_at_72%_30%,rgba(255,0,0,0.2),transparent_58%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,0,0,0.12),transparent)]" />
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff4040]">
              RAD map
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-white">
              More than the lineup.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/66 sm:text-lg">
              Competitive proof, roster identity, media, community, and partner paths should all feel like RAD.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
              {["Competition", "Media", "Discord", "Partners"].map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,0,0,0.12),rgba(255,255,255,0.035))] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] border border-[#ff0000]/20" />
            <div className="relative grid overflow-hidden rounded-[1.75rem] border border-white/12 bg-black/52 p-4 shadow-[0_34px_120px_rgba(0,0,0,0.66)] backdrop-blur-xl sm:grid-cols-2">
              <div className="relative min-h-[360px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b0b0d] sm:col-span-2">
                <Image
                  src="/assets/RadBanner1920_1080.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover opacity-76"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(0,0,0,0.76)_44%,rgba(0,0,0,0.18)_100%)]" />
                <motion.div
                  aria-hidden
                  className="absolute left-[-35%] top-[26%] h-24 w-[120%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.22),rgba(255,255,255,0.12),transparent)]"
                  animate={reduced ? undefined : { x: ["-10%", "20%", "-10%"], opacity: [0.25, 0.7, 0.25] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-6 sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff4040]">
                    RAD pressure map
                  </p>
                  <h3 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,5rem)] font-extrabold uppercase leading-[0.86] text-white">
                    Competition, content, community, activations.
                  </h3>
                </div>
              </div>

              {lanes.map((system, index) => (
                <Link
                  key={system.label}
                  href={system.href}
                  className="group relative min-h-[190px] overflow-hidden border-t border-white/10 bg-white/[0.025] p-5 transition hover:bg-[rgba(255,0,0,0.075)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff0000] sm:even:border-l"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-4 top-4 h-px scale-x-0 bg-gradient-to-r from-[#ff0000] to-transparent transition-transform duration-500 group-hover:scale-x-100"
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="absolute right-4 top-4 font-[family-name:var(--font-display)] text-6xl font-extrabold uppercase leading-none text-white/[0.04]">
                    {system.stat}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-9 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white">
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
