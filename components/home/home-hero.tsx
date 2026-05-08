"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { merchCollection, merchItems, stats } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();
  const featuredMerch = merchItems.find((item) => item.featured);

  return (
    <section className="rad-hero relative isolate min-h-[82svh] overflow-hidden border-b border-white/10 bg-[#030304] pt-20 sm:pt-24">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/assets/RadPlayerBannerPNG8.png"
        className="absolute inset-0 z-[-5] h-full w-full object-cover opacity-16 mix-blend-screen"
      >
        <source src="/assets/DiscordRadBannerAnimated_960.mp4" type="video/mp4" />
      </video>
      <Image
        src="/assets/RadPlayerBannerPNG8.png"
        alt=""
        fill
        sizes="100vw"
        className="z-[-6] object-cover object-center opacity-38"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-4] bg-[linear-gradient(90deg,#030304_0%,rgba(3,3,4,0.9)_46%,rgba(3,3,4,0.56)_100%)]"
      />
      <div
        aria-hidden
        className="absolute left-0 top-[24%] z-[-2] h-px w-[52vw] bg-[linear-gradient(90deg,#ff0000,transparent)] opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] opacity-[0.025] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:96px_96px]"
      />

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[calc(82svh-5rem)] gap-10 pb-12 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pb-16">
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58">
              <span className="h-px w-8 bg-[#ff0000]" />
              RAD Esports
            </div>

            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(4rem,11vw,10.5rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.015em] text-white sm:tracking-[-0.02em]">
              Go
              <span className="block bg-[linear-gradient(90deg,#fff_0%,#ff2b2b_45%,#ff0000_100%)] bg-clip-text text-transparent">
                Wild.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/72 sm:text-xl">
              Built for pressure, content, and the next stage of competition.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/roster" size="lg" className="min-w-[180px]">
                View roster
                <span aria-hidden>{">"}</span>
              </Button>
              <Button href="/about" variant="outline" size="lg" className="min-w-[180px]">
                About RAD
              </Button>
            </div>

            <dl className="mt-9 grid max-w-2xl gap-5 border-t border-white/10 pt-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l border-[#ff0000]/50 pl-4"
                >
                  <dt className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/12 bg-white/[0.035] shadow-[0_24px_74px_-48px_rgba(0,0,0,0.92)]">
              <div className="relative aspect-[16/10] min-h-[320px]">
                <Image
                  src="/assets/RadPlayerBannerPNG8.png"
                  alt="RAD Esports players and branding"
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.74))]" />
                <div className="absolute left-5 top-5 rounded-md border border-white/12 bg-black/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/68">
                  teamrad.gg
                </div>
                <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5555]">
                      {featuredMerch?.category ?? merchCollection.spotlight}
                    </p>
                    <p className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                      Championship identity. Clean execution.
                    </p>
                  </div>
                  <Button href="/merch" variant="secondary" size="sm">
                    {featuredMerch?.status ?? merchCollection.status}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
