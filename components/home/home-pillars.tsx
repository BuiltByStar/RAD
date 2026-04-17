"use client";

import { motion } from "framer-motion";

import { Container, Eyebrow } from "@/components/ui";
import { orgValues } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomePillars() {
  return (
    <section className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 max-w-7xl bg-[radial-gradient(ellipse_at_top,rgb(255_43_69_/_0.14),transparent_60%)]"
      />

      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Eyebrow tone="rad">Principles</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Four pillars.
              <br />
              One organization.
            </h2>
            <p className="mt-5 max-w-md text-sm text-white/60 sm:text-base">
              RAD is engineered around a tight set of principles that keep the
              roster sharp, the brand loud, and the operation ready to scale.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {orgValues.map((value) => (
              <motion.article
                key={value.title}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.7, ease: EASE }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.025] p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[.04]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(255_43_69_/_0.22),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-lg"
                  aria-hidden
                >
                  {value.icon}
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl uppercase tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
