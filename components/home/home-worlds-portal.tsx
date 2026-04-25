"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";

const systems = [
  {
    label: "Core",
    meta: "Identity, culture, and the RAD standard.",
    href: "/about"
  },
  {
    label: "Vanguard",
    meta: "Competitive roster and role structure.",
    href: "/roster"
  },
  {
    label: "Media",
    meta: "Stories, video, and creator visibility.",
    href: "/content"
  },
  {
    label: "Alliances",
    meta: "Partnerships, campaigns, and activations.",
    href: "/partners"
  }
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeWorldsPortal() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="relative border-y border-white/10 bg-[#070707] py-20 sm:py-24">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="max-w-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-rad)]">
              Operating system
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.96] tracking-normal text-white sm:text-6xl">
              One org. Four clear lanes.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/62 sm:text-lg">
              RAD should feel easy to understand at a glance: what the org stands for, who competes, where the content lives, and how brands can work with it.
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="relative min-h-[240px] overflow-hidden rounded-lg border border-white/12 bg-black sm:col-span-2">
              <Image
                src="/assets/RadBanner1920_1080.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover opacity-62"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/25" />
              <div className="relative z-10 flex h-full min-h-[240px] flex-col justify-end p-6 sm:p-8">
                <Image
                  src="/assets/RadNewLogoWordmarkWhite.png"
                  alt="RAD"
                  width={220}
                  height={58}
                  className="h-auto w-[180px] sm:w-[220px]"
                />
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  A simple public structure for competition, creative output, community, and future growth.
                </p>
              </div>
            </div>

            {systems.map((system, index) => (
              <Link
                key={system.label}
                href={system.href}
                className="group rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-0.5 hover:border-[color:var(--color-rad)]/45 hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[color:var(--color-rad)] transition group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <h3 className="mt-8 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                  {system.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/58">{system.meta}</p>
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
