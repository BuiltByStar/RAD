import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type {
  ContactChannel,
  Milestone,
  OrgValue,
  Partner,
  Person,
  Team
} from "@/lib/site-data";
import type { PostMeta } from "@/lib/posts";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  align?: "split" | "stacked";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  align = "split"
}: SectionHeadingProps) {
  return (
    <div className={`rad-section__head${align === "stacked" ? " rad-section__head--stacked" : ""}`}>
      <div>
        {eyebrow ? <p className="rad-kicker">{eyebrow}</p> : null}
        <h2 className="rad-section__title">{title}</h2>
      </div>

      {(description || (actionHref && actionLabel)) ? (
        <div className="rad-section__meta">
          {description ? <div className="rad-section__copy">{description}</div> : null}
          {actionHref && actionLabel ? (
            <Link href={actionHref} className="rad-button rad-button--ghost">
              {actionLabel}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function StatStrip({
  items
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <div className="rad-stat-strip" data-reveal>
      {items.map((item) => (
        <article key={item.label} className="rad-stat-strip__item">
          <span className="rad-stat-strip__value">{item.value}</span>
          <span className="rad-stat-strip__label">{item.label}</span>
        </article>
      ))}
    </div>
  );
}

export function TeamSpotlight({ team }: { team: Team }) {
  return (
    <article className="rad-spotlight" data-reveal>
      <div className="rad-spotlight__media">
        <Image
          src="/assets/RadPlayerBannerPNG8.png"
          alt="RAD roster banner"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rad-spotlight__image"
        />
      </div>
      <div className="rad-spotlight__body">
        <p className="rad-kicker">Featured Division</p>
        <h3 className="rad-card__title">{team.name}</h3>
        <p className="rad-copy">{team.description}</p>
        <div className="rad-inline-meta">
          <span className="rad-badge">{team.status}</span>
          <Link href="/roster" className="rad-text-link">
            View current lineup
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PersonGrid({
  people,
  mode = "player",
  linkToRoster = false
}: {
  people: Person[];
  mode?: "player" | "staff";
  linkToRoster?: boolean;
}) {
  if (people.length === 0) {
    return (
      <div className="rad-empty-state" data-reveal>
        <p className="rad-copy">
          No {mode === "player" ? "players" : "staff"} have been published yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rad-person-grid">
      {people.map((person, index) => {
        const headerBody = (
          <>
            <div className="rad-person-card__header">
              <span className="rad-person-card__index">
                {String(person.number ?? index + 1).padStart(2, "0")}
              </span>
              <span className="rad-person-card__group">{person.group}</span>
            </div>
            <div className="rad-person-card__body">
              <p className="rad-person-card__role">{person.role}</p>
              <h3 className="rad-card__title">{person.name}</h3>
              <p className="rad-copy">{person.bio ?? person.descriptor}</p>
            </div>
          </>
        );

        const footer = (
          <div className="rad-person-card__footer">
            {person.tags?.length ? (
              <div className="rad-tag-row">
                {person.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rad-tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <span className="rad-badge">{person.descriptor}</span>
            )}
            {person.socials?.length ? (
              <div className="rad-link-row">
                {person.socials.slice(0, 2).map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rad-text-link"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        );

        if (linkToRoster) {
          return (
            <article key={person.slug} className="rad-person-card" data-reveal>
              <Link href={`/roster#${person.slug}`} className="rad-person-card__main-link">
                {headerBody}
                <span className="rad-text-link rad-text-link--inline">Open profile</span>
              </Link>
              {footer}
            </article>
          );
        }

        return (
          <article key={person.slug} className="rad-person-card" data-reveal>
            {headerBody}
            {footer}
          </article>
        );
      })}
    </div>
  );
}

export function PartnerGrid({ items }: { items: Partner[] }) {
  return (
    <div className="rad-feature-grid">
      {items.map((partner) => (
        <article key={partner.name} className="rad-card" data-reveal>
          <div className="rad-card__body">
            <p className="rad-kicker">{partner.tier}</p>
            <h3 className="rad-card__title">{partner.name}</h3>
            <p className="rad-copy">{partner.description}</p>
          </div>
          <div className="rad-card__actions">
            <Link href={partner.href} className="rad-text-link">
              Start the conversation
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ContactGrid({ channels }: { channels: ContactChannel[] }) {
  return (
    <div className="rad-channel-grid">
      {channels.map((channel) => {
        const external = channel.href.startsWith("http");

        return (
          <article key={channel.label} className="rad-channel-card" data-reveal>
            <p className="rad-kicker">{channel.label}</p>
            <a
              href={channel.href}
              className="rad-channel-card__value"
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

export function TimelineList({ items }: { items: Milestone[] }) {
  return (
    <div className="rad-timeline">
      {items.map((item) => (
        <article key={`${item.date}-${item.title}`} className="rad-timeline__item" data-reveal>
          <p className="rad-timeline__date">{item.date}</p>
          <h3 className="rad-card__title">{item.title}</h3>
          <p className="rad-copy">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export function ValuesGrid({ values }: { values: OrgValue[] }) {
  return (
    <div className="rad-feature-grid">
      {values.map((value) => (
        <article key={value.title} className="rad-card" data-reveal>
          <div className="rad-card__body">
            <span className="rad-card__icon" aria-hidden="true">
              {value.icon}
            </span>
            <h3 className="rad-card__title">{value.title}</h3>
            <p className="rad-copy">{value.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function RoadmapGrid({
  items
}: {
  items: { stage: string; dates: string }[];
}) {
  return (
    <div className="rad-roadmap-grid">
      {items.map((item) => (
        <article key={item.stage} className="rad-roadmap-card" data-reveal>
          <p className="rad-kicker">{item.dates}</p>
          <h3 className="rad-card__title">{item.stage}</h3>
        </article>
      ))}
    </div>
  );
}

export function PostGrid({
  posts,
  compact = false
}: {
  posts: PostMeta[];
  compact?: boolean;
}) {
  if (posts.length === 0) {
    return (
      <div className="rad-empty-state" data-reveal>
        <p className="rad-copy">No posts are published yet.</p>
      </div>
    );
  }

  return (
    <div className={`rad-post-grid${compact ? " rad-post-grid--compact" : ""}`}>
      {posts.map((post) => (
        <Link key={post.slug} href={`/content/${post.slug}`} className="rad-post-card" data-reveal>
          <div className="rad-post-card__media">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rad-post-card__image"
            />
          </div>
          <div className="rad-post-card__body">
            <p className="rad-kicker">{post.category}</p>
            <h3 className="rad-card__title">{post.title}</h3>
            <p className="rad-copy">{post.summary}</p>
            <span className="rad-post-card__date">{post.date}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
