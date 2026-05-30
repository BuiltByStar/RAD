"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";
import { teams } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const exploreLanes = [
  {
    code: "MRV",
    title: "Marvel Rivals",
    subtitle: "World & EMEA champions",
    href: "/roster",
    detail: teams[0]?.status ?? "Flagship roster"
  },
  {
    code: "SHP",
    title: "Shop",
    subtitle: "Official supporter gear",
    href: "/shop",
    detail: "Jerseys, hoodies, and kit proofs"
  },
  {
    code: "CNT",
    title: "Content",
    subtitle: "Broadcasts and updates",
    href: "/content",
    detail: "Highlights, features, and social drops"
  }
] as const;

export function HomeWhereWeCompete() {
  const reduced = useReducedMotion();

  return (
    <section id="programs" className="rad-section relative bg-black py-16 sm:py-20">
      <Container size="xl">
        <motion.div
          initial={false}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.52, ease: EASE }}
          className="mb-10 max-w-3xl"
        >
          <p className="rad-kicker">Programs</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.88] text-white">
            Where we compete
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60">
            Explore the titles, gear, and content lanes that make up RAD — then jump into the full team page for lineup details.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exploreLanes.map((lane, index) => (
            <motion.div
              key={lane.code}
              initial={false}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.48, ease: EASE, delay: index * 0.05 }}
            >
              <Link href={lane.href} className="rad-game-card group block h-full">
                <div className="flex items-start justify-between gap-4">
                  <span className="rad-game-code">{lane.code}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38 transition-colors group-hover:text-[#ff6f88]">
                    Jump to section →
                  </span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white sm:text-3xl">
                    {lane.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#ff6f88]">
                    {lane.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/58">{lane.detail}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={false}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.48, ease: EASE, delay: 0.12 }}
          className="mt-8"
        >
          <Link href="/roster" className="rad-link">
            Explore full team →
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
