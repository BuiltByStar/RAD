"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui";
import { assets } from "@/lib/assets";

const lanes = [
  {
    label: "Roster",
    meta: "The competitive core, roles, and player profiles behind RAD.",
    href: "/roster",
    stat: "07"
  },
  {
    label: "Content",
    meta: "Announcements, videos, match stories, and the public voice of the org.",
    href: "/content",
    stat: "Media"
  },
  {
    label: "Partners",
    meta: "Sponsor lanes, activations, and brand conversations around the team.",
    href: "/partners",
    stat: "Open"
  },
  {
    label: "Shop",
    meta: "Supporter gear remains one click away without taking over the org path.",
    href: "/shop",
    stat: "Drop"
  }
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeWorldsPortal() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="rad-dot-surface relative overflow-hidden border-y border-white/10 bg-[#050102] py-14 sm:py-18">
      <Image
        src={assets.bgWhite}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.035] invert"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(72%_54%_at_84%_18%,rgba(220,20,60,0.16),transparent_60%)]" />
      <Container size="xl">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-12">
          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6f88]">RAD ecosystem</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.7rem,5vw,5.3rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
              Built around the org.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/66 sm:text-lg">
              From the opening, the site moves through the full RAD identity: competitive roster, media, partner lanes, and the supporter shop all tied together.
            </p>
            <div className="mt-7 overflow-hidden rounded-[2rem] border border-white/10 bg-black/32 p-5 shadow-[0_24px_70px_-52px_rgba(220,20,60,0.45)] backdrop-blur-xl">
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
            <div className="relative grid gap-4 sm:grid-cols-2">
              {lanes.map((system, index) => (
                <Link
                  key={system.label}
                  href={system.href}
                  className="group relative min-h-[180px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/32 p-5 shadow-[0_20px_70px_-58px_rgba(0,0,0,0.95)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dc143c]"
                >
                  <span
                    aria-hidden
                    className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#dc143c]/10 blur-2xl transition-opacity group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-5 h-1.5 origin-left scale-x-0 rounded-full bg-[#dc143c] transition-transform duration-500 group-hover:scale-x-100"
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
                  <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff6f88] transition group-hover:translate-x-1 group-hover:border-white/20 group-hover:text-white">
                    Enter lane →
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
