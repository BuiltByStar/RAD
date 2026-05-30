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
    <section id="team" className="rad-section relative overflow-hidden bg-black py-14 sm:py-20">
      <Image src={assets.bgRed} alt="" fill sizes="100vw" className="object-cover opacity-[0.1]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#050102_0%,rgba(5,1,2,0.9)_42%,#050102_100%)]" />

      <Container size="xl" className="relative z-10">
        <div className="mb-10 max-w-3xl">
          <p className="rad-kicker">The team</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
            Where we compete.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            World and EMEA champions built around a single competitive core. Meet the lineup, roles, and the identity behind RAD.
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.52, ease: EASE }}
            className="relative overflow-hidden bg-[#030304]"
          >
            <div className="relative min-h-[360px]">
              <Image
                src={assets.goWild}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover opacity-68"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,1,2,0.94)_0%,rgba(5,1,2,0.58)_42%,rgba(5,1,2,0.86)_100%)]" />
              <div className="relative flex h-full min-h-[360px] flex-col justify-end p-6 sm:p-8">
                <p className="rad-kicker text-white/52">Featured division</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold uppercase leading-[0.86] text-white">
                  {team.game}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/64 sm:text-base">{team.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rad-tag border-[#dc143c]/30 bg-[#dc143c]/10 text-white/78">{team.status}</span>
                  <span className="rad-tag">{roster.length} players</span>
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
            transition={{ duration: 0.52, ease: EASE, delay: 0.06 }}
            className="rad-divide-y grid content-start bg-[#030304]"
          >
            <p className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/42">Active lineup</p>
            {roster.map((player, index) => (
              <Link
                key={player.slug}
                href={`/roster#${player.slug}`}
                className="group rad-panel-interactive grid grid-cols-[56px_1fr_auto] items-center gap-3 border-0 border-b border-white/10 bg-transparent px-3 py-3 transition-colors last:border-b-0 hover:border-[#dc143c]/28"
              >
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden border border-white/10 bg-[#dc143c]/10">
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
                <span className="pr-1 font-[family-name:var(--font-display)] text-2xl font-extrabold tabular-nums leading-none text-white/14 transition-colors group-hover:text-[#dc143c]/55">
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
