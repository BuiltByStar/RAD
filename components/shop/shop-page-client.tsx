"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { Button } from "@/components/ui";
import type { MerchItem } from "@/lib/site-data";
import { discordInviteUrl, merchCollection } from "@/lib/site-data";

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

function ProductImage({
  item,
  priority = false,
  variant = "card"
}: {
  item: MerchItem;
  priority?: boolean;
  variant?: "hero" | "card" | "modal";
}) {
  const image = item.frontImage ?? item.backImage;

  return (
    <div className={`shop-product-media shop-product-media--${variant}`}>
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes={
            variant === "hero"
              ? "(max-width: 1024px) 92vw, 560px"
              : "(max-width: 768px) 92vw, 33vw"
          }
          className="shop-product-media__image"
        />
      ) : null}
      <div className="shop-product-media__wash" aria-hidden="true" />
      <div className="shop-product-media__mark" aria-hidden="true">RAD</div>
    </div>
  );
}

export function ShopPageClient({ items }: ShopPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>("All");
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);

  const featuredItem = useMemo(
    () => items.find((item) => item.featured) ?? items[0] ?? null,
    [items]
  );

  const supportingItems = useMemo(
    () => items.filter((item) => item.name !== featuredItem?.name).slice(0, 3),
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

  return (
    <>
      <div className="shop-shell">
        <div className="shop-shell__ambient shop-shell__ambient--left" aria-hidden="true" />
        <div className="shop-shell__ambient shop-shell__ambient--right" aria-hidden="true" />

        <section className="shop-hero" aria-labelledby="shop-heading">
          <div className="shop-hero__copy">
            <p className="shop-kicker">{merchCollection.title}</p>
            <h1 id="shop-heading" className="shop-hero__title">
              RAD shop.
            </h1>
            <p className="shop-hero__text">
              Future RAD supporter gear and player-kit concepts. Final photos, prices, sizes, and checkout links can land later.
            </p>

            <div className="shop-hero__actions">
              <Button href="#shop-drop">
                View collection
              </Button>
              <Button href={featuredItem?.externalUrl ?? discordInviteUrl} variant="outline">
                Get drop alerts
              </Button>
            </div>

            <div className="shop-proof-grid" aria-label="Shop status">
              <div>
                <span>Drop</span>
                <strong>01</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{merchCollection.status}</strong>
              </div>
              <div>
                <span>Style</span>
                <strong>Player kit</strong>
              </div>
            </div>
          </div>

          {featuredItem ? (
            <div className="shop-feature-stage" aria-label="Featured shop item">
              <div className="shop-feature-frame">
                <button
                  type="button"
                  className="shop-feature-card"
                  onClick={() => setSelectedItem(featuredItem)}
                >
                  <span className="shop-feature-card__signal" aria-hidden="true" />
                  <ProductImage item={featuredItem} priority variant="hero" />
                  <span className="shop-feature-card__content">
                    <span className="shop-feature-card__meta">Featured preview</span>
                    <span className="shop-feature-card__name">{featuredItem.name}</span>
                    <span className="shop-feature-card__description">{featuredItem.accent}</span>
                    <span className="shop-feature-card__footer">
                      <span>{featuredItem.status}</span>
                      <span>Open preview</span>
                    </span>
                  </span>
                </button>

                {supportingItems.length > 0 ? (
                  <div className="shop-mini-rack" aria-label="More shop previews">
                    {supportingItems.slice(0, 2).map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        className="shop-mini-rack__item"
                        onClick={() => setSelectedItem(item)}
                      >
                        <ProductImage item={item} />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>

        <div className="shop-marquee" aria-hidden="true">
          <div className="shop-marquee__track">
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <span key={groupIndex}>
                RAD Shop / Drop alerts / Player essentials / Checkout links coming soon / Supporter gear /
              </span>
            ))}
          </div>
        </div>

        <section className="shop-service-strip" aria-label="Shop launch notes">
          <div>
            <span>01</span>
            <strong>Drop first</strong>
            <p>Built for small, focused launches instead of one oversized hero product.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Photo ready</strong>
            <p>Final product photography can replace the current concept assets cleanly.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Store flexible</strong>
            <p>Each item can route to Discord now or external checkout later.</p>
          </div>
        </section>

        <section id="shop-drop" className="shop-drop-section" aria-labelledby="shop-drop-heading">
          <div className="shop-section-head">
            <div>
              <p className="shop-kicker">Collection</p>
              <h2 id="shop-drop-heading">Drop rack.</h2>
            </div>
            <p>
              Concept-ready product slots now, clean enough to replace with final photos, prices, sizes, and checkout links later.
            </p>
          </div>

          <div className="shop-category-row" aria-label="Filter shop categories">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shop-category ${active ? "shop-category--active" : ""}`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="shop-grid">
            {filteredItems.map((item, index) => (
              <article
                key={item.name}
                className="shop-product-card"
                style={{ animationDelay: `${index * 70}ms` } as CSSProperties}
              >
                <div className="shop-product-card__topline">
                  <span>{categoryForItem(item)}</span>
                  <span>{item.status}</span>
                </div>
                <ProductImage item={item} />
                <div className="shop-product-card__body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="shop-product-card__footer">
                    <span>{item.accent}</span>
                    <button type="button" onClick={() => setSelectedItem(item)}>
                      Preview
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <div className="shop-empty-state">
              No items in this category yet.
            </div>
          ) : null}
        </section>

        {supportingItems.length > 0 ? (
          <section className="shop-lookbook" aria-labelledby="shop-lookbook-heading">
            <div>
              <p className="shop-kicker">Lookbook</p>
              <h2 id="shop-lookbook-heading">Drop looks.</h2>
            </div>
            <div className="shop-lookbook__rail">
              {supportingItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="shop-lookbook__item"
                  onClick={() => setSelectedItem(item)}
                >
                  <ProductImage item={item} variant="card" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {selectedItem ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.name} preview`}
          className="shop-modal"
          onClick={() => setSelectedItem(null)}
        >
          <style>{".keep-scrolling-global{display:none}"}</style>
          <div className="shop-modal__card" onClick={(event) => event.stopPropagation()}>
            <div className="shop-modal__media">
              <ProductImage item={selectedItem} variant="modal" />
            </div>
            <div className="shop-modal__content">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="shop-modal__close"
                aria-label="Close preview"
              >
                x
              </button>
              <p className="shop-kicker">{categoryForItem(selectedItem)} / {selectedItem.accent}</p>
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
              <div className="shop-modal__status">
                <span>Status</span>
                <strong>{selectedItem.status}</strong>
              </div>
              <div className="shop-modal__actions">
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
