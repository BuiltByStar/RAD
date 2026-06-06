"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Chip, ChipRow } from "@/components/ui/chip";
import { FluidContainer } from "@/components/ui/fluid-container";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";
import { assets } from "@/lib/assets";
import { players, teams } from "@/lib/site-data";

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
  const previewPlayers = roster.slice(0, 6);

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
                  aria-label="Active roster preview"
                >
                  <div className="grid grid-cols-2 gap-px bg-neutral-900 sm:grid-cols-3">
                    {previewPlayers.map((player, index) => (
                      <motion.div
                        key={player.slug}
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.14 + index * 0.04 }}
                        className="bg-black"
                      >
                        <Link
                          href={`/roster#${player.slug}`}
                          aria-label={`View ${player.name}'s profile`}
                          className="group relative flex h-full flex-col overflow-hidden border border-transparent transition-[border-color,background-color] duration-300 hover:border-[var(--color-blood)] hover:bg-neutral-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blood)]"
                        >
                          <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-neutral-900 bg-black">
                            {player.image ? (
                              <Image
                                src={player.image}
                                alt={`${player.name} profile image`}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 18vw"
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                              />
                            ) : (
                              <>
                                <Image
                                  src={assets.pfpRed}
                                  alt=""
                                  fill
                                  sizes="(max-width: 640px) 50vw, 18vw"
                                  className="object-cover opacity-20 grayscale"
                                />
                                <div className="absolute inset-0 grid place-items-center">
                                  <span className="font-[family-name:var(--font-display)] text-4xl font-black uppercase leading-none text-white/80 sm:text-5xl">
                                    {player.name
                                      .split(/\s+/)
                                      .map((part) => part[0])
                                      .join("")
                                      .slice(0, 2)
                                      .toUpperCase()}
                                  </span>
                                </div>
                              </>
                            )}
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                            />
                            <div className="absolute left-2 right-2 top-2 flex items-start justify-between gap-2">
                              <span className="inline-block border border-neutral-800 bg-black/80 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-neutral-300">
                                {player.role}
                              </span>
                              {player.number ? (
                                <span className="font-[family-name:var(--font-display)] text-base font-extrabold tabular-nums leading-none text-white/25 sm:text-lg">
                                  {String(player.number).padStart(2, "0")}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex flex-col gap-0.5 px-2.5 py-2 sm:px-3 sm:py-2.5">
                            <span className="truncate font-[family-name:var(--font-display)] text-sm font-extrabold uppercase leading-none text-white">
                              {player.name}
                            </span>
                            {player.descriptor ? (
                              <span className="truncate text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--color-blood)]/85">
                                {player.descriptor}
                              </span>
                            ) : null}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
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
