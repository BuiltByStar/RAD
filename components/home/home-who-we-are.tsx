"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";
import { aboutSummary } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeWhoWeAre() {
  const reduced = useReducedMotion();

  return (
    <section id="who-we-are" className="rad-section relative bg-[#030304] py-16 sm:py-20">
      <Container size="xl">
        <motion.div
          initial={false}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.52, ease: EASE }}
          className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16 lg:items-start"
        >
          <div>
            <p className="rad-kicker">Organization</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.88] text-white">
              Who we are
            </h2>
          </div>

          <div className="rad-frame-y py-6">
            <p className="text-base leading-relaxed text-white/62 sm:text-lg">{aboutSummary}</p>
            <Link href="/about" className="rad-link mt-7">
              Read the full story →
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
