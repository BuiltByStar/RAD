"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Chip, ChipRow } from "@/components/ui/chip";
import { FluidContainer } from "@/components/ui/fluid-container";
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
  const stripPlayers = roster.length > 0 ? [...roster, ...roster] : [];

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

                  <motion.div {...fadeUp(reduced, 0.18)} className="mt-10">
                    <Link href="/roster" className="rad-glow-cta" aria-label="View the full RAD team roster">
                      <span>See the full team</span>
                      <svg
                        aria-hidden
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        className="translate-y-px"
                      >
                        <path
                          d="M1 5h11.5M8.5 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
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

                  <div className="flex flex-1 flex-col justify-between gap-4 p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                        Active lineup
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                        {roster.length} starters
                      </p>
                    </div>

                    {stripPlayers.length > 0 ? (
                      <div className="rad-roster-strip -mx-4 sm:-mx-5">
                        <div className="rad-roster-strip__track gap-2 sm:gap-3">
                          {stripPlayers.map((player, index) => (
                            <Link
                              key={`${player.slug}-${index}`}
                              href={`/roster#${player.slug}`}
                              aria-label={`View ${player.name}'s profile`}
                              className="group relative flex w-[88px] shrink-0 flex-col items-stretch border border-neutral-900 bg-neutral-950 transition-colors first:ml-4 last:mr-4 hover:border-[var(--color-blood)]/55 sm:w-[96px] sm:first:ml-5 sm:last:mr-5"
                            >
                              <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
                                {player.image ? (
                                  <Image
                                    src={player.image}
                                    alt=""
                                    fill
                                    sizes="96px"
                                    className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                                  />
                                ) : (
                                  <span className="absolute inset-0 grid place-items-center font-[family-name:var(--font-display)] text-lg font-extrabold uppercase text-white/75">
                                    {player.name.slice(0, 2)}
                                  </span>
                                )}
                                <div
                                  aria-hidden
                                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.78)_100%)]"
                                />
                                <span
                                  aria-hidden
                                  className="absolute left-1.5 top-1.5 font-[family-name:var(--font-display)] text-[10px] font-extrabold tabular-nums text-white/35 transition-colors group-hover:text-[var(--color-blood)]/85"
                                >
                                  {String((index % roster.length) + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5 border-t border-neutral-900 px-2 py-2">
                                <span className="truncate font-[family-name:var(--font-display)] text-[11px] font-extrabold uppercase leading-none text-white">
                                  {player.name}
                                </span>
                                <span className="truncate text-[8px] font-semibold uppercase tracking-[0.14em] text-neutral-500 group-hover:text-neutral-400">
                                  {player.role}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <p className="text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
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
