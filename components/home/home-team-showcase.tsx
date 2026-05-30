"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { players, teams } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeTeamShowcase() {
  const reduced = useReducedMotion();
  const team = teams[0];
  const roster = players.filter((player) => player.group === team.name);

  return (
    <section id="team" className="relative overflow-hidden bg-black py-14 sm:py-20">
      <Image src={assets.bgRed} alt="" fill sizes="100vw" className="object-cover opacity-[0.14]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#050102_0%,rgba(5,1,2,0.88)_42%,#050102_100%)]" />

      <Container size="xl" className="relative z-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6f88]">The team</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
            Where we compete.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/64 sm:text-lg">
            World and EMEA champions built around a single competitive core. Meet the lineup, roles, and the pressure-built identity behind RAD.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative overflow-hidden rounded-[1.85rem] border border-white/12 bg-black/50 shadow-[0_28px_90px_-54px_rgba(0,0,0,0.95)]"
          >
            <div className="relative min-h-[360px]">
              <Image
                src={assets.goWild}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover opacity-72"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,1,2,0.92)_0%,rgba(5,1,2,0.55)_42%,rgba(5,1,2,0.82)_100%)]" />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/52">Featured division</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.86] text-white">
                  {team.game}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/68 sm:text-base">{team.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#dc143c]/30 bg-[#dc143c]/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/78">
                    {team.status}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/62">
                    {roster.length} players
                  </span>
                </div>
                <Button href="/roster" size="lg" className="mt-7 w-fit">
                  View full team
                </Button>
              </div>
            </div>
          </motion.article>

          <motion.div
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
            className="grid content-start gap-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42">Active lineup</p>
            {roster.map((player, index) => (
              <Link
                key={player.slug}
                href={`/roster#${player.slug}`}
                className="group grid grid-cols-[56px_1fr_auto] items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-3 py-3 transition hover:border-[#dc143c]/35 hover:bg-white/[0.055]"
              >
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#dc143c]/10">
                  {player.image ? (
                    <Image src={player.image} alt="" fill sizes="56px" className="object-cover" />
                  ) : (
                    <span className="font-[family-name:var(--font-display)] text-lg font-extrabold uppercase text-white/80">
                      {player.name.slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none text-white">
                    {player.name}
                  </p>
                  <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-white/48">
                    {player.role}
                  </p>
                </div>
                <span className="pr-1 font-[family-name:var(--font-display)] text-2xl font-extrabold tabular-nums leading-none text-white/16 transition group-hover:text-[#dc143c]/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
