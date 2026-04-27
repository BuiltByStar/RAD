"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { discordInviteUrl, players, stats } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const signals = [
  { label: "Roster", value: `${players.length} active` },
  { label: "Proof", value: "World + EMEA" },
  { label: "Status", value: "Open activations" }
];

export function HomeHero() {
  const reduced = useReducedMotion();
  const featuredPlayers = players.slice(0, 4);

  return (
    <section className="rad-hero relative isolate min-h-[92svh] overflow-hidden border-b border-white/10 bg-[#030304] pt-12 sm:pt-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/RadPlayerBannerPNG8.png"
        className="absolute inset-0 z-[-5] h-full w-full object-cover opacity-30 mix-blend-screen"
      >
        <source src="/assets/DiscordRadBannerAnimated_960.mp4" type="video/mp4" />
      </video>
      <Image
        src="/assets/RadPlayerBannerPNG8.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="z-[-6] object-cover object-center opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-4] bg-[radial-gradient(70%_50%_at_62%_35%,rgba(255,0,0,0.38),transparent_62%),linear-gradient(90deg,#030304_0%,rgba(3,3,4,0.86)_42%,rgba(3,3,4,0.58)_70%,#030304_100%)]"
      />
      <motion.div
        aria-hidden
        className="absolute -right-[24%] top-[10%] z-[-3] h-[36rem] w-[36rem] rounded-full border border-[#ff0000]/24"
        animate={reduced ? undefined : { rotate: [0, 360], scale: [1, 1.06, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[-20%] top-[16%] z-[-2] h-20 w-[140%] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.24),rgba(255,255,255,0.12),transparent)] blur-sm"
        animate={reduced ? undefined : { x: ["-12%", "12%", "-12%"], opacity: [0.2, 0.58, 0.2] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[calc(92svh-4rem)] gap-10 pb-14 pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:pb-20 lg:pt-20">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 28 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-black/42 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-[#ff0000] shadow-[0_0_20px_rgba(255,0,0,0.9)]" />
              RAD Esports // live brand system
            </div>

            <h1 className="mt-7 font-[family-name:var(--font-display)] text-[clamp(4.1rem,12vw,12.5rem)] font-extrabold uppercase leading-[0.76] tracking-[-0.035em] text-white">
              Go
              <span className="block bg-[linear-gradient(90deg,#fff_0%,#ff2b2b_45%,#ff0000_100%)] bg-clip-text text-transparent">
                Wild.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/72 sm:text-xl">
              RAD is the competitive signal: championship roster, content engine, community energy, and brand activations built to move loud.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/roster" size="lg" className="min-w-[180px]">
                View roster
                <span aria-hidden>→</span>
              </Button>
              <Button href={discordInviteUrl} variant="outline" size="lg" className="min-w-[180px]">
                Discord
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] px-4 py-4 backdrop-blur"
                >
                  <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, x: 28, rotate: 1.2 }}
            animate={reduced ? undefined : { opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.22),transparent_60%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.65rem] border border-white/14 bg-black/58 p-4 shadow-[0_40px_140px_rgba(0,0,0,0.72)] backdrop-blur-xl">
              <div className="relative min-h-[460px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#09090b]">
                <Image
                  src="/assets/RadPlayerBannerPNG8.png"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover opacity-78"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.32)_42%,rgba(0,0,0,0.92)_100%),radial-gradient(circle_at_30%_24%,rgba(255,0,0,0.35),transparent_42%)]" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="rounded-full border border-[#ff0000]/35 bg-[#ff0000]/14 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    command deck
                  </span>
                  <span className="rounded-full border border-white/12 bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/62">
                    teamrad.gg
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <Image
                    src="/assets/RadNewLogoWordmarkWhite.png"
                    alt="RAD"
                    width={320}
                    height={86}
                    className="h-auto w-[170px]"
                  />
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {signals.map((signal) => (
                      <div key={signal.label} className="rounded-xl border border-white/10 bg-black/46 p-3 backdrop-blur">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">
                          {signal.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-white">
                          {signal.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {featuredPlayers.map((player) => (
                  <div key={player.slug} className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
                      {player.name}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff5656]">
                      {player.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
