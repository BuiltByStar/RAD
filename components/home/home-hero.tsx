"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { JerseyToggleViewer } from "@/components/merch/jersey-toggle-viewer";
import { Button, Container } from "@/components/ui";
import { merchCollection, merchItems, stats } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();
  const featuredMerch = merchItems.find((item) => item.featured);

  return (
    <section className="rad-hero relative isolate min-h-[88svh] overflow-hidden border-b border-white/10 bg-[#030304] pt-10 sm:pt-14">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/RadPlayerBannerPNG8.png"
        className="absolute inset-0 z-[-5] h-full w-full object-cover opacity-30 mix-blend-screen"
      >
        <source src="/assets/DiscordRadBannerAnimated_960.mp4" type="video/mp4" />
      </video>
      <Image
        src="/assets/RadPlayerBannerPNG8.png"
        alt=""
        fill
        sizes="100vw"
        className="z-[-6] object-cover object-center opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-4] bg-[radial-gradient(70%_50%_at_62%_35%,rgba(255,0,0,0.38),transparent_62%),linear-gradient(90deg,#030304_0%,rgba(3,3,4,0.86)_42%,rgba(3,3,4,0.58)_70%,#030304_100%)]"
      />
      <motion.div
        aria-hidden
        className="absolute -right-[24%] top-[10%] z-[-3] h-[36rem] w-[36rem] rounded-full border border-[#ff0000]/24"
        animate={reduced ? undefined : { rotate: [0, 360], scale: [1, 1.06, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[-20%] top-[16%] z-[-2] h-20 w-[140%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.24),rgba(255,255,255,0.12),transparent)] blur-sm"
        animate={reduced ? undefined : { x: ["-12%", "12%", "-12%"], opacity: [0.2, 0.58, 0.2] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[8%] left-[-18%] z-[-2] h-32 w-[88%] rotate-[7deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.18),transparent)] blur-md"
        animate={reduced ? undefined : { x: ["-8%", "18%", "-8%"], opacity: [0.1, 0.45, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[calc(88svh-4rem)] gap-8 pb-12 pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-16 lg:pt-14">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 28 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-[#ff0000]/26 bg-black/48 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#ff0000] shadow-[0_0_20px_rgba(255,0,0,0.9)]" />
              RAD Esports // wild pressure live
            </div>

            <div className="mt-5 flex max-w-2xl flex-wrap gap-2">
              {["World Champions", "EMEA Champions", "Drop 01 incoming"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/62"
                >
                  {item}
                </span>
              ))}
            </div>

            <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(4.1rem,11vw,11.5rem)] font-extrabold uppercase leading-[0.76] tracking-[-0.035em] text-white">
              Go
              <span className="block bg-[linear-gradient(90deg,#fff_0%,#ff2b2b_45%,#ff0000_100%)] bg-clip-text text-transparent">
                Wild.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/72 sm:text-xl">
              RAD brings championship pressure, sharp content, and a first merch drop built to carry that identity cleanly.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/roster" size="lg" className="min-w-[180px]">
                View roster
                <span aria-hidden>{">"}</span>
              </Button>
              <Button href="/merch" variant="outline" size="lg" className="min-w-[180px]">
                View merch
              </Button>
              <Button href="/content" variant="ghost" size="lg" className="min-w-[180px]">
                Watch content
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] px-4 py-4 backdrop-blur"
                >
                  <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, x: 28, rotate: 1.2 }}
            animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.22),transparent_60%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/14 bg-black/58 p-4 shadow-[0_40px_140px_rgba(0,0,0,0.72)] backdrop-blur-xl">
              <motion.span
                aria-hidden
                className="absolute left-[-45%] top-10 z-20 h-px w-[90%] bg-gradient-to-r from-transparent via-[#ff0000] to-transparent"
                animate={reduced ? undefined : { x: ["0%", "210%"], opacity: [0, 0.9, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.5, ease: "easeOut" }}
              />

              {featuredMerch?.frontImage && featuredMerch.backImage ? (
                <JerseyToggleViewer
                  frontImage={featuredMerch.frontImage}
                  backImage={featuredMerch.backImage}
                  name={featuredMerch.name}
                  status={featuredMerch.status}
                  compact
                />
              ) : null}
              <div className="mt-4 rounded-[1.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff5f5f]">
                      {featuredMerch?.category ?? merchCollection.spotlight}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
                      {featuredMerch?.name ?? merchCollection.title}
                    </p>
                  </div>
                  <span className="rounded-full border border-[#ff0000]/18 bg-[#ff0000]/8 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/66">
                    {featuredMerch?.status ?? merchCollection.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
