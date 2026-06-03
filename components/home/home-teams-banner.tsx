"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Chip, ChipRow } from "@/components/ui/chip";
import { FluidContainer } from "@/components/ui/fluid-container";
import { SenButton } from "@/components/ui/sen-button";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";
import { assets } from "@/lib/assets";
import { players, stats, teams } from "@/lib/site-data";

const EASE = EASE_OUT_EXPO;
const CHAMPIONSHIP_CHIPS = ["Ignite World Champions", "Season 6 EMEA PC"] as const;

const fadeUp = (reduced: boolean | null, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.55, ease: EASE, delay }
      };

export function HomeTeamsBanner() {
  const reduced = useReducedMotion();
  const team = teams[0];
  const roster = players.filter((player) => player.group === team.name);
  const preview = roster.slice(0, 6);

  return (
    <section className="overflow-hidden bg-black">
      <FluidContainer>
        <div className="relative border-x border-neutral-900">
          <div className="relative min-h-[380px] md:min-h-[480px]">
            <motion.div
              className="absolute inset-0 overflow-hidden"
              animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
              transition={reduced ? undefined : { duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <Image
                src={assets.goWild}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[72%_38%] opacity-[0.22] sm:opacity-[0.28]"
              />
            </motion.div>

            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(68%_58%_at_18%_42%,rgba(229,6,47,0.14),transparent_62%)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/55" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
            />

            <div className="rad-border-trace relative m-4 border border-neutral-900 md:m-6">
              <div className="grid min-h-[320px] lg:min-h-[400px] lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:py-16">
                  <motion.p
                    {...fadeUp(reduced, 0)}
                    className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-blood)]"
                  >
                    <span className="text-white/55">#GoWild</span>
                    <span className="mx-3 text-neutral-700" aria-hidden>
                      ·
                    </span>
                    Where we compete
                  </motion.p>

                  <motion.h2
                    {...fadeUp(reduced, 0.06)}
                    className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-white"
                  >
                    Meet the roster
                  </motion.h2>

                  <motion.p
                    {...fadeUp(reduced, 0.1)}
                    className="mt-6 max-w-xl text-base leading-[1.75] tracking-[0.01em] text-neutral-400 sm:max-w-2xl sm:text-lg sm:leading-[1.8]"
                  >
                    {team.description}
                  </motion.p>

                  <ChipRow className="mt-7">
                    <Chip className="border-[var(--color-blood)]/35 bg-[var(--color-blood)]/10 text-white/85">
                      {team.status}
                    </Chip>
                    {CHAMPIONSHIP_CHIPS.map((label) => (
                      <Chip key={label} className="text-white/62">
                        {label}
                      </Chip>
                    ))}
                    <Chip>{roster.length} players</Chip>
                  </ChipRow>

                  <motion.div {...fadeUp(reduced, 0.18)} className="mt-10 w-full max-w-md">
                    <SenButton href="/roster">View roster</SenButton>
                  </motion.div>
                </div>

                <motion.aside
                  {...fadeUp(reduced, 0.12)}
                  className="rad-border-trace rad-border-trace--offset relative flex flex-col border-t border-neutral-900 bg-black/55 backdrop-blur-[2px] lg:border-l lg:border-t-0"
                >
                  <div className="grid grid-cols-3 gap-px border-b border-neutral-900 bg-neutral-900">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: EASE, delay: 0.14 + index * 0.05 }}
                        className="bg-black px-3 py-4 text-center sm:px-4 sm:py-5"
                      >
                        <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-3xl">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                      Active lineup
                    </p>

                    <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                      {preview.map((player, index) => (
                        <Link
                          key={player.slug}
                          href={`/roster#${player.slug}`}
                          className="group relative aspect-square overflow-hidden border border-neutral-900 bg-neutral-950 transition-colors hover:border-[var(--color-blood)]/45"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(229,6,47,0.22),transparent_68%)] opacity-0 transition-opacity group-hover:opacity-100" />
                          <div className="relative flex h-full flex-col items-center justify-center gap-1 p-2">
                            <span className="font-[family-name:var(--font-display)] text-lg font-extrabold uppercase leading-none text-white/88 sm:text-xl">
                              {player.name.slice(0, 2)}
                            </span>
                            <span className="max-w-full truncate text-[8px] font-semibold uppercase tracking-[0.12em] text-neutral-500 group-hover:text-neutral-400">
                              {player.name}
                            </span>
                          </div>
                          <span
                            aria-hidden
                            className="absolute right-1.5 top-1.5 font-[family-name:var(--font-display)] text-[10px] font-extrabold tabular-nums text-white/12 transition-colors group-hover:text-[var(--color-blood)]/55"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      Marvel Rivals · {team.game}
                    </p>
                  </div>
                </motion.aside>
              </div>
            </div>
          </div>
        </div>
      </FluidContainer>
    </section>
  );
}
