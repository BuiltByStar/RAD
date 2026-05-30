"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { teams } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();
  const team = teams[0];

  return (
    <section className="rad-dot-surface relative isolate overflow-hidden border-b border-white/10 bg-[#030304] pt-20 sm:pt-24">
      <div
        aria-hidden
        className="absolute inset-0 z-[-5] bg-[radial-gradient(52%_42%_at_76%_14%,rgba(220,20,60,0.24),transparent_68%),linear-gradient(180deg,#030304_0%,#08080a_52%,#030304_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-4] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70 [mask-image:linear-gradient(180deg,black,transparent_78%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 z-[-3] w-[48vw] bg-[linear-gradient(112deg,transparent_0_34%,rgba(220,20,60,0.18)_34.2%_34.7%,transparent_35%_100%)]"
      />
      <motion.div
        aria-hidden
        className="absolute -right-36 top-24 z-[-2] h-[30rem] w-[30rem] rounded-full bg-[#dc143c]/18 blur-3xl"
        animate={reduced ? undefined : { scale: [0.96, 1.06, 0.96], opacity: [0.38, 0.68, 0.38] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[min(780px,calc(100svh-5rem))] gap-8 pb-10 pt-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="min-w-0 max-w-3xl"
          >
            <motion.div
              initial={false}
              animate={
                reduced
                  ? undefined
                  : {
                      y: [0, -8, 0],
                      rotate: [-1.5, 1.5, -1.5],
                      scale: [1, 1.035, 1]
                    }
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative mb-6 grid h-24 w-24 place-items-center rounded-[1.45rem] border border-[#dc143c]/35 bg-[#dc143c]/12 shadow-[0_24px_70px_-34px_rgba(220,20,60,0.92)] backdrop-blur-xl sm:h-28 sm:w-28"
            >
              <motion.span
                aria-hidden
                className="absolute inset-[-0.35rem] rounded-[1.75rem] border border-[#dc143c]/18"
                animate={reduced ? undefined : { opacity: [0.2, 0.72, 0.2], scale: [0.94, 1.08, 0.94] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <Image
                src={assets.logoMark}
                alt="RAD logo"
                width={120}
                height={140}
                priority
                className="relative h-16 w-auto object-contain drop-shadow-[0_0_28px_rgba(220,20,60,0.55)] sm:h-20"
              />
            </motion.div>

            <h1 className="max-w-[7ch] font-[family-name:var(--font-display)] text-[clamp(4.4rem,10vw,10.5rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.01em] text-white">
              RAD
              <span className="block text-[#dc143c]">Esports</span>
            </h1>

            <p className="mt-5 max-w-[30rem] text-base leading-relaxed text-white/72 sm:text-lg">
              World and EMEA champions built around players, pressure, content, and the community behind the wild.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/roster" size="lg" className="min-w-[190px]">
                Meet the team
              </Button>
              <Button
                href="/shop"
                variant="outline"
                size="lg"
                className="min-w-[190px]"
              >
                Shop gear
              </Button>
            </div>

          </motion.div>

          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
            className="relative min-h-[30rem] overflow-hidden rounded-[1.35rem] border border-white/12 bg-black/54 shadow-[0_34px_110px_-58px_rgba(220,20,60,0.72)] sm:min-h-[38rem]"
          >
            <Image
              src={assets.bgRed}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover opacity-40"
            />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,1,2,0.88)_0%,rgba(5,1,2,0.44)_48%,rgba(5,1,2,0.72)_100%),radial-gradient(circle_at_50%_32%,rgba(220,20,60,0.36),transparent_54%)]" />
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-[42%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dc143c]/16 blur-3xl"
              animate={reduced ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src={assets.logoMark}
              alt=""
              width={520}
              height={620}
              priority
              className="absolute left-1/2 top-[42%] h-[18rem] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-95 drop-shadow-[0_34px_90px_rgba(220,20,60,0.38)] sm:h-[24rem]"
            />
            <Image
              src={assets.goWild}
              alt="Go Wild"
              width={860}
              height={260}
              className="absolute bottom-8 left-6 right-6 h-auto w-[calc(100%-3rem)] object-contain opacity-28"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/90 via-black/38 to-transparent" />

            <div className="absolute left-5 top-5 rounded-full border border-[#dc143c]/35 bg-[#dc143c]/14 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              {team.game}
            </div>

            <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff6f88]">Competitive identity</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.7rem)] font-extrabold uppercase leading-[0.82] text-white">
                  Welcome to the wild.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/68">{team.description}</p>
              </div>
              <span className="w-fit rounded-full border border-white/12 bg-white/[0.055] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/74 backdrop-blur-xl">
                {team.status}
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
