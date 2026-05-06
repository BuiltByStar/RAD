"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { players, stats } from "@/lib/site-data";

export function HomeHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)] pt-8 sm:pt-10">
      <div className="absolute inset-0">
        <Image
          src="/assets/RadPlayerBannerPNG8.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-22"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,252,252,0.96)_0%,rgba(252,252,252,0.82)_50%,rgba(252,252,252,0.9)_100%)]" />
      </div>

      <Container size="xl" className="relative z-10">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid min-h-[78svh] items-center gap-8 py-14 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-rad-hi)]">RAD Esports</p>
            <h1 className="mt-5 text-[clamp(3rem,10vw,7.8rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.02em] text-[var(--text)]">
              The Wild Ones
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Competitive identity, championship-level execution, and a cleaner digital platform designed for roster,
              content, and activations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/roster" size="lg">
                View roster
              </Button>
              <Button href="/partners" variant="outline" size="lg">
                Partner with RAD
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.slice(0, 4).map((stat) => (
              <article key={stat.label} className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-[var(--shadow)]">
                <p className="font-[family-name:var(--font-display)] text-4xl uppercase leading-none text-[var(--text)]">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--muted)]">{stat.label}</p>
              </article>
            ))}
            <article className="rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] p-5 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-rad-hi)]">Active squad</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {players.slice(0, 5).map((player) => (
                  <span key={player.slug} className="rounded-md border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-[var(--text)]">
                    {player.name}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
