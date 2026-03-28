import Link from "next/link";

import type { Partner, Person, Team } from "@/lib/site-data";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-meta">
        <p className="section-copy">{description}</p>
        {actionHref && actionLabel ? (
          <Link className="text-link" href={actionHref}>
            {actionLabel} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function TeamGrid({ teams }: { teams: Team[] }) {
  return (
    <div className="card-grid card-grid-three">
      {teams.map((team) => (
        <article key={team.slug} className="data-card">
          <div className="card-topline">
            <span className="card-status">{team.status}</span>
            <span>{team.game}</span>
          </div>
          <h3>{team.name}</h3>
          <p className="section-copy" style={{ marginTop: "0.6rem" }}>{team.description}</p>
        </article>
      ))}
    </div>
  );
}

export function PeopleGrid({
  people,
  variant = "roster"
}: {
  people: Person[];
  variant?: "roster" | "staff";
}) {
  return (
    <div className="card-grid">
      {people.map((person) => (
        <article key={`${variant}-${person.name}`} className="profile-card">
          <div className="profile-visual">
            <div className="profile-glow" />
            <span>{person.name.slice(0, 2)}</span>
          </div>
          <div className="profile-meta">
            <p className="eyebrow">{person.group}</p>
            <h3 style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", marginBottom: "0.3rem" }}>
              {person.name}
            </h3>
            <p className="profile-role">{person.role}</p>
            <p className="section-copy" style={{ fontSize: "0.88rem", marginTop: "0.4rem" }}>
              {person.descriptor}
            </p>
            {person.socials?.length ? (
              <div className="profile-links">
                {person.socials.map((social) => (
                  <a key={social.label} href={social.href}>
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function PartnerGrid({ partners }: { partners: Partner[] }) {
  return (
    <div className="partner-grid">
      {partners.map((partner) => (
        <article key={partner.name} className="partner-card">
          <div className="partner-mark">
            {partner.name === "GoWild" ? (
              <img src="/assets/Gowild.png" alt="GoWild" style={{ maxWidth: "120px" }} />
            ) : (
              <span>{partner.name}</span>
            )}
          </div>
          <div>
            <p className="eyebrow">{partner.tier}</p>
            <p className="partner-card p">{partner.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ContactGrid({
  channels
}: {
  channels: { label: string; value: string; href: string }[];
}) {
  return (
    <div className="contact-grid">
      {channels.map((channel) => (
        <a key={channel.label} className="contact-card" href={channel.href}>
          <p className="eyebrow">{channel.label}</p>
          <strong>{channel.value}</strong>
        </a>
      ))}
    </div>
  );
}
