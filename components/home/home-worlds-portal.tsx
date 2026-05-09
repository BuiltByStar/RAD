"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";
import { assets } from "@/lib/assets";

const lanes = [
  {
    label: "Roster",
    meta: "Player-first cards with room for real PFPs and social links.",
    href: "/roster",
    stat: "07"
  },
  {
    label: "Content",
    meta: "Announcements, videos, and the public story around the org.",
    href: "/content",
    stat: "Media"
  },
  {
    label: "Community",
    meta: "The clean channel for fan connection and community direction.",
    href: "/contact",
    stat: "RADGG"
  },
  {
    label: "Partners",
    meta: "Open sponsor lanes, activations, and brand conversations.",
    href: "/partners",
    stat: "Open"
  }
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeWorldsPortal() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="relative overflow-hidden border-y border-white/10 bg-[#050102] py-14 sm:py-18">
      <Image
        src={assets.bgWhite}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.035] invert"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(72%_54%_at_84%_18%,rgba(220,20,60,0.16),transparent_60%)]" />
      <Container size="xl">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-12">
          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6f88]">Site system</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5vw,5.3rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
              Simple. Fast. Useful.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/66 sm:text-lg">
              The site should get people to the roster, content, community, and partner path without burying them in heavy chrome.
            </p>
            <div className="mt-7 overflow-hidden rounded-[1rem] border border-white/10 bg-black/42 p-4">
              <Image
                src={assets.goWild}
                alt="Go Wild"
                width={800}
                height={220}
                className="h-auto w-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="relative"
          >
            <div className="relative grid overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/40 sm:grid-cols-2">
              {lanes.map((system, index) => (
                <Link
                  key={system.label}
                  href={system.href}
                  className="group relative min-h-[180px] overflow-hidden border-white/10 p-5 transition hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c] sm:border-l sm:[&:nth-child(odd)]:border-l-0 sm:[&:nth-child(n+3)]:border-t"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-5 top-5 h-px scale-x-0 bg-[#dc143c] transition-transform duration-500 group-hover:scale-x-100"
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="absolute right-5 top-5 font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase leading-none text-white/[0.04]">
                    {system.stat}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                    {system.label}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/58">{system.meta}</p>
                  <span className="mt-5 inline-flex text-sm text-[#ff6f88] transition group-hover:translate-x-1">
                    Open page →
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
