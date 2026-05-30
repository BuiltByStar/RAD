"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { merchItems, radShopUrl } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeMerchSpotlight() {
  const reduced = useReducedMotion();
  const featured = merchItems.find((item) => item.featured) ?? merchItems[0];
  const grid = merchItems.filter((item) => item.name !== featured?.name).slice(0, 6);

  if (!featured) return null;

  return (
    <section id="shop" className="rad-section rad-dot-surface relative overflow-hidden bg-[#030304] py-14 sm:py-20">
      <Container size="xl" className="relative z-10">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_0.58fr] lg:items-end lg:justify-between">
          <div>
            <p className="rad-kicker">Supporter gear</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.01em] text-white">
              Wear the org.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-white/60">
            Inspect the proof set here, then move into the full shop rack for checkout.
          </p>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.article
            initial={false}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.52, ease: EASE }}
            className="group relative overflow-hidden bg-[#030304] rad-cut"
          >
            <Link href="/shop" className="block">
              <div className="relative min-h-[34rem]">
                {featured.backImage ? (
                  <Image
                    src={featured.backImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 48vw, 26vw"
                    className="!left-auto !right-0 !top-0 !h-[88%] !w-[46%] object-cover opacity-62 transition-opacity duration-500 group-hover:opacity-72"
                  />
                ) : null}
                <Image
                  src={featured.frontImage ?? ""}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 1024px) 78vw, 46vw"
                  className="!left-0 !top-[4%] !h-[91%] !w-[70%] object-cover transition-opacity duration-500 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(5,1,2,0.78)_72%,#050102_100%)]" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="rad-kicker text-[#ff6f88]">{featured.accent}</p>
                  <h3 className="mt-3 max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.2vw,5.4rem)] font-extrabold uppercase leading-[0.82] text-white">
                    {featured.name}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/64">{featured.description}</p>
                  <span className="rad-link mt-5">Open shop rack →</span>
                </div>
              </div>
            </Link>
          </motion.article>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {grid.map((item, index) => (
              <motion.article
                key={item.name}
                initial={false}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: EASE, delay: index * 0.03 }}
                className="bg-[#030304]"
              >
                <Link href="/shop" className="rad-panel-interactive block h-full border-0 bg-transparent p-3">
                  <div className="relative aspect-[5/4] overflow-hidden bg-black">
                    {item.frontImage ? (
                      <Image
                        src={item.frontImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 22vw"
                        className="object-contain p-1"
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

            <div className="border border-dashed border-[#dc143c]/28 bg-[#030304] p-5 sm:col-span-2">
              <p className="rad-kicker">External storefront</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white">
                {radShopUrl ? "Checkout is connected" : "Add the shop URL when ready"}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="/shop" size="sm">
                  View full shop
                </Button>
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
