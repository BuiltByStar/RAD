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
    <div className="grid-3">
      {teams.map((team) => (
        <article key={team.slug} className="rad-card">
          <div className="rad-card__body">
            <div className="card-topline">
              <span className="card-status">{team.status}</span>
              <span>{team.game}</span>
            </div>
            <h3 className="card-title">{team.name}</h3>
            <p className="card-desc">{team.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

// ─── People Grid ──────────────────────────────────────────────────────────────

export function PeopleSection({ people, variant: _variant }: { people: Person[]; variant?: string }) {
  return (
    <div className="grid-2">
      {people.map((person) => (
        <article key={person.name} className="rad-card profile-card">
          <div className="profile-visual">
            <div className="profile-glow" />
            <span className="profile-initials">{person.name.slice(0, 2)}</span>
          </div>
          <div className="profile-meta">
            <p className="profile-group">{person.group}</p>
            <h3 className="profile-name">{person.name}</h3>
            <p className="profile-role">{person.role}</p>
            <p className="profile-desc">{person.descriptor}</p>
            {person.socials?.length ? (
              <div className="profile-links">
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
    <div className="grid-2">
      {partners.map((partner) => (
        <article key={partner.name} className="partner-card">
          <div className="partner-mark">
            {partner.name === "GoWild" ? (
              <img src="/assets/Gowild.png" alt="GoWild" style={{ maxWidth: "110px" }} />
            ) : (
              <span>{partner.name}</span>
            )}
          </div>
          <div className="partner-info">
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
