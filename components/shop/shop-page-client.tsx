"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { Button } from "@/components/ui";
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

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="shop-icon">
      <path d="M5 3.25H3.5A1.5 1.5 0 0 0 2 4.75v7.75A1.5 1.5 0 0 0 3.5 14h7.75a1.5 1.5 0 0 0 1.5-1.5V11h-1.5v1.5H3.5V4.75H5v-1.5Z" />
      <path d="M8 2v1.5h3.44L6.72 8.22l1.06 1.06 4.72-4.72V8H14V2H8Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="shop-icon">
      <path d="m3.53 2.47 10 10-1.06 1.06-10-10 1.06-1.06Z" />
      <path d="m12.47 2.47 1.06 1.06-10 10-1.06-1.06 10-10Z" />
    </svg>
  );
}

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
      <button
        type="button"
        disabled
        className={`shop-external-link shop-external-link--disabled ${className}`}
        title="Set NEXT_PUBLIC_RAD_SHOP_URL to enable this external shop link."
      >
        <span>Shop link pending</span>
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={`shop-external-link ${className}`}>
      <span>{children}</span>
      <ExternalIcon />
    </a>
  );
}

function ProductImage({
  item,
  priority = false,
  variant = "card",
  image = item.frontImage
}: {
  item: MerchItem;
  priority?: boolean;
  variant?: "hero" | "card" | "mini" | "modal";
  image?: string;
}) {
  return (
    <div className={`shop-product-media shop-product-media--${variant}`}>
      {image ? (
        <Image
          src={image}
          alt={item.name}
          fill
          priority={priority}
          sizes={
            variant === "hero"
              ? "(max-width: 1024px) 62vw, 520px"
              : variant === "modal"
                ? "(max-width: 768px) 92vw, 520px"
                : "(max-width: 768px) 86vw, 24vw"
          }
          className="shop-product-media__image"
        />
      ) : (
        <span className="shop-product-media__fallback">RAD</span>
      )}
      <div className="shop-product-media__wash" aria-hidden="true" />
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

  const heroRackItems = useMemo(
    () => items.filter((item) => item.name !== featuredItem?.name).slice(0, 4),
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
        <section className="shop-hero" aria-labelledby="shop-heading">
          <div className="shop-hero__copy">
            <h1 id="shop-heading" className="shop-hero__title">
              RAD Shop
            </h1>
            <p className="shop-hero__text">
              Official RAD Esports gear and player-kit concepts built for competition, content, and the wild.
            </p>

            <div className="shop-hero__actions">
              <Button href="#shop-drop" size="lg">
                View collection
              </Button>
              <ShopAction item={featuredItem} className="shop-external-link--hero" />
            </div>

            <div className="shop-proof-grid" aria-label="Shop highlights">
              <div>
                <span>Proofs</span>
                <strong>11 Items</strong>
              </div>
              <div>
                <span>Kit</span>
                <strong>Front + Back</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{merchCollection.status}</strong>
              </div>
            </div>
          </div>

          {featuredItem ? (
            <div className="shop-feature-stage" aria-label="Featured RAD kit">
              <button
                type="button"
                className="shop-jersey-stack"
                onClick={() => setSelectedItem(featuredItem)}
              >
                <span className="shop-jersey-stack__back">
                  <ProductImage item={featuredItem} image={featuredItem.backImage} priority variant="hero" />
                </span>
                <span className="shop-jersey-stack__front">
                  <ProductImage item={featuredItem} priority variant="hero" />
                </span>
                <span className="shop-jersey-stack__caption">
                  <span>{featuredItem.name}</span>
                  <strong>Open preview</strong>
                </span>
              </button>

              <div className="shop-hero-rack" aria-label="Featured gear previews">
                {heroRackItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="shop-hero-rack__item"
                    onClick={() => setSelectedItem(item)}
                  >
                    <ProductImage item={item} variant="mini" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <div className="shop-marquee" aria-hidden="true">
          <div className="shop-marquee__track">
            {Array.from({ length: 2 }).map((_, groupIndex) => (
              <span key={groupIndex}>
                RAD Shop / Jersey / Hoodies / Sweatshirts / Pro tees / External checkout /
              </span>
            ))}
          </div>
        </div>

        <section id="shop-drop" className="shop-drop-section" aria-labelledby="shop-drop-heading">
          <div className="shop-section-head">
            <div>
              <p className="shop-kicker">Collection</p>
              <h2 id="shop-drop-heading">Gear rack.</h2>
            </div>
            <p>
              Product previews are embedded directly into the RAD site. Add the external shop URL once the storefront is live and every item routes out for purchase.
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
                style={{ animationDelay: `${index * 45}ms` } as CSSProperties}
              >
                <button
                  type="button"
                  className="shop-product-card__preview"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="shop-product-card__topline">
                    <span>{categoryForItem(item)}</span>
                    <span>{item.accent}</span>
                  </div>
                  <ProductImage item={item} />
                  {item.backImage ? (
                    <span className="shop-product-card__back-tag">Back view included</span>
                  ) : null}
                </button>
                <div className="shop-product-card__body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="shop-product-card__footer">
                    <span>{item.status}</span>
                    <ShopAction item={item} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="shop-service-strip" aria-label="Shop launch notes">
          <div>
            <span>01</span>
            <strong>Embedded proofs</strong>
            <p>Actual merch assets sit inside the RAD page instead of sending people away before they browse.</p>
          </div>
          <div>
            <span>02</span>
            <strong>External checkout</strong>
            <p>Every card is prepared to leave for the purchase page through one public shop URL.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Mobile ready</strong>
            <p>The rack collapses into large product tiles so the gear stays inspectable on phones.</p>
          </div>
        </section>

        {heroRackItems.length > 0 ? (
          <section className="shop-lookbook" aria-labelledby="shop-lookbook-heading">
            <div>
              <p className="shop-kicker">Lookbook</p>
              <h2 id="shop-lookbook-heading">Light / dark.</h2>
            </div>
            <div className="shop-lookbook__rail">
              {heroRackItems.slice(0, 4).map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className="shop-lookbook__item"
                  onClick={() => setSelectedItem(item)}
                >
                  <ProductImage item={item} variant="mini" />
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
            <div className={`shop-modal__media ${selectedItem.backImage ? "shop-modal__media--split" : ""}`}>
              <ProductImage item={selectedItem} variant="modal" />
              {selectedItem.backImage ? (
                <ProductImage item={selectedItem} image={selectedItem.backImage} variant="modal" />
              ) : null}
            </div>
            <div className="shop-modal__content">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="shop-modal__close"
                aria-label="Close preview"
              >
                <CloseIcon />
              </button>
              <p className="shop-kicker">{categoryForItem(selectedItem)} / {selectedItem.accent}</p>
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
              <div className="shop-modal__status">
                <span>Status</span>
                <strong>{selectedItem.status}</strong>
              </div>
              <div className="shop-modal__actions">
                <ShopAction item={selectedItem} />
                <Button href={discordInviteUrl} variant="outline">
                  Drop alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
