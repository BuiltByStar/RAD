import type { Metadata } from "next";
import type { ReactNode } from "react";

import { JerseyToggleViewer } from "@/components/merch/jersey-toggle-viewer";
import { PageShell } from "@/components/page-shell";
import { Container, NoteStack, Section, SectionHeading } from "@/components/ui";
import { merchCollection, merchItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Merch",
  description: "RAD apparel preview, flagship drop direction, and upcoming release details."
};

function MerchCta({
  href,
  label
}: {
  href?: string;
  label?: string;
}) {
  if (!href) {
    return (
      <div className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/[0.04] px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">
        External shop coming soon
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ff0000]/28 bg-[#ff0000]/12 px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#ff0000]/52 hover:bg-[#ff0000]/18"
    >
      {label ?? "Shop the drop"}
    </a>
  );
}

function MerchMetaStrip({
  category,
  status,
  action
}: {
  category: string;
  status: string;
  action: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/52">
          {category}
        </span>
        <span className="rounded-full border border-[#ff0000]/18 bg-[#ff0000]/8 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/66">
          {status}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {action}
      </div>
    </div>
  );
}

export default function MerchPage() {
  const visualMerch = merchItems.filter((item) => item.frontImage && item.backImage);
  const featuredMerch = visualMerch.find((item) => item.featured);
  const supportingVisualMerch = visualMerch.filter((item) => !item.featured);
  const accessoryMerch = merchItems.filter((item) => !item.frontImage || !item.backImage);
  const featuredShopUrl = featuredMerch?.externalUrl ?? merchCollection.shopUrl;
  const featuredShopLabel = featuredMerch?.ctaLabel ?? "Shop the drop";

  return (
    <PageShell
      variant="merch"
      eyebrow="Merch"
      title="Merch"
      description="The current RAD drop, built as a showcase now and ready to route outward when the shop goes live."
      heroImage="/assets/RadBanner1920_1080.png"
      status="Drop 01 // Coming soon"
      note={
        <NoteStack
          items={[
            { label: "Featured", value: merchCollection.spotlight },
            { label: "Status", value: merchCollection.status }
          ]}
        />
      }
    >
      <Section padding="sm">
        <Container>
          <SectionHeading eyebrow="Drop 01" title="Current Drop" />

          <div className="grid gap-8">
            {featuredMerch?.frontImage && featuredMerch.backImage ? (
              <section className="grid gap-5">
                <div className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.03] shadow-[0_22px_80px_-58px_rgba(0,0,0,0.95)]">
                  <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5959]">
                          {featuredMerch.category}
                        </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.8rem)] font-extrabold uppercase leading-[0.92] text-white">
                          {featuredMerch.name}
                        </h2>
                      </div>
                      <p className="max-w-xl text-sm leading-relaxed text-white/62 sm:text-base xl:text-right">
                        {featuredMerch.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <JerseyToggleViewer
                      frontImage={featuredMerch.frontImage}
                      backImage={featuredMerch.backImage}
                      name={featuredMerch.name}
                      status={featuredMerch.status}
                      layout="wide"
                    />
                  </div>

                  <MerchMetaStrip
                    category={featuredMerch.category}
                    status={featuredMerch.status}
                    action={
                      <>
                        <MerchCta href={featuredShopUrl} label={featuredShopLabel} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                          Opens in a new tab when the storefront is live.
                        </span>
                      </>
                    }
                  />
                </div>
              </section>
            ) : null}

            {supportingVisualMerch.length ? (
              <section className="grid gap-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5959]">Collection</p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3.2rem)] font-extrabold uppercase leading-[0.92] text-white">
                      Supporting Pieces
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-white/52">
                    The rest of the drop stays in the same system, just with less noise around each piece.
                  </p>
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                  {supportingVisualMerch.map((item) => (
                    <article
                      key={item.name}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
                    >
                      <div className="border-b border-white/10 px-5 py-5">
                        <div className="flex flex-col gap-4">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5f5f]">
                              {item.category}
                            </p>
                            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold uppercase leading-[0.96] text-white">
                              {item.name}
                            </h3>
                          </div>
                          <p className="max-w-xl text-sm leading-relaxed text-white/58">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-4">
                        <JerseyToggleViewer
                          frontImage={item.frontImage!}
                          backImage={item.backImage!}
                          name={item.name}
                          status={item.status}
                          layout="wide"
                        />
                      </div>

                      <MerchMetaStrip
                        category={item.category}
                        status={item.status}
                        action={
                          item.externalUrl ? (
                            <MerchCta href={item.externalUrl} label={item.ctaLabel ?? "Shop now"} />
                          ) : (
                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                              Storefront not live yet.
                            </span>
                          )
                        }
                      />
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {accessoryMerch.length ? (
              <section className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5959]">Accessories</p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold uppercase leading-[0.94] text-white">
                      More from the drop
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-white/48">
                    Smaller pieces stay visible without competing with the main apparel.
                  </p>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {accessoryMerch.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff6a6a]">
                            {item.category}
                          </p>
                          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none text-white">
                            {item.name}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-black/22 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/60">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
