"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { merchCollection, siteTagline, stats, teams } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();
  const team = teams[0];

  return (
    <section className="rad-dot-surface rad-hero relative isolate overflow-hidden border-b border-white/10 bg-[#050102] pt-20 sm:pt-24">
      <Image
        src={assets.bgRed}
        alt=""
        fill
        sizes="100vw"
        priority
        className="z-[-6] object-cover object-center opacity-[0.28]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-4] bg-[linear-gradient(90deg,#050102_0%,rgba(5,1,2,0.9)_38%,rgba(52,1,6,0.55)_100%)]"
      />
      <div
        aria-hidden
        className="absolute left-0 top-[18%] z-[-2] h-px w-[58vw] bg-[linear-gradient(90deg,#dc143c,transparent)] opacity-80"
      />
      <motion.div
        aria-hidden
        className="absolute right-[-12rem] top-[8%] z-[-1] h-[32rem] w-[32rem] rounded-full bg-[#dc143c]/14 blur-3xl"
        animate={reduced ? undefined : { scale: [0.94, 1.06, 0.94], opacity: [0.4, 0.68, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[min(760px,calc(100svh-5rem))] gap-8 pb-10 pt-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="min-w-0 max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-[#dc143c]/28 bg-[#dc143c]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff8fa0]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dc143c]" />
              Team + Shop first
            </p>

            <h1 className="mt-5 max-w-[9ch] font-[family-name:var(--font-display)] text-[clamp(3.6rem,8vw,7.2rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.045em] text-white">
              Go
              <span className="block bg-[linear-gradient(90deg,#fff_0%,#ff5b76_42%,#dc143c_100%)] bg-clip-text text-transparent">
                wild.
              </span>
            </h1>

            <p className="mt-5 max-w-[32rem] text-base leading-relaxed text-white/72 sm:text-lg">
              {siteTagline} Shop the drop, meet the team, and follow RAD without wading through generic esports clutter.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/shop" size="lg" className="min-w-[190px]">
                Shop the drop
              </Button>
              <Button href="/roster" variant="outline" size="lg" className="min-w-[190px]">
                View team
              </Button>
            </div>

            <dl className="mt-8 grid max-w-2xl gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.15rem] border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl"
                >
                  <dt className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
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
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <a
              href="/shop"
              className="group relative col-span-2 overflow-hidden rounded-[1.85rem] border border-white/12 bg-black/40 shadow-[0_26px_90px_-50px_rgba(220,20,60,0.6)] sm:col-span-1 sm:row-span-2"
            >
              <div className="relative min-h-[320px] sm:min-h-[420px]">
                <Image
                  src={assets.goWild}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover opacity-78 transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(5,1,2,0.88))]" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="rounded-full border border-[#dc143c]/32 bg-[#dc143c]/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/78">
                    Shop
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48">
                    {merchCollection.status}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff6f88]">
                    {merchCollection.title}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.88] text-white">
                    Pressure kit
                  </p>
                  <p className="mt-3 text-sm text-white/64">Jerseys, essentials, and supporter gear built around the RAD identity.</p>
                </div>
              </div>
            </a>

            <a
              href="/roster"
              className="group overflow-hidden rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_70px_-58px_rgba(0,0,0,0.95)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#dc143c]/35"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff6f88]">Team</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.9] text-white">
                {team.game}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/58">{team.status}</p>
              <span className="mt-5 inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/62 transition group-hover:text-white">
                Meet the lineup →
              </span>
            </a>

            <a
              href="/content"
              className="group overflow-hidden rounded-[1.45rem] border border-white/10 bg-black/32 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/18"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42">Updates</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-[0.92] text-white">
                Content lane
              </p>
              <span className="mt-5 inline-flex text-[10px] font-semibold uppercase tracking-[0.14em] text-white/52 transition group-hover:text-white">
                Latest drops →
              </span>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
