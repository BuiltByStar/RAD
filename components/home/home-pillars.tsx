"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "@/components/ui";
import { orgValues } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomePillars() {
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-[#070707] py-18 sm:py-24">
      <Container size="xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-rad)]">
            Standard
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl">
            Built to scale without losing the edge.
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {orgValues.map((value) => (
            <motion.article
              key={value.title}
              variants={{
                hidden: reduced ? {} : { opacity: 0, y: 18 },
                show: reduced ? {} : { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: EASE }}
              className="rounded-lg border border-white/10 bg-black/45 p-6 transition hover:-translate-y-0.5 hover:border-white/18"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-lg text-[color:var(--color-rad)]">
                {value.icon}
              </span>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/62">{value.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
