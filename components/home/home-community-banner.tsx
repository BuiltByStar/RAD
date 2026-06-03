"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { FluidContainer } from "@/components/ui/fluid-container";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";
import { cn } from "@/components/ui/cn";
import { assets } from "@/lib/assets";
import { discordInviteUrl } from "@/lib/site-data";

const perks = [
  { label: "Match nights", detail: "Live watch-alongs" },
  { label: "Roster drops", detail: "First in the server" },
  { label: "Gear alerts", detail: "Shop restocks" }
];

const tickerItems = [
  "Match night alerts",
  "Roster drops",
  "Gear restocks",
  "Watch parties",
  "Behind the scenes",
  "Community polls",
  "Scrim updates",
  "Wild side only"
];

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 127.14 96.36"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.58,67.58,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.1,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

export function HomeCommunityBanner() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black">
      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-10 md:px-6 md:py-12 lg:py-14">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            className="rad-border-trace relative overflow-hidden border border-neutral-900 bg-black"
          >
            <div className="relative min-h-[320px] md:min-h-[360px]">
              <Image
                src={assets.goWild}
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover opacity-[0.22]"
              />
              <Image
                src={assets.bgRed}
                alt=""
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover opacity-[0.14] mix-blend-screen"
              />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.72)_42%,rgba(0,0,0,0.88)_100%)]" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]"
              />

              {!reduced ? (
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,101,242,0.22),transparent_68%)] md:right-8 md:h-96 md:w-96"
                />
              ) : null}

              <div className="relative grid gap-px bg-neutral-900 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="bg-black/75 p-6 backdrop-blur-[2px] md:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
                      RAD community
                    </p>
                    <span className="rad-community-online inline-flex items-center gap-2 border border-neutral-800 bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                      <span aria-hidden className="rad-community-online__dot" />
                      Server live
                    </span>
                  </div>

                  <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold uppercase leading-[0.92] text-white">
                    Join the{" "}
                    <span className="rad-community-headline-accent">wild side</span>
                  </h2>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-400 md:text-base">
                    Discord is where match nights, roster drops, and supporter gear updates land first — not a
                    generic fan club link.
                  </p>

                  <div className="mt-6 grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-3">
                    {perks.map((perk, index) => (
                      <motion.div
                        key={perk.label}
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: reduced ? 0 : index * 0.07 }}
                        className="bg-black/90 px-3 py-3 md:px-4 md:py-3.5"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)]">
                          {perk.label}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">{perk.detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-col justify-between bg-black/80 p-6 backdrop-blur-[2px] md:p-8 lg:p-10">
                  <div aria-hidden className="pointer-events-none absolute right-4 top-4 text-[#5865f2]/15">
                    <DiscordIcon className="h-28 w-28 md:h-36 md:w-36" />
                  </div>

                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-600">
                      Official server
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-tight text-white md:text-3xl">
                      #GoWild
                    </p>
                    <p className="mt-2 max-w-xs text-xs leading-relaxed text-neutral-500">
                      Pull up for live comms, drop alerts, and the same energy as match day.
                    </p>
                  </div>

                  <div className="relative mt-8 lg:mt-10">
                    <Link
                      href={discordInviteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "rad-community-discord group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden",
                        "sm:w-auto"
                      )}
                    >
                      <span
                        aria-hidden
                        className="rad-community-discord__shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <DiscordIcon className="relative h-5 w-5 shrink-0" />
                      <span className="relative">Join Discord</span>
                      <span aria-hidden className="relative text-neutral-300 transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rad-community-marquee border-t border-neutral-900 bg-black/90">
              <div className="rad-community-marquee__track">
                {Array.from({ length: 2 }).map((_, groupIndex) => (
                  <span key={groupIndex} className="rad-community-marquee__group">
                    {tickerItems.map((item) => (
                      <span key={`${groupIndex}-${item}`} className="rad-community-marquee__item">
                        {item}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </FluidContainer>
    </section>
  );
}
