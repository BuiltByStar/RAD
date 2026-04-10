"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import type { Partner, Person, Team } from "@/lib/site-data";

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
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
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <motion.div variants={itemVariants}>
        <p className="section-kicker">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </motion.div>

      <motion.div className="section-meta" variants={itemVariants}>
        <p className="section-copy">{description}</p>
        {actionHref && actionLabel && isExternal ? (
          <a
            className="text-link"
            href={actionHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {actionLabel}
          </a>
        ) : null}
        {actionHref && actionLabel && !isExternal ? (
          <Link className="text-link" href={actionHref}>
            {actionLabel}
          </Link>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export function TeamSection({ teams }: { teams: Team[] }) {
  return (
    <motion.div
      className="feature-grid feature-grid--teams"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {teams.map((team) => (
        <motion.article key={team.slug} variants={itemVariants} className="feature-card">
          <div className="feature-card__body">
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

export function PeopleSection({ people }: { people: Person[]; variant?: string }) {
  return (
    <motion.div
      className="people-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {people.map((person) => (
        <motion.article key={person.slug} variants={itemVariants} className="people-card">
          <div className="people-card__top">
            <p className="section-kicker section-kicker--tight">{person.group}</p>
            {typeof person.number === "number" ? (
              <span className="people-card__index">#{String(person.number).padStart(2, "0")}</span>
            ) : null}
          </div>

          <div className="people-card__body">
            <h3 className="people-card__name">{person.name}</h3>
            <p className="people-card__role">{person.role}</p>
            <p className="people-card__desc">{person.descriptor}</p>

            {person.socials?.length ? (
              <div className="people-card__links">
                {person.socials.map((social) => (
                  <a key={social.label} href={social.href} className="text-link">
                    {social.label}
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

export function PartnerSection({ partners }: { partners: Partner[] }) {
  return (
    <motion.div
      className="feature-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {partners.map((partner) => (
        <motion.article key={partner.name} variants={itemVariants} className="feature-card feature-card--partner">
          <div className="feature-card__body">
            <p className="section-kicker section-kicker--tight">{partner.tier}</p>
            <h3 className="card-title">{partner.name}</h3>
            <p className="card-desc">{partner.description}</p>
            <a className="text-link" href={partner.href}>
              Contact RAD
            </a>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}

export function ContactSection({
  channels
}: {
  channels: { label: string; value: string; href: string }[];
}) {
  return (
    <motion.div
      className="contact-grid"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {channels.map((channel) => (
        <motion.a key={channel.label} variants={itemVariants} href={channel.href} className="contact-tile">
          <p className="section-kicker section-kicker--tight">{channel.label}</p>
          <strong>{channel.value}</strong>
        </motion.a>
      ))}
    </motion.div>
  );
}

export { SectionHead as SectionHeading };
export { TeamSection as TeamGrid };
export { PeopleSection as PeopleGrid };
export { PartnerSection as PartnerGrid };
export { ContactSection as ContactGrid };
