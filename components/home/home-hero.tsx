"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { siteTagline, stats } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="rad-dot-surface rad-hero relative isolate min-h-[82svh] overflow-hidden border-b border-white/10 bg-[#050102] pt-20 sm:pt-24">
      <Image
        src={assets.bgRed}
        alt=""
        fill
        sizes="100vw"
        priority
        className="z-[-6] object-cover object-center opacity-26"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-4] bg-[linear-gradient(90deg,#050102_0%,rgba(5,1,2,0.92)_48%,rgba(52,1,6,0.64)_100%)]"
      />
      <div
        aria-hidden
        className="absolute left-0 top-[24%] z-[-2] h-px w-[56vw] bg-[linear-gradient(90deg,#dc143c,transparent)] opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.88)_0.7px,transparent_0.82px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_22%,transparent_84%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(220,20,60,0.95)_0.55px,transparent_0.72px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] opacity-[0.05] [background-image:linear-gradient(115deg,transparent_0%,transparent_44%,rgba(255,255,255,0.72)_49%,transparent_54%,transparent_100%)] [background-size:100%_100%] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_76%)]"
      />
      <motion.div
        aria-hidden
        className="absolute right-[-14rem] top-[14%] z-[-1] h-[34rem] w-[34rem] rounded-full bg-[#dc143c]/16 blur-3xl"
        animate={reduced ? undefined : { scale: [0.94, 1.08, 0.94], opacity: [0.45, 0.72, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[calc(74svh-5rem)] gap-8 pb-10 pt-6 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:pb-12">
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="min-w-0 max-w-[calc(100vw-3rem)] sm:max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-[#050102]/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/58 backdrop-blur-sm">
              <span className="h-px w-8 bg-[#dc143c]" />
              RAD Esports
            </div>

            <h1 className="mt-4 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3.05rem,9.2vw,7.05rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.025em] text-white">
              Built
              <span className="block">around</span>
              <span className="block bg-[linear-gradient(90deg,#fff_0%,#ff5b76_42%,#dc143c_100%)] bg-clip-text text-transparent">
                players.
              </span>
            </h1>

            <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-white/72 sm:max-w-2xl sm:text-lg">
              {siteTagline} Remembered through history. Welcome to the wild.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/roster" size="lg" className="min-w-[180px]">
                View roster
                <span aria-hidden>{">"}</span>
              </Button>
              <Button href="/about" variant="outline" size="lg" className="min-w-[180px]">
                About RAD
              </Button>
            </div>

            <dl className="mt-7 grid max-w-2xl gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl"
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
            <div className="relative overflow-hidden rounded-[2.15rem] border border-white/12 bg-black/38 shadow-[0_26px_100px_-48px_rgba(0,0,0,0.95)] backdrop-blur-xl">
              <div className="relative aspect-[16/11] min-h-[360px]">
                <Image
                  src={assets.brandBoard}
                  alt="RAD brand mood board"
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover opacity-72"
                />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.72),rgba(0,0,0,0.2)_48%,rgba(52,1,6,0.68))]" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/12 bg-black/34 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/68 backdrop-blur-xl">
                    teamrad.gg
                  </span>
                  <span className="rounded-full border border-[#dc143c]/30 bg-[#dc143c]/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/72 backdrop-blur-xl">
                    #GoWild
                  </span>
                </div>
                <motion.div
                  aria-hidden
                  className="absolute right-[-12%] top-[10%] h-[78%] w-[56%] rounded-full bg-[#dc143c]/22 blur-3xl"
                  animate={reduced ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.22, 0.38, 0.22] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  aria-hidden
                  className="absolute left-[-18%] top-[42%] h-24 w-[70%] rounded-full bg-white/[0.055] blur-2xl"
                  animate={reduced ? undefined : { x: ["-8%", "12%", "-8%"], opacity: [0.18, 0.32, 0.18] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-x-5 bottom-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff6f88]">
                      Brand system
                    </p>
                    <p className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-5xl">
                      Remembered through history.
                    </p>
                  </div>
                  <Image
                    src={assets.logoMark}
                    alt=""
                    width={180}
                    height={220}
                    className="hidden h-[110px] w-auto object-contain drop-shadow-[0_22px_50px_rgba(220,20,60,0.24)] sm:block"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
