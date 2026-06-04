"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { FluidContainer } from "@/components/ui/fluid-container";
import { EASE_OUT_EXPO } from "@/components/ui/motion-tokens";
import { assets } from "@/lib/assets";
import { discordWidgetUrl } from "@/lib/site-data";

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
            <div className="relative lg:min-h-[400px]">
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

              <div className="relative grid gap-px bg-neutral-900 lg:grid-cols-[1fr_1fr] lg:min-h-[400px]">
                <div className="flex flex-col justify-center bg-black/75 px-6 py-8 backdrop-blur-[2px] md:px-10 md:py-10 lg:px-12 lg:py-12">
                  <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-blood)]">
                    RAD community
                  </p>

                  <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.75rem)] font-extrabold uppercase leading-[0.92] text-white">
                    Join the{" "}
                    <span className="rad-community-headline-accent">wild side</span>
                  </h2>

                  <div className="mt-8 grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-3">
                    {perks.map((perk, index) => (
                      <motion.div
                        key={perk.label}
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: reduced ? 0 : index * 0.07 }}
                        className="bg-black/90 px-3 py-3.5 md:px-4 md:py-4"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-blood)]">
                          {perk.label}
                        </p>
                        <p className="mt-1.5 text-xs text-neutral-500">{perk.detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[360px] bg-[#2b2d31] lg:min-h-0">
                  <iframe
                    src={discordWidgetUrl}
                    title="RAD Discord server"
                    allowTransparency
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="absolute inset-0 h-full w-full border-0"
                  />
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
