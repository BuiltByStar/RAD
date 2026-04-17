"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[88vh] flex-col justify-center overflow-hidden pt-20 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,43,69,0.08),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_28%,#050505_100%)]"
      />

      <Container size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={reduced ? undefined : { opacity: 0, letterSpacing: "0.5em" }}
            animate={reduced ? undefined : { opacity: 1, letterSpacing: "0.32em" }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            className="text-[10px] font-semibold uppercase text-white/40 sm:text-[11px]"
          >
            Esports
          </motion.p>

          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 28 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            className="mt-8 font-[family-name:var(--font-display)] text-[clamp(2.75rem,12vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white"
          >
            Go{" "}
            <span className="text-[color:var(--color-rad)]">Wild</span>
            <span className="text-white">.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.35 }}
            className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
          >
            RAD is an esports org built on identity, pressure, and execution — loud when it counts,
            precise when it matters.
          </motion.p>

          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            className="mx-auto mt-5 max-w-lg text-xs leading-relaxed text-white/35 sm:text-sm"
          >
            Current division: Marvel Rivals — world & EMEA champions.
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Button href="/about" variant="outline" size="lg">
              About RAD
            </Button>
            <Button href="/roster" size="lg">
              Roster
            </Button>
            <Button href="/content" variant="ghost" size="lg">
              Content
            </Button>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { scaleX: 0 }}
            animate={reduced ? undefined : { scaleX: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
            style={{ originX: 0.5 }}
            className="mx-auto mt-16 h-px max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent"
            aria-hidden
          />

          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 0.45 }}
            transition={{ delay: 0.95, duration: 0.5 }}
            className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35"
          >
            teamrad.gg
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
