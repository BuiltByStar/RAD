import Link from "next/link";
import type { ReactNode } from "react";

import type { ContactChannel } from "@/lib/site-data";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  compact?: boolean;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  actionHref,
  actionLabel,
  compact = false
}: SectionHeadingProps) {
  return (
    <div className={`rad-subpage-heading${compact ? " rad-subpage-heading--compact" : ""}`}>
      <div>
        {eyebrow ? <p className="rad-subpage-heading__eyebrow">{eyebrow}</p> : null}
        <h2 className="rad-subpage-heading__title">{title}</h2>
      </div>

      {(description || (actionHref && actionLabel)) ? (
        <div className="rad-subpage-heading__meta">
          {description ? (
            <div className="rad-subpage-heading__description">{description}</div>
          ) : null}
          {actionHref && actionLabel ? (
            <Link href={actionHref} className="rad-subpage-link">
              {actionLabel}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function ContactGrid({ channels }: { channels: ContactChannel[] }) {
  return (
    <div className="rad-contact-grid">
      {channels.map((channel) => {
        const external = channel.href.startsWith("http");

        return (
          <article key={channel.label} className="rad-contact-card">
            <p className="rad-contact-card__label">{channel.label}</p>
            <a
              href={channel.href}
              className="rad-contact-card__value"
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {channel.value}
            </a>
          </article>
        );
      })}
    </div>
  );
}
