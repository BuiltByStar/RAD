"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const ease = EASE_OUT_EXPO;

function HeroConstruct() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.2 }}
      className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center lg:max-w-none"
    >
      <div
        aria-hidden
        className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,43,69,0.15)_0%,transparent_60%)]"
      />

      <div className="relative z-10 flex h-[280px] w-[280px] items-center justify-center rounded-full border border-white/10 bg-[#050505]/60 backdrop-blur-xl shadow-2xl sm:h-[340px] sm:w-[340px]">
        <Image
          src="/assets/RadNewLogoWordmarkWhite.png"
          alt="RAD Esports"
          width={400}
          height={120}
          className="w-[180px] object-contain drop-shadow-md sm:w-[220px]"
        />
        <div className="absolute -bottom-4 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(255,43,69,0.2),rgba(10,10,10,0.8))] px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(255,43,69,0.3)] backdrop-blur-md">
          #GoWild
        </div>
      </div>

      <motion.div
        className="absolute inset-[10%] rounded-full border border-white/5"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[5%] rounded-full border border-[color:var(--color-rad)]/10 border-t-[color:var(--color-rad)]/40"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[calc(100svh-72px)] items-center overflow-hidden border-b border-white/8 bg-[linear-gradient(180deg,#040404_0%,#050505_100%)] py-14 sm:py-16 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_18%_18%,rgba(255,43,69,0.18),transparent_52%),radial-gradient(48%_38%_at_78%_30%,rgba(255,43,69,0.14),transparent_56%),radial-gradient(46%_35%_at_50%_105%,rgba(255,255,255,0.05),transparent_60%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-18%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.28),transparent_72%)] blur-3xl"
        animate={reduced ? undefined : { x: [-10, 18, -10], y: [0, 8, 0], opacity: [0.58, 0.82, 0.62] }}
        transition={{ duration: 12.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_72%)] blur-3xl"
        animate={reduced ? undefined : { x: [0, -14, 0], y: [6, -8, 6], opacity: [0.34, 0.5, 0.34] }}
        transition={{ duration: 13.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[18%] h-5 w-[45%] rotate-[-16deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.36),rgba(255,255,255,0.06),transparent)] blur-sm"
        animate={reduced ? undefined : { x: [-8, 12, -8] }}
        transition={{ duration: 12.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] bottom-[18%] h-4 w-[42%] rotate-[-18deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.28),rgba(255,255,255,0.05),transparent)] blur-sm"
        animate={reduced ? undefined : { x: [8, -12, 8] }}
        transition={{ duration: 13.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container size="xl" className="relative z-10 w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.98fr)] lg:gap-14">
          <div className="relative z-10 max-w-[640px]">
            <motion.h1
              initial={reduced ? undefined : { opacity: 0, y: 22 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              className="max-w-[9ch] font-[family-name:var(--font-display)] text-[clamp(4rem,11vw,7.75rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white"
            >
              GO{" "}
              <span className="relative inline-block bg-[linear-gradient(180deg,#ff5f74_0%,#ff2b45_52%,#ff8a98_100%)] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(255,43,69,0.32)]">
                WILD.
              </span>
            </motion.h1>

            <motion.p
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.2 }}
              className="mt-5 max-w-[34rem] font-[family-name:var(--font-body)] text-[17px] leading-[1.75] tracking-[-0.01em] text-white/78 sm:text-[19px]"
            >
              An esports organization built on identity, pressure, and execution. Clear when it
              matters. Loud when it wins.
            </motion.p>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 10 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.28 }}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex min-h-11 items-center border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] px-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65 backdrop-blur-md [clip-path:polygon(0_0,100%_0,94%_100%,0_100%)]">
                <span className="mr-3 inline-block h-4 w-[2px] bg-white/24" />
                Featured division: Marvel Rivals
              </span>
              <span className="inline-flex min-h-11 items-center border border-[color:var(--color-rad)]/35 bg-[linear-gradient(135deg,rgba(255,43,69,0.16),rgba(255,255,255,0.02))] px-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/82 [clip-path:polygon(6%_0,100%_0,100%_100%,0_100%)]">
                <span className="mr-3 inline-block h-4 w-[2px] bg-[color:var(--color-rad-hi)] shadow-[0_0_12px_rgba(255,43,69,0.55)]" />
                World + EMEA champions
              </span>
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.34 }}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/roster" size="lg" className="min-w-[210px] justify-center">
                View roster
              </Button>
              <Button
                href="/about"
                variant="outline"
                size="lg"
                className="min-w-[210px] justify-center border-white/15 bg-white/[0.02] hover:bg-white/[0.06]"
              >
                About RAD
              </Button>
            </motion.div>

            <motion.div
              initial={reduced ? undefined : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.45 }}
              className="mt-7 flex items-center gap-6"
            >
              <Link
                href="/content"
                className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/56 transition-colors hover:text-white"
              >
                Content & updates <span aria-hidden="true">→</span>
              </Link>
              <span className="h-px w-16 bg-gradient-to-r from-[color:var(--color-rad)]/80 to-transparent" />
            </motion.div>
          </div>

          <HeroConstruct />
        </div>
      </Container>
    </section>
  );
}
