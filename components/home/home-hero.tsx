"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { assets } from "@/lib/assets";
import { merchCollection, merchItems, radShopUrl, stats } from "@/lib/site-data";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HomeHero() {
  const reduced = useReducedMotion();
  const featured = merchItems.find((item) => item.featured) ?? merchItems[0];
  const railItems = merchItems.filter((item) => item.name !== featured?.name).slice(0, 4);

  return (
    <section className="rad-dot-surface relative isolate overflow-hidden border-b border-white/10 bg-[#030304] pt-20 sm:pt-24">
      <div
        aria-hidden
        className="absolute inset-0 z-[-5] bg-[radial-gradient(48%_38%_at_78%_12%,rgba(220,20,60,0.16),transparent_68%),linear-gradient(180deg,#030304_0%,#08080a_52%,#030304_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 z-[-3] w-[42vw] bg-[linear-gradient(112deg,transparent_0_36%,rgba(220,20,60,0.1)_36.2%_36.6%,transparent_37%_100%)]"
      />

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[min(760px,calc(100svh-5rem))] gap-8 pb-10 pt-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <motion.div
            initial={false}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="min-w-0 max-w-3xl"
          >
            <p className="rad-kicker">Official gear</p>
            <h1 className="mt-4 max-w-[7ch] font-[family-name:var(--font-display)] text-[clamp(4.4rem,10vw,10.5rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.01em] text-white">
              RAD
              <span className="block text-[#dc143c]">Shop</span>
            </h1>

            <p className="mt-5 max-w-[30rem] text-base leading-relaxed text-white/68 sm:text-lg">
              Jersey proof, pro tees, hoodies, and sweatshirts — inspect the collection here, then checkout when the storefront link is live.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/shop" size="lg" className="min-w-[190px]">
                View collection
              </Button>
              <Button
                href={radShopUrl ?? "/shop#shop-drop"}
                variant="outline"
                size="lg"
                className="min-w-[190px]"
              >
                {radShopUrl ? "Shop external" : "Shop link pending"}
              </Button>
            </div>

            <dl className="mt-8 grid max-w-2xl gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              <div className="rad-panel bg-[#030304] px-4 py-3">
                <dt className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  {merchItems.length}
                </dt>
                <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  Gear proofs
                </dd>
              </div>
              <div className="rad-panel bg-[#030304] px-4 py-3">
                <dt className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  Kit
                </dt>
                <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  Front + back
                </dd>
              </div>
              <div className="rad-panel bg-[#030304] px-4 py-3">
                <dt className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  {stats[0]?.value}
                </dt>
                <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/48">
                  Since launch
                </dd>
              </div>
            </dl>
          </motion.div>

          {featured ? (
            <motion.div
              initial={false}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
              className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-[minmax(0,1fr)_minmax(9rem,0.28fr)]"
            >
              <a
                href="/shop"
                className="group relative min-h-[30rem] overflow-hidden bg-[#030304] sm:min-h-[38rem]"
              >
                {featured.backImage ? (
                  <Image
                    src={featured.backImage}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 72vw, 34vw"
                    className="absolute !left-auto !right-0 !top-0 !h-[88%] !w-[46%] object-cover object-center opacity-70 transition-opacity duration-500 group-hover:opacity-80"
                  />
                ) : null}
                <Image
                  src={featured.frontImage ?? assets.shop.jerseyFront}
                  alt={featured.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 82vw, 42vw"
                  className="!left-0 !top-[6%] !h-[90%] !w-[70%] object-cover object-center transition-opacity duration-500 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.88)_100%)]" />
                <span className="rad-tag absolute left-5 top-5 border-[#dc143c]/35 bg-[#dc143c]/12 text-white">
                  {merchCollection.status}
                </span>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="rad-kicker text-[#ff6f88]">{featured.accent}</p>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.7rem)] font-extrabold uppercase leading-[0.82] text-white">
                    {featured.name}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/64">{featured.description}</p>
                </div>
              </a>

              <div className="rad-divide-y grid bg-[#030304] sm:grid-cols-2 lg:grid-cols-1">
                {railItems.map((item) => (
                  <a
                    key={item.name}
                    href="/shop"
                    className="rad-panel-interactive grid grid-cols-[6.5rem_1fr] items-center gap-3 border-0 border-b border-white/10 bg-transparent p-3 transition-colors last:border-b-0 lg:grid-cols-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-black">
                      {item.frontImage ? (
                        <Image
                          src={item.frontImage}
                          alt=""
                          fill
                          sizes="140px"
                          className="object-contain p-1"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff6f88]">{item.category}</p>
                      <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none text-white">
                        {item.name}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
