"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { merchCollection, merchItems, radShopUrl } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeMerchSpotlight() {
  const reduced = useReducedMotion();
  const featured = merchItems.find((item) => item.featured) ?? merchItems[0];
  const grid = merchItems.filter((item) => item.name !== featured?.name).slice(0, 6);

  if (!featured) return null;

  return (
    <section id="shop" className="rad-dot-surface relative overflow-hidden border-y border-white/10 bg-[#030304] py-14 sm:py-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(68%_54%_at_12%_0%,rgba(220,20,60,0.18),transparent_58%),radial-gradient(54%_42%_at_92%_18%,rgba(255,255,255,0.04),transparent_60%)]"
      />
      <Container size="xl" className="relative z-10">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_0.58fr] lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff6f88]">{merchCollection.eyebrow}</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.01em] text-white">
              Built to buy.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/64">
            The homepage now treats merch like a core RAD lane, not a small footer link. Fans can inspect the proof set here, then move into the full shop rack for checkout.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.article
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="group relative overflow-hidden rounded-[1.35rem] border border-white/12 bg-black/50 shadow-[0_28px_90px_-52px_rgba(220,20,60,0.55)]"
          >
            <Link href="/shop" className="block">
              <div className="relative min-h-[34rem]">
                {featured.backImage ? (
                  <Image
                    src={featured.backImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 48vw, 26vw"
                    className="!left-auto !right-0 !top-0 !h-[88%] !w-[46%] object-cover opacity-62 transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : null}
                <Image
                  src={featured.frontImage ?? ""}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 78vw, 46vw"
                  className="!left-0 !top-[4%] !h-[91%] !w-[70%] object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(5,1,2,0.76)_72%,#050102_100%)]" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff6f88]">{featured.accent}</p>
                  <h3 className="mt-2 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.2vw,5.4rem)] font-extrabold uppercase leading-[0.82] text-white">
                    {featured.name}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/68">{featured.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#dc143c]/45 bg-[#dc143c]/14 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition group-hover:border-white/34">
                    Open shop rack
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-2">
            {grid.map((item, index) => (
              <motion.article
                key={item.name}
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE, delay: index * 0.04 }}
              >
                <Link
                  href="/shop"
                  className="group block overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.035] p-3 transition hover:-translate-y-0.5 hover:border-[#dc143c]/35 hover:bg-white/[0.055]"
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[0.8rem] bg-black">
                    {item.frontImage ? (
                      <Image
                        src={item.frontImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 22vw"
                        className="object-contain p-1 transition duration-500 group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <div className="pt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">{item.category}</p>
                    <h4 className="mt-1 font-[family-name:var(--font-display)] text-[clamp(1.4rem,2.2vw,2.1rem)] font-extrabold uppercase leading-[0.9] text-white">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#ff6f88]">{item.accent}</p>
                  </div>
                </Link>
              </motion.article>
            ))}

            <div className="rounded-[1rem] border border-dashed border-[#dc143c]/30 bg-black/28 p-5 sm:col-span-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">External storefront</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                {radShopUrl ? "Checkout is connected" : "Add the shop URL when ready"}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/shop" size="sm">View full shop</Button>
                <Button href={radShopUrl ?? "/shop#shop-drop"} variant="outline" size="sm">
                  {radShopUrl ? "Shop external" : "Link pending"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
