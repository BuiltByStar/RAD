"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { Button, Container, Eyebrow } from "@/components/ui";

const Scene = dynamic(() => import("@/components/three-scene").then((m) => m.Scene), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
        Loading experience…
      </div>
    </div>
  )
});

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeWorldsPortal() {
  return (
    <section
      id="experience"
      className="relative border-t border-white/10 py-24 sm:py-32"
    >
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-md"
          >
            <Eyebrow>Systems</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
              Four worlds.
              <br />
              One organization.
            </h2>
            <p className="mt-5 text-sm text-white/60 sm:text-base">
              An interactive map of how RAD operates — competition, creative, media,
              and partnerships — without leaving the site.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">About the org</Button>
              <Button href="/roster" variant="outline">Roster</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[4/3] w-full lg:aspect-[16/11]"
          >
            {/* Animated conic border */}
            <div
              aria-hidden
              className="absolute -inset-px rounded-[28px] opacity-60 [background:conic-gradient(from_var(--border-angle),transparent_0%,rgb(255_43_69_/_0.35)_10%,transparent_30%)] [animation:border-rotate_8s_linear_infinite]"
            />

            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[var(--shadow-card)]">
              <div className="absolute inset-0">
                <Scene />
              </div>
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl [box-shadow:inset_0_0_160px_40px_rgb(5_5_5_/_0.85)]"
                aria-hidden
              />
              {/* Corner tick marks */}
              <div className="pointer-events-none absolute inset-4">
                <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/40" />
                <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/40" />
                <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-white/40" />
                <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
