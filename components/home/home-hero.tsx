"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";

const stats = [
  { label: "World title", value: "01" },
  { label: "EMEA title", value: "01" },
  { label: "Active roster", value: "07" }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();

  const motionProps = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, ease: EASE }
      };

  return (
    <section className="relative isolate flex min-h-[76svh] items-end overflow-hidden border-b border-white/10 bg-black">
      <Image
        src="/assets/RadPlayerBannerPNG8.png"
        alt="RAD Esports team banner"
        fill
        priority
        sizes="100vw"
        className="z-[-3] object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-2] bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.82)_34%,rgba(0,0,0,0.52)_68%,rgba(0,0,0,0.78)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[-1] bg-[radial-gradient(620px_320px_at_25%_42%,rgba(255,0,0,0.28),transparent_68%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.95)_100%)]"
      />

      <Container size="xl" className="relative z-10">
        <div className="max-w-4xl pb-12 pt-20 sm:pb-14 sm:pt-28 lg:pb-16">
          <motion.div {...motionProps}>
            <div className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
              <span className="h-2 w-2 rounded-full bg-[color:var(--color-rad)]" />
              RAD Esports
            </div>

            <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(4.25rem,13vw,10.5rem)] font-extrabold uppercase leading-[0.84] tracking-normal text-white">
              Go <span className="text-[color:var(--color-rad)]">Wild</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/74 sm:text-xl">
              Built for pressure, content, and the next stage of competition. RAD is a championship esports brand made to grow beyond one game.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/roster"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[color:var(--color-rad)] px-6 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_18px_38px_rgba(255,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ff2020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View roster
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/18 bg-white/[0.06] px-6 text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                About RAD
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/12 bg-black/45 p-4 backdrop-blur"
              >
                <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
