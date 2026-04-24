"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const ease = EASE_OUT_EXPO;

const statItems = [
  { label: "World Titles", value: "01" },
  { label: "Regional Titles", value: "01" },
  { label: "Live Titles", value: "01" }
];

function HeroConstruct() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, x: 28, scale: 0.98 }}
      animate={reduced ? undefined : { opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, ease, delay: 0.18 }}
      className="relative mx-auto aspect-[1.02/1] w-full max-w-[760px]"
    >
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008)),rgba(4,4,4,0.86)] [clip-path:polygon(0_0,calc(100%-26px)_0,100%_26px,100%_100%,26px_100%,0_calc(100%-26px))]" />
      <div className="absolute inset-[5%] rounded-[1.75rem] border border-white/8" />
      <div className="absolute inset-[10%] rounded-[1.6rem] border border-white/6" />

      <motion.div
        aria-hidden
        className="absolute left-[9%] top-[10%] h-2 w-[30%] rounded-full bg-[linear-gradient(90deg,rgba(255,43,69,0.9),rgba(255,255,255,0.12),transparent)] blur-[0.5px]"
        animate={reduced ? undefined : { scaleX: [0.84, 1.04, 0.9], opacity: [0.42, 0.88, 0.5] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[8%] bottom-[13%] h-2 w-[28%] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),rgba(255,43,69,0.86))] blur-[0.5px]"
        animate={reduced ? undefined : { scaleX: [0.9, 1.04, 0.88], opacity: [0.4, 0.82, 0.48] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <div className="absolute left-[12%] top-[12%] right-[12%] bottom-[14%] overflow-hidden border border-white/10 bg-black/55 [clip-path:polygon(0_0,calc(100%-20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%-20px))]">
        <motion.div
          initial={reduced ? undefined : { scale: 1.08 }}
          animate={reduced ? undefined : { scale: [1.08, 1.02, 1.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/assets/RadPlayerBannerPNG8.png"
            alt="RAD Esports players"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 42vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.72)_100%),linear-gradient(180deg,rgba(255,43,69,0.08),transparent_30%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(320px_180px_at_60%_70%,rgba(255,43,69,0.22),transparent_62%)] mix-blend-screen" />

        <motion.div
          aria-hidden
          className="absolute left-[4%] top-[10%] h-[68%] w-[24%] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,43,69,0.08),rgba(8,8,8,0.94))] [clip-path:polygon(18%_0,100%_0,82%_100%,0_100%)]"
          animate={reduced ? undefined : { y: [-6, 6, -6] }}
          transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute right-[4%] top-[18%] h-[58%] w-[12%] border border-white/10 bg-[linear-gradient(180deg,rgba(255,43,69,0.18),rgba(255,255,255,0.02),rgba(8,8,8,0.92))] [clip-path:polygon(0_0,82%_0,100%_100%,18%_100%)]"
          animate={reduced ? undefined : { y: [6, -6, 6] }}
          transition={{ duration: 9.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        <div className="absolute left-5 top-5 flex items-center gap-3 border border-white/10 bg-black/45 px-4 py-2 backdrop-blur-md [clip-path:polygon(0_0,calc(100%-12px)_0,100%_50%,calc(100%-12px)_100%,0_100%,0_0)]">
          <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--color-rad)] shadow-[0_0_10px_rgba(255,43,69,0.75)]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/62">
            Campaign surface
          </span>
        </div>

        <div className="absolute inset-x-6 bottom-6 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)),rgba(0,0,0,0.58)] p-4 backdrop-blur-md [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]">
              Featured division
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-tight text-white">
              Marvel Rivals
            </p>
            <p className="mt-3 max-w-[26ch] text-xs leading-relaxed text-white/66">
              The current front line proving the standard on world and regional stages.
            </p>
          </div>
          <div className="border border-white/10 bg-black/48 p-4 backdrop-blur-md [clip-path:polygon(14px_0,100%_0,100%_100%,0_100%,0_14px)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48">
              Current proof
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Real wins first, then design language. The site should feel as structured as the org is trying to become.
            </p>
          </div>
        </div>

        <div className="absolute right-5 top-[4.5rem] flex w-[170px] flex-col gap-2">
          <div className="border border-white/10 bg-black/46 px-3 py-2 backdrop-blur-md [clip-path:polygon(12px_0,100%_0,100%_100%,0_100%,0_12px)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
              Story layer
            </p>
            <p className="mt-2 text-xs leading-relaxed text-white/70">Built for pressure, content, and the next stage of competition.</p>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute left-[18%] bottom-[10%] h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.78),transparent_72%)] blur-2xl"
        animate={reduced ? undefined : { scale: [0.86, 1.18, 0.92], opacity: [0.42, 0.9, 0.5] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[calc(100svh-84px)] items-start overflow-hidden border-b border-white/8 bg-[#040404] py-10 sm:py-14 lg:min-h-[calc(100svh-120px)] lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_8%_18%,rgba(255,43,69,0.26),transparent_48%),radial-gradient(42%_36%_at_84%_30%,rgba(255,43,69,0.18),transparent_56%),linear-gradient(180deg,#060606_0%,#040404_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_49%,transparent_51%),linear-gradient(transparent_0%,rgba(255,255,255,0.015)_49%,transparent_51%)] bg-[size:88px_88px] opacity-40" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.22),transparent_72%)] blur-3xl"
        animate={reduced ? undefined : { x: [-10, 20, -10], y: [0, 14, 0], opacity: [0.48, 0.76, 0.52] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-14%] bottom-[4%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl"
        animate={reduced ? undefined : { x: [0, -18, 0], y: [10, -10, 10], opacity: [0.28, 0.48, 0.3] }}
        transition={{ duration: 13.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container size="xl" className="relative z-10 w-full">
        <div className="grid items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <div className="relative z-10 max-w-[620px]">
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.08 }}
              className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]"
            >
              <span className="inline-block h-px w-6 bg-[color:var(--color-rad)]" />
              RAD Esports
            </motion.div>

            <motion.h1
              initial={reduced ? undefined : { opacity: 0, y: 28 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.14 }}
              className="mt-7 max-w-[8ch] font-[family-name:var(--font-display)] text-[clamp(4.5rem,12vw,8.2rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em] text-white"
            >
              GO{" "}
              <span className="bg-[linear-gradient(180deg,#ff8b99_0%,#ff415a_36%,#ff2b45_70%,#ff7688_100%)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,43,69,0.24)]">
                WILD.
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.24 }}
              className="mt-6 max-w-[38rem] text-[17px] leading-[1.82] tracking-[-0.01em] text-white/74 sm:text-[19px]"
            >
              Built for pressure, content, and the next stage of competition. RAD blends competitive pedigree, identity, and media presence into one sharp public system.
            </motion.p>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3"
            >
              {statItems.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01)),rgba(5,5,5,0.72)] px-4 py-4 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_14px,100%_100%,14px_100%,0_calc(100%-14px))]"
                >
                  <p className="font-[family-name:var(--font-display)] text-3xl uppercase leading-none tracking-tight text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.38 }}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/roster" size="lg" className="min-w-[220px] justify-center">
                View roster
              </Button>
              <Button href="/about" variant="outline" size="lg" className="min-w-[220px] justify-center">
                About RAD
              </Button>
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ duration: 0.55, ease, delay: 0.48 }}
              className="mt-7 flex items-center gap-6"
            >
              <Link
                href="/content"
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-rad-hi)] transition-colors hover:text-white"
              >
                Latest content <span aria-hidden="true">→</span>
              </Link>
              <span className="h-px w-20 bg-gradient-to-r from-[color:var(--color-rad)]/85 to-transparent" />
            </motion.div>
          </div>

          <HeroConstruct />
        </div>
      </Container>
    </section>
  );
}
