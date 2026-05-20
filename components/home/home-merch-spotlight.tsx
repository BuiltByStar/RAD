"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { merchCollection, merchItems } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeMerchSpotlight() {
  const reduced = useReducedMotion();
  const featured = merchItems.find((item) => item.featured) ?? merchItems[0];
  const grid = merchItems.filter((item) => item.name !== featured?.name).slice(0, 3);

  if (!featured) return null;

  return (
    <section id="shop" className="rad-dot-surface relative overflow-hidden border-y border-white/10 bg-[#050102] py-14 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(68%_54%_at_12%_0%,rgba(220,20,60,0.18),transparent_58%),radial-gradient(54%_42%_at_92%_18%,rgba(255,255,255,0.04),transparent_60%)]"
      />
      <Container size="xl" className="relative z-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6f88]">{merchCollection.eyebrow}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white">
              {merchCollection.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/64">{merchCollection.description}</p>
          </div>
          <Button href="/shop" size="lg" className="shrink-0">
            Shop RAD
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="group relative overflow-hidden rounded-[1.85rem] border border-white/12 bg-black/40 shadow-[0_28px_90px_-52px_rgba(220,20,60,0.55)]"
          >
            <Link href="/shop" className="block">
              <div className="relative aspect-[4/5] sm:aspect-[16/11]">
                <Image
                  src={featured.frontImage ?? assets.goWild}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(5,1,2,0.72)_58%,#050102_100%)]" />
                <span className="absolute left-5 top-5 rounded-full border border-[#dc143c]/35 bg-[#dc143c]/14 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  Featured drop
                </span>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff6f88]">{featured.accent}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.4rem)] font-extrabold uppercase leading-[0.9] text-white">
                    {featured.name}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/68">{featured.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 transition group-hover:text-white">
                    Preview collection →
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {grid.map((item, index) => (
              <motion.article
                key={item.name}
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
              >
                <Link
                  href="/shop"
                  className="group grid grid-cols-[112px_1fr] gap-4 overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-3 transition hover:-translate-y-0.5 hover:border-[#dc143c]/35 hover:bg-white/[0.055]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-black/40">
                    {item.frontImage ? (
                      <Image src={item.frontImage} alt="" fill sizes="112px" className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center font-[family-name:var(--font-display)] text-2xl text-white/20">
                        RAD
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">{item.category}</p>
                    <h4 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none text-white">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#ff6f88]">{item.status}</p>
                  </div>
                </Link>
              </motion.article>
            ))}

            <div className="rounded-[1.35rem] border border-dashed border-white/14 bg-black/24 p-5 sm:col-span-2 lg:col-span-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">Drop alerts</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
                First access on Discord
              </p>
              <Button href="https://discord.com/invite/radgg" variant="outline" size="sm" className="mt-4">
                Join RADGG
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
