"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import type { Partner, Person, Team } from "@/lib/site-data";

// ─── Animation Variants ───────────────────────────────────────────────────────
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

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
  const isExternal = actionHref?.startsWith("http");

  return (
    <motion.div 
      className="section-head"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div variants={headerVariant}>
        <p className="at-section-label">{eyebrow}</p>
        <h2 className="at-glitch-text" data-text={title}>{title}</h2>
      </motion.div>
      <motion.div className="section-meta" variants={headerVariant}>
        <p className="section-copy">{description}</p>
        {actionHref && actionLabel && isExternal ? (
          <a
            className="at-link-arrow"
            href={actionHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {actionLabel} →
          </a>
        ) : null}
        {actionHref && actionLabel && !isExternal ? (
          <Link className="at-link-arrow" href={actionHref}>
            {actionLabel} →
          </Link>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

// ─── Team Grid ────────────────────────────────────────────────────────────────

export function TeamSection({ teams }: { teams: Team[] }) {
  return (
    <motion.div 
      className="grid-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {teams.map((team) => (
        <motion.article key={team.slug} variants={cardVariant} className="rad-card at-glass at-hud-border">
          <div className="rad-card__body">
            <div className="card-topline">
              <span className="card-status">{team.status}</span>
              <span>{team.game}</span>
            </div>
            <h3 className="card-title">{team.name}</h3>
            <p className="card-desc">{team.description}</p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

// ─── People Grid ──────────────────────────────────────────────────────────────

export function PeopleSection({ people, variant: _variant }: { people: Person[]; variant?: string }) {
  return (
    <motion.div 
      className="grid-2"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {people.map((person) => (
        <motion.article key={person.name} variants={cardVariant} className="rad-card profile-card at-glass at-hud-border">
          <div className="profile-visual">
            <div className="profile-glow" />
            <span className="profile-initials">{person.name.slice(0, 2)}</span>
          </div>
          <div className="profile-meta">
            <p className="at-section-label" style={{ marginBottom: '0.25rem' }}>{person.group}</p>
            <h3 className="profile-name">{person.name}</h3>
            <p className="profile-role">{person.role}</p>
            <p className="profile-desc">{person.descriptor}</p>
            {person.socials?.length ? (
              <div className="profile-links">
                {person.socials.map((s) => (
                  <a key={s.label} href={s.href} className="at-link-arrow">
                    {s.label} →
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────

export function PartnerSection({ partners }: { partners: Partner[] }) {
  return (
    <motion.div 
      className="grid-2"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {partners.map((partner) => (
        <motion.article key={partner.name} variants={cardVariant} className="partner-card at-glass">
          <div className="partner-mark">
            {partner.name === "GoWild" ? (
              <img src="/assets/Gowild.png" alt="GoWild" style={{ maxWidth: "110px" }} />
            ) : (
              <span className="at-glitch-text" data-text={partner.name}>{partner.name}</span>
            )}
          </div>
          <div className="partner-info">
            <p className="at-section-label">{partner.tier}</p>
            <p>{partner.description}</p>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

// ─── Contact / Community ──────────────────────────────────────────────────────

export function ContactSection({
  channels
}: {
  channels: { label: string; value: string; href: string }[];
}) {
  return (
    <motion.div 
      className="contact-grid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {channels.map((ch) => (
        <motion.a key={ch.label} variants={cardVariant} href={ch.href} className="contact-tile">
          <p className="eyebrow">{ch.label}</p>
          <strong>{ch.value}</strong>
        </motion.a>
      ))}
    </motion.div>
  );
}

// ─── Backwards-compat aliases for inner pages ─────────────────────────────────
export { SectionHead as SectionHeading };
export { TeamSection as TeamGrid };
export { PeopleSection as PeopleGrid };
export { PartnerSection as PartnerGrid };
export { ContactSection as ContactGrid };

