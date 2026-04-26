"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate min-h-[84svh] overflow-hidden border-b border-white/10 bg-black pt-12 sm:pt-16">
      <Image
        src="/assets/RadBanner1920_1080.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="z-[-4] object-cover object-center opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-3] bg-[radial-gradient(80%_65%_at_50%_26%,rgba(167,79,255,0.32),transparent_64%),linear-gradient(180deg,rgba(5,5,8,0.75)_0%,rgba(5,5,8,0.95)_66%,#050505_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-2] bg-[linear-gradient(90deg,rgba(5,5,8,0.95)_0%,rgba(5,5,8,0.72)_45%,rgba(5,5,8,0.9)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:60px_60px]"
      />

      <Container size="xl" className="relative z-10">
        <div className="pb-14 pt-24 sm:pb-20 sm:pt-32">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid gap-10"
          >
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/58">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_8px_rgba(255,43,69,0.85)]" />
              EST. 2023
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-white/36">The</p>
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(4.8rem,16vw,14rem)] font-extrabold uppercase leading-[0.78] tracking-tight text-white">
                OUTCASTS
              </h1>
            </div>

            <div className="grid gap-7 pt-3 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-xl text-sm leading-relaxed text-white/62 sm:text-base">
                Multi-program esports organization built around brand, pressure, and repeatable winning systems.
                Current competitive focus: Marvel Rivals.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/roster"
                  className="inline-flex h-12 items-center justify-center border border-white bg-white px-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  View rosters
                  <span aria-hidden className="ml-2">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center border border-white/20 bg-black/45 px-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
