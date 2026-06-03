"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import type { MerchItem } from "@/lib/site-data";
import { discordInviteUrl, merchCollection } from "@/lib/site-data";

type ShopCategory = "All" | "Jerseys" | "Light Gear" | "Dark Gear" | "Women";

type ShopPageClientProps = {
  items: MerchItem[];
};

const categories: ShopCategory[] = ["All", "Jerseys", "Light Gear", "Dark Gear", "Women"];

function categoryForItem(item: MerchItem): Exclude<ShopCategory, "All"> {
  if (item.category === "Jerseys") return "Jerseys";
  if (item.category === "Women") return "Women";
  if (item.category === "Dark Gear") return "Dark Gear";
  return "Light Gear";
}

function shopHrefForItem(item?: MerchItem | null) {
  return item?.externalUrl ?? merchCollection.shopUrl;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("size-3.5 shrink-0 fill-current", className)}>
      <path d="M5 3.25H3.5A1.5 1.5 0 0 0 2 4.75v7.75A1.5 1.5 0 0 0 3.5 14h7.75a1.5 1.5 0 0 0 1.5-1.5V11h-1.5v1.5H3.5V4.75H5v-1.5Z" />
      <path d="M8 2v1.5h3.44L6.72 8.22l1.06 1.06 4.72-4.72V8H14V2H8Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
      <path d="m3.53 2.47 10 10-1.06 1.06-10-10 1.06-1.06Z" />
      <path d="m12.47 2.47 1.06 1.06-10 10-1.06-1.06 10-10Z" />
    </svg>
  );
}

const externalLinkClass =
  "inline-flex min-h-10 items-center justify-center gap-2 border border-[var(--color-blood)]/60 bg-[var(--color-blood)]/10 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-[transform,background,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-[var(--color-blood)]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blood)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/[0.06] disabled:text-white/45 disabled:hover:translate-y-0";

function ShopAction({
  item,
  className = "",
  children = "Shop external"
}: {
  item?: MerchItem | null;
  className?: string;
  children?: string;
}) {
  const href = shopHrefForItem(item);

  if (!href) {
    return (
      <button type="button" disabled className={cn(externalLinkClass, className)}>
        <span>Shop link pending</span>
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={cn(externalLinkClass, className)}>
      <span>{children}</span>
      <ExternalIcon />
    </a>
  );
}

function ProductImage({
  item,
  priority = false,
  image = item.frontImage,
  className,
  imageClassName,
  sizes
}: {
  item: MerchItem;
  priority?: boolean;
  image?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#050505]",
        "bg-[radial-gradient(circle_at_50%_18%,rgba(229,6,47,0.18),transparent_42%)]",
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={item.name}
          fill
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 86vw, 24vw"}
          className={cn("object-cover object-center", imageClassName)}
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center font-[family-name:var(--font-display)] text-4xl font-black text-white/25">
          RAD
        </span>
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.72)_100%)]"
        aria-hidden
      />
    </div>
  );
}

function FeaturedDropHero({
  featuredItem,
  itemCount,
  onPreview,
  reducedMotion
}: {
  featuredItem: MerchItem;
  itemCount: number;
  onPreview: () => void;
  reducedMotion: boolean;
}) {
  return (
    <section
      className="relative -mx-4 overflow-hidden border-b border-white/10 sm:-mx-6 lg:-mx-8"
      aria-label="Featured drop"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(229,6,47,0.28),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(255,255,255,0.06),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(180deg,black,transparent_85%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_49.7%,rgba(229,6,47,0.12)_50%,transparent_50.3%)]"
        aria-hidden
      />

      <div className="relative grid min-h-[min(88vh,52rem)] grid-cols-1 items-end gap-8 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12 lg:px-8 lg:pb-14 lg:pt-10">
        <div className="flex flex-col justify-end lg:py-8">
          <p className="rad-kicker">Featured drop</p>
          <h2 className="mt-4 max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-white">
            {featuredItem.name}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            {featuredItem.description}
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
            <div>
              <dt className="sr-only">Proof count</dt>
              <dd>
                <span className="text-[var(--color-rad-soft)]">{itemCount}</span> proofs
              </dd>
            </div>
            <div>
              <dt className="sr-only">Kit views</dt>
              <dd>Front + back</dd>
            </div>
            <div>
              <dt className="sr-only">Status</dt>
              <dd className="text-white/70">{merchCollection.status}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="#shop-drop" size="lg">
              View collection
            </Button>
            <ShopAction item={featuredItem} className="min-h-12 px-5" />
          </div>
        </div>

        <button
          type="button"
          onClick={onPreview}
          className="group relative mx-auto aspect-[4/5] w-full max-w-xl cursor-pointer border-0 bg-transparent p-0 text-left lg:max-w-none lg:justify-self-end"
          aria-label={`Preview ${featuredItem.name}`}
        >
          <span
            className={cn(
              "absolute inset-[8%_28%_2%_0] z-[2] overflow-hidden border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.65)] transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:border-[var(--color-blood)]/50",
              !reducedMotion && "motion-safe:group-hover:-translate-y-2"
            )}
          >
            <ProductImage
              item={featuredItem}
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="h-full min-h-[20rem] sm:min-h-[26rem] lg:min-h-[32rem]"
            />
          </span>
          {featuredItem.backImage ? (
            <span
              className={cn(
                "absolute inset-[0_0_6%_32%] z-[1] rotate-[2deg] overflow-hidden border border-white/10 opacity-85 shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-[transform,border-color,opacity] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:border-white/25",
                !reducedMotion && "motion-safe:group-hover:translate-x-3"
              )}
            >
              <ProductImage
                item={featuredItem}
                image={featuredItem.backImage}
                priority
                sizes="(max-width: 1024px) 90vw, 520px"
                className="h-full min-h-[20rem] sm:min-h-[26rem] lg:min-h-[32rem]"
              />
            </span>
          ) : null}

          <span className="absolute bottom-3 left-3 right-[28%] z-[3] flex items-center justify-between gap-3 border border-white/15 bg-black/60 px-4 py-3 backdrop-blur-md">
            <span className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              {featuredItem.accent}
            </span>
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-rad-soft)]">
              Open preview
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}

function LookbookRail({
  items,
  onSelect
}: {
  items: MerchItem[];
  onSelect: (item: MerchItem) => void;
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-b border-white/10 py-10 sm:py-12" aria-labelledby="shop-lookbook-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="rad-kicker">Lookbook</p>
          <h2
            id="shop-lookbook-heading"
            className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl"
          >
            Light / dark
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-xs leading-relaxed text-white/45 sm:block">
          Scroll the rack — tap any piece for front and back preview.
        </p>
      </div>

      <div className="-mx-4 flex gap-px overflow-x-auto overscroll-x-contain bg-neutral-900 px-4 pb-1 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {items.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelect(item)}
            className="group relative w-[min(72vw,16rem)] shrink-0 snap-start border-0 bg-black text-left transition-[transform,box-shadow] duration-300 hover:z-10 hover:shadow-[0_0_0_1px_var(--color-blood)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blood)] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-safe:hover:-translate-y-1"
          >
            <ProductImage
              item={item}
              className="aspect-[3/4] w-full"
              sizes="16rem"
              imageClassName="opacity-90 transition-[transform,opacity] duration-500 group-hover:scale-105 group-hover:opacity-100"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-4 pt-16">
              <span className="block font-[family-name:var(--font-display)] text-lg font-extrabold uppercase leading-tight tracking-tight text-white">
                {item.name}
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
                {categoryForItem(item)}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductTile({
  item,
  index,
  onPreview,
  reducedMotion
}: {
  item: MerchItem;
  index: number;
  onPreview: () => void;
  reducedMotion: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col bg-black",
        !reducedMotion && "motion-safe:animate-[shop-tile-rise_520ms_var(--ease-out-expo)_both]"
      )}
      style={reducedMotion ? undefined : { animationDelay: `${index * 40}ms` }}
    >
      <button
        type="button"
        onClick={onPreview}
        className="relative block w-full overflow-hidden border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-blood)]"
        aria-label={`Preview ${item.name}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <ProductImage
            item={item}
            className="absolute inset-0 h-full w-full"
            imageClassName={cn(
              "transition-opacity duration-500",
              item.backImage && "group-hover:opacity-0 motion-reduce:group-hover:opacity-100"
            )}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {item.backImage ? (
            <ProductImage
              item={item}
              image={item.backImage}
              className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-0"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : null}

          <div className="absolute inset-x-0 top-0 z-10 flex justify-between gap-2 p-3">
            <span className="border border-white/10 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
              {categoryForItem(item)}
            </span>
            {item.backImage ? (
              <span className="border border-white/10 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100">
                Back view
              </span>
            ) : null}
          </div>
        </div>
      </button>

      <div className="flex flex-1 flex-col border-t border-neutral-900 p-4 sm:p-5">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-2xl">
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-white/50 sm:text-sm">{item.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-rad-soft)]">
            {item.status}
          </span>
          <ShopAction item={item} className="min-h-9 px-3 text-[9px]" />
        </div>
      </div>
    </article>
  );
}

function ProductModal({
  item,
  onClose
}: {
  item: MerchItem;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} preview`}
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <style>{".keep-scrolling-global{display:none}"}</style>
      <div
        className="grid w-full max-w-5xl overflow-hidden border border-[var(--color-blood)]/35 bg-[#09090b] shadow-[0_32px_100px_rgba(0,0,0,0.7)] motion-safe:animate-[shop-modal-in_480ms_var(--ease-out-expo)_both] lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={cn("grid min-h-[18rem] bg-black", item.backImage && "sm:grid-cols-2")}>
          <ProductImage
            item={item}
            className="min-h-[16rem] sm:min-h-[24rem]"
            imageClassName="object-contain p-4 sm:p-6"
            sizes="(max-width: 768px) 92vw, 480px"
          />
          {item.backImage ? (
            <ProductImage
              item={item}
              image={item.backImage}
              className="min-h-[16rem] border-t border-white/10 sm:min-h-[24rem] sm:border-l sm:border-t-0"
              imageClassName="object-contain p-4 sm:p-6"
              sizes="(max-width: 768px) 92vw, 480px"
            />
          ) : null}
        </div>

        <div className="relative flex flex-col justify-center p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid size-10 place-items-center border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blood)]"
            aria-label="Close preview"
          >
            <CloseIcon />
          </button>

          <p className="rad-kicker">
            {categoryForItem(item)} / {item.accent}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-4xl">
            {item.name}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{item.description}</p>

          <div className="mt-6 flex items-center justify-between gap-4 border-y border-white/10 py-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">Status</span>
            <strong className="font-[family-name:var(--font-display)] text-lg uppercase text-[var(--color-rad-soft)]">
              {item.status}
            </strong>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ShopAction item={item} className="w-full" />
            <Button href={discordInviteUrl} variant="outline" className="w-full">
              Drop alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyShopBar({
  visible,
  featuredItem
}: {
  visible: boolean;
  featuredItem: MerchItem | null;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-lg transition-[transform,opacity] duration-300 ease-[var(--ease-out-expo)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">RAD Shop</p>
          <p className="truncate font-[family-name:var(--font-display)] text-sm font-extrabold uppercase text-white sm:text-base">
            {featuredItem?.name ?? "Official gear"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button href="#shop-drop" size="sm" variant="ghost" className="hidden sm:inline-flex">
            Browse
          </Button>
          <ShopAction item={featuredItem} className="min-h-9 px-3 text-[9px]" />
        </div>
      </div>
    </div>
  );
}

export function ShopPageClient({ items }: ShopPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("All");
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const featuredItem = useMemo(
    () => items.find((item) => item.featured) ?? items[0] ?? null,
    [items]
  );

  const lookbookItems = useMemo(
    () => items.filter((item) => item.name !== featuredItem?.name).slice(0, 8),
    [featuredItem?.name, items]
  );

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

  useEffect(() => {
    const node = heroSentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { rootMargin: "-20% 0px 0px 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="relative isolate overflow-hidden bg-black text-white">
        {featuredItem ? (
          <>
            <FeaturedDropHero
              featuredItem={featuredItem}
              itemCount={items.length}
              onPreview={() => setSelectedItem(featuredItem)}
              reducedMotion={reducedMotion}
            />
            <div ref={heroSentinelRef} className="h-px" aria-hidden />
          </>
        ) : null}

        <LookbookRail items={lookbookItems} onSelect={setSelectedItem} />

        <section id="shop-drop" className="scroll-mt-24 py-12 sm:py-16" aria-labelledby="shop-drop-heading">
          <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(16rem,0.55fr)] lg:items-end">
            <div>
              <p className="rad-kicker">Collection</p>
              <h2
                id="shop-drop-heading"
                className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold uppercase leading-[0.88] tracking-tight text-white"
              >
                Gear rack
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-white/55 lg:text-right">
              Embedded proofs on-site — every tile routes to external checkout when the storefront is live.
            </p>
          </div>

          <div
            className="sticky top-[calc(var(--header-height,4rem)+0.5rem)] z-20 -mx-4 mb-8 flex gap-2 overflow-x-auto border-b border-white/10 bg-black/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            aria-label="Filter shop categories"
          >
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "shrink-0 border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition-[background,border-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blood)] focus-visible:ring-offset-2 focus-visible:ring-offset-black motion-safe:hover:-translate-y-0.5",
                    active
                      ? "border-[var(--color-blood)]/60 bg-[var(--color-blood)]/15 text-white"
                      : "border-white/12 bg-white/[0.04] text-white/55 hover:border-white/25 hover:text-white"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-px border border-neutral-800 bg-neutral-800 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <ProductTile
                key={item.name}
                item={item}
                index={index}
                onPreview={() => setSelectedItem(item)}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <p className="mt-8 border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/55">
              No items in this category yet.
            </p>
          ) : null}
        </section>

        <section className="border-t border-white/10 py-12 sm:py-14" aria-label="Shop notes">
          <div className="grid gap-px border border-neutral-800 bg-neutral-800 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Embedded proofs",
                copy: "Merch assets live inside RAD so supporters inspect kit before checkout."
              },
              {
                num: "02",
                title: "External checkout",
                copy: "One shop URL powers every product tile when the storefront goes live."
              },
              {
                num: "03",
                title: "Mobile ready",
                copy: "Large tiles, horizontal lookbook, and sticky shop CTA on every screen."
              }
            ].map((note) => (
              <div key={note.num} className="bg-black p-5 sm:p-6">
                <span className="font-[family-name:var(--font-display)] text-2xl font-black text-[var(--color-rad-soft)]">
                  {note.num}
                </span>
                <strong className="mt-3 block font-[family-name:var(--font-display)] text-lg font-extrabold uppercase leading-tight text-white sm:text-xl">
                  {note.title}
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{note.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <StickyShopBar visible={stickyVisible} featuredItem={featuredItem} />

      {selectedItem ? <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} /> : null}
    </>
  );
}
