"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";

const ease = EASE_OUT_EXPO;

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[90vh] flex-col justify-center overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Local “floor” — soft, editorial (no competing global texture) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_55%_at_50%_-10%,rgba(255,255,255,0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(65%_40%_at_50%_110%,rgba(255,43,69,0.06),transparent_55%)]"
      />

      <Container size="xl">
        <div className="mx-auto max-w-[820px] text-center">
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.05 }}
            className="text-[13px] font-medium text-white/50"
          >
            RAD Esports
          </motion.p>

          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 22 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.12 }}
            className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.85rem,10vw,5.25rem)] font-bold uppercase leading-[0.96] tracking-[-0.03em] text-white"
          >
            Go{" "}
            <span className="bg-gradient-to-r from-[color:var(--color-rad)] to-[color:var(--color-rad-hi)] bg-clip-text text-transparent">
              Wild
            </span>
            <span className="text-white">.</span>
          </motion.h1>

          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.22 }}
            className="mx-auto mt-8 max-w-[52ch] font-[family-name:var(--font-body)] text-[17px] font-normal leading-[1.65] tracking-[-0.01em] text-white/65 sm:text-[18px]"
          >
            An esports organization built on identity, pressure, and execution — clear when it
            matters, loud when it wins.
          </motion.p>

          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.38 }}
            className="mx-auto mt-5 max-w-lg font-[family-name:var(--font-body)] text-[13px] leading-relaxed text-white/38"
          >
            Current division: Marvel Rivals — world & EMEA champions.
          </motion.p>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.32 }}
            className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Button href="/roster" size="lg" className="min-w-[200px] sm:min-w-0">
              View roster
            </Button>
            <Button href="/about" variant="outline" size="lg" className="min-w-[200px] sm:min-w-0">
              About RAD
            </Button>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="mt-6"
          >
            <Link
              href="/content"
              className="text-[13px] font-medium text-white/45 underline-offset-4 transition-colors hover:text-white"
            >
              Content & updates →
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { scaleX: 0 }}
            animate={reduced ? undefined : { scaleX: 1 }}
            transition={{ duration: 0.95, ease, delay: 0.5 }}
            style={{ originX: 0.5 }}
            className="mx-auto mt-20 h-px max-w-md bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            aria-hidden
          />

          <motion.p
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 0.4 }}
            transition={{ delay: 0.65, duration: 0.45 }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35"
          >
            teamrad.gg
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
