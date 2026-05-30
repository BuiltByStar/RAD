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
            <h1 className="max-w-[7ch] font-[family-name:var(--font-display)] text-[clamp(4.4rem,10vw,10.5rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.01em] text-white">
              RAD
              <span className="block text-[#dc143c]">Shop</span>
            </h1>

            <p className="mt-5 max-w-[30rem] text-base leading-relaxed text-white/72 sm:text-lg">
              The official RAD gear lane is now built into the site: jersey proof, pro tees, hoodies, sweatshirts, and direct external checkout routing when the store URL is live.
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

            <dl className="mt-8 grid max-w-2xl gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl">
                <dt className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  {merchItems.length}
                </dt>
                <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                  Gear proofs
                </dd>
              </div>
              <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl">
                <dt className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  Kit
                </dt>
                <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                  Front + back
                </dd>
              </div>
              <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-xl">
                <dt className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl">
                  {stats[0]?.value}
                </dt>
                <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
                  Since launch
                </dd>
              </div>
            </dl>
          </motion.div>

          {featured ? (
            <motion.div
              initial={false}
              animate={reduced ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
              className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(9rem,0.28fr)]"
            >
              <a
                href="/shop"
                className="group relative min-h-[30rem] overflow-hidden rounded-[1.35rem] border border-white/12 bg-black/54 shadow-[0_34px_110px_-58px_rgba(220,20,60,0.72)] sm:min-h-[38rem]"
              >
                {featured.backImage ? (
                  <Image
                    src={featured.backImage}
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1024px) 72vw, 34vw"
                    className="absolute !left-auto !right-0 !top-0 !h-[88%] !w-[46%] object-cover object-center opacity-70 transition duration-700 group-hover:scale-[1.02]"
                  />
                ) : null}
                <Image
                  src={featured.frontImage ?? assets.shop.jerseyFront}
                  alt={featured.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 82vw, 42vw"
                  className="!left-0 !top-[6%] !h-[90%] !w-[70%] object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(0,0,0,0.82)_100%),radial-gradient(circle_at_28%_42%,transparent_0_42%,rgba(0,0,0,0.42)_78%)]" />
                <div className="absolute left-5 top-5 rounded-full border border-[#dc143c]/35 bg-[#dc143c]/14 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  {merchCollection.status}
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff6f88]">{featured.accent}</p>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,4.7rem)] font-extrabold uppercase leading-[0.82] text-white">
                    {featured.name}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/68">{featured.description}</p>
                </div>
              </a>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {railItems.map((item) => (
                  <a
                    key={item.name}
                    href="/shop"
                    className="group grid grid-cols-[6.5rem_1fr] items-center gap-3 overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.045] p-2 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#dc143c]/38 hover:bg-white/[0.07] lg:grid-cols-1"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-[0.75rem] bg-black">
                      {item.frontImage ? (
                        <Image
                          src={item.frontImage}
                          alt=""
                          fill
                          sizes="140px"
                          className="object-contain p-1 transition duration-500 group-hover:scale-[1.04]"
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
