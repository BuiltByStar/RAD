import Image from "next/image";
import Link from "next/link";

import { FluidContainer } from "@/components/ui/fluid-container";
import type { ContentItem } from "@/lib/content-data";

export function HomeNewsSection({ items }: { items: ContentItem[] }) {
  const news = items.slice(0, 3);

  if (!news.length) return null;

  return (
    <section>
      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-black uppercase md:text-3xl">Featured news</h2>
            <Link
              href="/content"
              className="text-xs font-bold uppercase tracking-widest text-[var(--color-blood)] transition-opacity hover:opacity-70"
            >
              All posts →
            </Link>
          </div>
          <div className="mt-8 grid gap-px border border-neutral-900 bg-neutral-900 lg:grid-cols-3">
            {news.map((item) => (
              <Link
                key={item.id}
                href={item.url.startsWith("http") ? item.url : "/content"}
                target={item.url.startsWith("http") ? "_blank" : undefined}
                rel={item.url.startsWith("http") ? "noreferrer" : undefined}
                className="group flex flex-col bg-black"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-neutral-900">
                  <Image src={item.thumbnail} alt="" fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-black uppercase leading-tight text-white group-hover:text-[var(--color-blood)]">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-3 line-clamp-3 text-sm text-neutral-500">{item.description}</p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </FluidContainer>
    </section>
  );
}
