import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";
import { staff } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Staff",
  description: "The creative, operational, and competitive support structure behind RAD."
};

export default function StaffPage() {
  const brandStaff = staff.filter((member) => member.group === "Brand");
  const operationsStaff = staff.filter((member) => member.group !== "Brand");

  return (
    <PageShell
      eyebrow="Staff"
      title="The system behind the roster."
      description="A serious org site should show the people who make the competitive product possible: brand, operations, analytics, management, and coaching."
      heroImage="/assets/RadBanner1920_1080.png"
      status="Creative + competitive support online"
      note={
        <div className="rad-subpage-note__stack">
          <div>
            <span className="rad-subpage-note__label">Visible Roles</span>
            <strong>{staff.length}</strong>
          </div>
          <div>
            <span className="rad-subpage-note__label">Coverage</span>
            <strong>Brand / Ops / Coaching</strong>
          </div>
        </div>
      }
    >
      <section className="rad-subpage-section">
        <div className="container">
          <SectionHeading
            eyebrow="Brand & Media"
            title="Creative output and public-facing execution."
            description="These roles define how RAD looks, ships content, and shows up across the public brand surface."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {brandStaff.map((member) => (
              <article key={member.slug} className="rad-subpage-card">
                <p className="rad-subpage-card__eyebrow">{member.group}</p>
                <h3 className="rad-subpage-card__title">{member.name}</h3>
                <p className="rad-player-card__descriptor">{member.role}</p>
                <p className="rad-subpage-body">{member.bio ?? member.descriptor}</p>
                {member.tags?.length ? (
                  <div className="rad-chip-row">
                    {member.tags.map((tag) => (
                      <span key={tag} className="rad-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rad-subpage-section rad-subpage-section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Operations & Performance"
            title="Management, analytics, and coaching support."
            description="This layer gives the public roster structure, accountability, and a clearer professional standard."
          />

          <div className="rad-subpage-grid rad-subpage-grid--3">
            {operationsStaff.map((member) => (
              <article key={member.slug} className="rad-subpage-card">
                <p className="rad-subpage-card__eyebrow">{member.group}</p>
                <h3 className="rad-subpage-card__title">{member.name}</h3>
                <p className="rad-player-card__descriptor">{member.role}</p>
                <p className="rad-subpage-body">{member.bio ?? member.descriptor}</p>
                {member.tags?.length ? (
                  <div className="rad-chip-row">
                    {member.tags.map((tag) => (
                      <span key={tag} className="rad-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
