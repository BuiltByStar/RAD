"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { discordInviteUrl, siteTagline, stats } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden border-b border-white/10 bg-[#030304]">
      <div aria-hidden className="rad-hero-grid" />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(52%_48%_at_72%_38%,rgba(220,20,60,0.16),transparent_68%)]"
      />
      <Image
        src={assets.goWild}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right opacity-[0.14] [mask-image:linear-gradient(90deg,#000_0%,transparent_72%)]"
      />

      <Container size="xl" className="relative z-10 flex flex-1 flex-col justify-end pb-14 pt-24 sm:pb-16 sm:pt-28">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)] lg:gap-16">
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="max-w-3xl"
          >
            <p className="rad-hero-eyebrow">#GoWild</p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/38">The</p>
            <h1 className="rad-hero-title">RAD</h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/68 sm:text-lg">
              {siteTagline}{" "}
              <span className="text-[#ff6f88]">Welcome to the wild.</span>
            </p>

            <div className="rad-frame-y mt-8 grid gap-px bg-white/10 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-[#030304] px-4 py-4">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="hidden justify-self-end lg:block"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-8 bg-[radial-gradient(circle,rgba(220,20,60,0.28),transparent_68%)]"
              />
              <Image
                src={assets.logoMark}
                alt=""
                width={280}
                height={280}
                className="relative h-auto w-[220px] opacity-90 xl:w-[280px]"
                priority
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.14 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center lg:absolute lg:bottom-14 lg:right-8 lg:mt-0 xl:right-12"
        >
          <Button href="/roster" size="lg" className="min-w-[180px]">
            View roster
          </Button>
          <Button href={discordInviteUrl} variant="outline" size="lg" className="min-w-[180px]">
            Join Discord
          </Button>
        </motion.div>

        <a
          href="#who-we-are"
          className="rad-hero-eyebrow mt-14 flex flex-col items-center gap-2 self-center text-white/32 transition-colors hover:text-white/55 lg:mt-20"
        >
          Explore
          <span aria-hidden className="block h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </a>
      </Container>
    </section>
  );
}
