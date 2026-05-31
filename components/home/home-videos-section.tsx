import Image from "next/image";
import Link from "next/link";

import { FluidContainer } from "@/components/ui/fluid-container";
import type { ContentItem } from "@/lib/content-data";

export function HomeVideosSection({ items }: { items: ContentItem[] }) {
  const videos = items.filter((item) => item.type === "video").slice(0, 5);

  if (!videos.length) return null;

  return (
    <section>
      <FluidContainer>
        <div className="border-x border-neutral-900 px-4 py-12 md:px-6 md:py-16">
          <h2 className="text-2xl font-black uppercase md:text-3xl">Recent videos</h2>
          <div className="mt-8 grid gap-px border border-neutral-900 bg-neutral-900 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group bg-black p-4 transition-colors hover:bg-neutral-950"
              >
                <div className="relative aspect-video overflow-hidden border border-neutral-900">
                  <Image src={item.thumbnail} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                </div>
                <p className="mt-4 text-sm font-bold uppercase leading-snug text-white group-hover:text-[var(--color-blood)]">
                  {item.title}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-neutral-500">
                  {item.tags.slice(0, 2).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </FluidContainer>
    </section>
  );
}
