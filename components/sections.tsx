import Link from "next/link";

import type { Partner, Person, Team } from "@/lib/site-data";

// ─── Section Heading ──────────────────────────────────────────────────────────

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function SectionHead({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel
}: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-meta">
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

// ─── Team Grid ────────────────────────────────────────────────────────────────

export function TeamSection({ teams }: { teams: Team[] }) {
  return (
    <div className="team-grid">
      {teams.map((team) => (
        <article key={team.slug} className="team-card">
          <div className="team-card-top">
            <span className="team-card-status">{team.status}</span>
            <span className="team-card-game">{team.game}</span>
          </div>
          <h3 className="team-card-title">{team.name}</h3>
          <p className="team-card-copy">{team.description}</p>
        </article>
      ))}
    </div>
  );
}

// ─── People Grid ──────────────────────────────────────────────────────────────

export function PeopleSection({ people, variant: _variant }: { people: Person[]; variant?: string }) {
  return (
    <div className="people-grid">
      {people.map((person) => (
        <article key={person.name} className="person-card">
          <div className="person-topline">
            <span className="person-group">{person.group}</span>
            <span className="person-role-chip">{person.role}</span>
          </div>
          <h3 className="person-name">{person.name}</h3>
          <p className="person-desc">{person.descriptor}</p>
          <div className="person-footer">
            <p className="person-role">{person.role}</p>
            {person.socials?.length ? (
              <div className="person-links">
                {person.socials.map((s) => (
                  <a key={s.label} href={s.href}>
                    {s.label}
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

// ─── Partners ─────────────────────────────────────────────────────────────────

export function PartnerSection({ partners }: { partners: Partner[] }) {
  return (
    <div className="partner-grid">
      {partners.map((partner) => (
        <article key={partner.name} className="partner-surface">
          <div className="partner-mark">
            {partner.name === "GoWild" ? (
              <img src="/assets/Gowild.png" alt="GoWild" style={{ maxWidth: "110px" }} />
            ) : (
              <span>{partner.name}</span>
            )}
          </div>
          <div className="partner-surface-copy">
            <p className="eyebrow">{partner.tier}</p>
            <p>{partner.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

// ─── Contact / Community ──────────────────────────────────────────────────────

export function ContactSection({
  channels
}: {
  channels: { label: string; value: string; href: string }[];
}) {
  return (
    <div className="contact-grid">
      {channels.map((ch) => (
        <a key={ch.label} href={ch.href} className="contact-tile">
          <p className="eyebrow">{ch.label}</p>
          <strong>{ch.value}</strong>
        </a>
      ))}
    </div>
  );
}

// ─── Backwards-compat aliases for inner pages ─────────────────────────────────
export { SectionHead as SectionHeading };
export { TeamSection as TeamGrid };
export { PeopleSection as PeopleGrid };
export { PartnerSection as PartnerGrid };
export { ContactSection as ContactGrid };
