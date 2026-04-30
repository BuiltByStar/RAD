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
            className="group relative overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,0,0,0.03))] p-4 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-[color:var(--color-rad)]/34 hover:shadow-[0_20px_46px_-34px_rgba(255,0,0,0.54)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-rad)]/36 to-transparent"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-rad-hi)]">
              {channel.label}
            </p>
            <a
              href={channel.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="mt-2 block truncate text-sm text-white/82 transition-colors hover:text-white"
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
