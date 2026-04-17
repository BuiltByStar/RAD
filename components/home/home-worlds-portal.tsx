"use client";

import dynamic from "next/dynamic";

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

export function HomeWorldsPortal() {
  return (
    <section id="experience" className="relative border-t border-white/10 py-24 sm:py-32">
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-md">
            <Eyebrow>Explore</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl">
              Four worlds.
              <br />
              One organization.
            </h2>
            <p className="mt-5 text-sm text-white/60 sm:text-base">
              Navigate the interactive RAD map. The Core, Vanguard, Media, and
              Alliances — each world is an entry point into how we compete,
              create, and grow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">About the org</Button>
              <Button href="/roster" variant="outline">Roster</Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[var(--shadow-card)] lg:aspect-[16/11]">
            <div className="absolute inset-0">
              <Scene />
            </div>
            {/* Edge fade so the scene blends into the page */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl [box-shadow:inset_0_0_120px_40px_rgb(5_5_5_/_0.8)]"
              aria-hidden
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
