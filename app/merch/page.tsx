import type { Metadata } from "next";

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
              <section className="grid gap-5 xl:grid-cols-[minmax(0,1.28fr)_minmax(320px,0.72fr)] xl:items-start">
                <div className="rounded-[1.65rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,0,0,0.04))] p-4 shadow-[0_38px_140px_-70px_rgba(255,0,0,0.55)] sm:p-5">
                  <JerseyToggleViewer
                    frontImage={featuredMerch.frontImage}
                    backImage={featuredMerch.backImage}
                    name={featuredMerch.name}
                    status={featuredMerch.status}
                    layout="wide"
                  />
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5959]">
                      {featuredMerch.category}
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.9rem,5vw,5.2rem)] font-extrabold uppercase leading-[0.9] text-white">
                      {featuredMerch.name}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/64 sm:text-base">
                      {featuredMerch.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <MerchCta href={featuredShopUrl} label={featuredShopLabel} />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        Opens in a new tab when the storefront is live.
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    {[
                      { label: "Item", value: featuredMerch.name },
                      { label: "Views", value: "Front + back" },
                      { label: "Status", value: featuredMerch.status }
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/10 bg-black/22 px-4 py-4"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/36">
                          {item.label}
                        </p>
                        <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold uppercase leading-none text-white">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
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
                      className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))]"
                    >
                      <div className="border-b border-white/10 px-5 py-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff5f5f]">
                              {item.category}
                            </p>
                            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase leading-[0.94] text-white">
                              {item.name}
                            </h3>
                          </div>
                          <span className="rounded-full border border-[#ff0000]/18 bg-[#ff0000]/8 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/66">
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/58">
                          {item.description}
                        </p>
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
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {accessoryMerch.length ? (
              <section className="rounded-[1.25rem] border border-white/10 bg-black/18 px-5 py-5">
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
