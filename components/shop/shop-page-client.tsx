"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui";
import type { MerchItem } from "@/lib/site-data";
import { discordInviteUrl } from "@/lib/site-data";

type ShopCategory = "All" | "Jerseys" | "Apparel" | "Accessories" | "Mousepads";

type ShopPageClientProps = {
  items: MerchItem[];
};

const categories: ShopCategory[] = ["All", "Jerseys", "Apparel", "Accessories", "Mousepads"];

function categoryForItem(item: MerchItem): Exclude<ShopCategory, "All"> {
  const value = `${item.category} ${item.name}`.toLowerCase();
  if (value.includes("jersey")) return "Jerseys";
  if (value.includes("apparel") || value.includes("essentials")) return "Apparel";
  if (value.includes("mousepad") || value.includes("desk mat")) return "Mousepads";
  return "Accessories";
}

export function ShopPageClient({ items }: ShopPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("All");
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => categoryForItem(item) === activeCategory);
  }, [activeCategory, items]);

  useEffect(() => {
    if (!selectedItem) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItem]);

  return (
    <>
      <section className="border-b border-white/10 bg-[#171719] px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[320px] sm:max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[color:var(--color-rad-hi)]">
            RAD Storefront
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(4rem,10vw,7.6rem)] font-black uppercase leading-[0.82] tracking-[-0.055em] text-[color:var(--color-rad-hi)] drop-shadow-[0_0_28px_rgba(220,20,60,0.36)]">
            Shop
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg">
            Official RAD merchandise direction. Real products, pricing, and checkout links can drop in when the store goes live.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050505] px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(760px_360px_at_50%_0%,rgba(220,20,60,0.14),transparent_62%)]"
        />

        <div className="relative mx-auto max-w-[320px] sm:max-w-[1200px]">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`h-12 rounded-[0.7rem] border px-6 text-[11px] font-black uppercase tracking-[0.14em] transition duration-300 sm:min-w-[112px] ${
                    active
                      ? "border-[color:var(--color-rad)] bg-[color:var(--color-rad)]/12 text-[color:var(--color-rad-hi)] shadow-[0_14px_34px_rgba(220,20,60,0.16)]"
                      : "border-white/10 bg-white/[0.035] text-white/58 hover:border-white/22 hover:bg-white/[0.06] hover:text-white"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-rad)] focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.name}
                className="group overflow-hidden rounded-[0.9rem] border border-white/10 bg-[#101012] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-rad)]/34 hover:bg-[#151519]"
              >
                <div className="relative min-h-[270px] overflow-hidden bg-[linear-gradient(180deg,rgba(220,20,60,0.16),rgba(255,255,255,0.025)_46%,rgba(0,0,0,0.72))]">
                  {item.frontImage ? (
                    <Image
                      src={item.frontImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-26 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-36"
                    />
                  ) : null}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[color:var(--color-rad)]/14 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid aspect-square w-32 place-items-center rounded-[1rem] border border-white/10 bg-black/28 backdrop-blur-sm">
                      <span className="font-[family-name:var(--font-display)] text-3xl font-black uppercase text-white/84">
                        RAD
                      </span>
                    </div>
                  </div>
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/56 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/62">
                    {categoryForItem(item)}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-[0.9] text-white">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm font-black uppercase tracking-[0.08em] text-[color:var(--color-rad-hi)]">
                    {item.status}
                  </p>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/56">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[0.55rem] bg-[color:var(--color-rad)] px-5 text-[11px] font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-rad-hi)]"
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="mt-12 rounded-[1rem] border border-white/10 bg-white/[0.035] p-8 text-center text-white/58">
              No items in this category yet.
            </div>
          ) : null}
        </div>
      </section>

      {selectedItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.name} preview`}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/78 p-4 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <style>{".keep-scrolling-global{display:none}"}</style>
          <div
            className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[1.35rem] border border-[color:var(--color-rad)]/34 bg-[#100b0d] shadow-[0_30px_120px_rgba(0,0,0,0.6)] lg:grid-cols-[1fr_1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[300px] bg-[linear-gradient(145deg,rgba(220,20,60,0.22),rgba(255,255,255,0.035)_48%,rgba(0,0,0,0.76))]">
              {selectedItem.frontImage ? (
                <Image
                  src={selectedItem.frontImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-32"
                />
              ) : null}
              <div className="absolute inset-0 grid place-items-center p-8">
                <div className="grid aspect-square w-44 place-items-center rounded-[1.1rem] border border-[color:var(--color-rad)]/48 bg-black/32">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-black uppercase tracking-[0.22em] text-[color:var(--color-rad-hi)]">
                    RAD
                  </span>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col justify-center p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-5 top-5 text-3xl leading-none text-white/48 transition hover:text-white"
                aria-label="Close preview"
              >
                x
              </button>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-rad-hi)]">
                {categoryForItem(selectedItem)} / {selectedItem.accent}
              </p>
              <h2 className="mt-4 pr-8 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.6rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-white">
                {selectedItem.name}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/64">{selectedItem.description}</p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-3xl font-black uppercase leading-none text-[color:var(--color-rad-hi)]">
                {selectedItem.status}
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Button href={selectedItem.externalUrl ?? discordInviteUrl}>Get notified</Button>
                <Button href="/contact" variant="outline">Contact RAD</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
