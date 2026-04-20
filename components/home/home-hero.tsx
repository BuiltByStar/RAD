"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const ease = EASE_OUT_EXPO;

const constructBlades = [
  {
    className:
      "left-[-6%] top-[12%] h-4 w-[42%] -rotate-[20deg] rounded-full border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,43,69,0.38),rgba(10,10,10,0.92))] shadow-[0_18px_40px_rgba(0,0,0,0.35)]",
    animate: { x: [-18, 16, -8], rotate: [-20, -14, -20] },
    transition: { duration: 8.5, repeat: Infinity, ease: "easeInOut" as const }
  },
  {
    className:
      "right-[-8%] top-[22%] h-3.5 w-[36%] -rotate-[22deg] rounded-full border border-white/10 bg-[linear-gradient(90deg,rgba(10,10,10,0.94),rgba(255,43,69,0.3),rgba(255,255,255,0.05))] shadow-[0_18px_36px_rgba(0,0,0,0.35)]",
    animate: { x: [12, -18, 8], rotate: [-22, -16, -22] },
    transition: { duration: 7.2, repeat: Infinity, ease: "easeInOut" as const }
  },
  {
    className:
      "left-[8%] bottom-[19%] h-3.5 w-[34%] -rotate-[16deg] rounded-full border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,43,69,0.26),rgba(8,8,8,0.95))] shadow-[0_20px_38px_rgba(0,0,0,0.32)]",
    animate: { x: [-12, 14, -12], rotate: [-16, -11, -16] },
    transition: { duration: 9.4, repeat: Infinity, ease: "easeInOut" as const }
  },
  {
    className:
      "right-[12%] bottom-[12%] h-[42%] w-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,43,69,0.65),rgba(10,10,10,0.92))] shadow-[0_16px_36px_rgba(0,0,0,0.34)]",
    animate: { y: [-12, 14, -12], scaleY: [0.92, 1.06, 0.92] },
    transition: { duration: 6.2, repeat: Infinity, ease: "easeInOut" as const }
  }
];

const constructNodes = [
  { className: "left-[12%] top-[32%]", delay: 0 },
  { className: "right-[18%] top-[38%]", delay: 0.25 },
  { className: "left-[18%] bottom-[22%]", delay: 0.4 },
  { className: "right-[28%] bottom-[28%]", delay: 0.18 }
];

function HeroConstruct() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 18, scale: 0.97 }}
      animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.18 }}
      className="relative mx-auto aspect-[1.05/1] w-full max-w-[660px] sm:aspect-[1.08/1] lg:max-w-none"
    >
      <div
        aria-hidden
        className="absolute inset-[8%] rounded-[36px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015)),linear-gradient(145deg,rgba(10,10,10,0.8),rgba(5,5,5,0.98))] shadow-[0_35px_90px_rgba(0,0,0,0.58)]"
      />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.72)_0%,rgba(255,43,69,0.22)_42%,transparent_74%)] blur-3xl"
        animate={
          reduced
            ? undefined
            : { scale: [0.92, 1.08, 0.96], opacity: [0.72, 1, 0.76] }
        }
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {constructBlades.map((blade) => (
        <motion.div
          key={blade.className}
          aria-hidden
          className={`absolute ${blade.className}`}
          animate={reduced ? undefined : blade.animate}
          transition={blade.transition}
        />
      ))}

      {constructNodes.map((node) => (
        <motion.div
          key={node.className}
          aria-hidden
          className={`absolute h-3 w-3 rounded-full border border-white/20 bg-[color:var(--color-rad)] shadow-[0_0_28px_rgba(255,43,69,0.55)] ${node.className}`}
          animate={reduced ? undefined : { scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        aria-hidden
        className="absolute inset-[16%] rounded-[30px] border border-white/14 bg-[linear-gradient(135deg,rgba(255,43,69,0.14),rgba(255,255,255,0.04)_28%,rgba(5,5,5,0.92)_72%)] backdrop-blur-[3px]"
        animate={reduced ? undefined : { rotate: [-1.2, 1.8, -1.2], y: [-8, 10, -8] }}
        transition={{ duration: 9.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 50%" }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-[22%] rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)),linear-gradient(145deg,rgba(255,43,69,0.12),rgba(8,8,8,0.94)_58%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_22px_56px_rgba(0,0,0,0.42)]"
        animate={reduced ? undefined : { rotate: [2.5, -2.5, 2.5] }}
        transition={{ duration: 11.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 50%" }}
      />

      <motion.div
        className="absolute inset-[20%] flex items-center justify-center"
        animate={reduced ? undefined : { y: [-8, 10, -8] }}
        transition={{ duration: 7.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative flex w-full max-w-[350px] items-center justify-center rounded-[28px] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(5,5,5,0.68)] px-8 py-10 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          <div
            aria-hidden
            className="absolute inset-x-[10%] bottom-[-8%] h-12 rounded-full bg-[radial-gradient(circle,rgba(255,43,69,0.9),transparent_72%)] blur-xl"
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[28px] bg-[linear-gradient(112deg,transparent_20%,rgba(255,255,255,0.16)_42%,rgba(255,43,69,0.24)_52%,transparent_72%)]"
            animate={reduced ? undefined : { x: ["-140%", "140%"] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          />
          <Image
            src="/assets/RadNewLogoWordmarkWhite.png"
            alt=""
            width={720}
            height={190}
            className="relative z-10 h-auto w-full max-w-[270px] drop-shadow-[0_0_28px_rgba(255,43,69,0.22)]"
          />
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute left-[14%] top-[14%] rounded-full border border-white/12 bg-black/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 backdrop-blur-md"
        animate={reduced ? undefined : { y: [-4, 6, -4], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Pressure-built
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-[14%] right-[10%] rounded-full border border-white/12 bg-black/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-rad-hi)] backdrop-blur-md"
        animate={reduced ? undefined : { y: [5, -6, 5], opacity: [0.72, 1, 0.72] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        #GoWild
      </motion.div>
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
        animate={reduced ? undefined : { x: [-20, 32, -20], y: [0, 18, 0], opacity: [0.58, 0.92, 0.62] }}
        transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_72%)] blur-3xl"
        animate={reduced ? undefined : { x: [0, -24, 0], y: [10, -16, 10], opacity: [0.38, 0.58, 0.38] }}
        transition={{ duration: 10.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[18%] h-5 w-[45%] rotate-[-16deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.36),rgba(255,255,255,0.06),transparent)] blur-sm"
        animate={reduced ? undefined : { x: [-20, 34, -20] }}
        transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] bottom-[18%] h-4 w-[42%] rotate-[-18deg] rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,43,69,0.28),rgba(255,255,255,0.05),transparent)] blur-sm"
        animate={reduced ? undefined : { x: [16, -24, 16] }}
        transition={{ duration: 9.1, repeat: Infinity, ease: "easeInOut" }}
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
