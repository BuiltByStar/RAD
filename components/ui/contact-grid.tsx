import type { ContactChannel } from "@/lib/site-data";

import { cn } from "./cn";

export function ContactGrid({
  channels,
  className
}: {
  channels: ContactChannel[];
  className?: string;
}) {
  return (
    <div className={cn("mt-6 grid gap-3 sm:grid-cols-2", className)}>
      {channels.map((channel) => {
        const external = channel.href.startsWith("http");
        return (
          <article
            key={channel.label}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[.03] p-4 transition-colors hover:border-white/25 hover:bg-white/[.05]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-rad-hi)]">
              {channel.label}
            </p>
            <a
              href={channel.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="mt-2 block truncate text-sm text-white transition-colors hover:text-white/80"
            >
              {channel.value}
              <span
                aria-hidden
                className="ml-1 inline-block translate-y-[-1px] transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </article>
        );
      })}
    </div>
  );
}
