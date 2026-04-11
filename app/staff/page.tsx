import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { PersonGrid, SectionHeading } from "@/components/sections";
import { staff } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Staff",
  description: "The creative, operational, and competitive staff behind RAD Esports."
};

export default function StaffPage() {
  const brandStaff = staff.filter((member) => member.group === "Brand");
  const operationsStaff = staff.filter((member) => member.group !== "Brand");

  return (
    <PageShell
      eyebrow="Staff"
      title="The people behind the public product."
      description="RAD's presentation is not accidental. The design, operations, analytics, and coaching layers are part of the org's competitive output."
      heroImage="/assets/RadBanner1920_1080.png"
      heroNote={
        <div className="rad-note-card">
          <p className="rad-kicker">Why it matters</p>
          <p className="rad-copy">
            A client-ready org site should show the team behind the performance, not just the names on match day.
          </p>
        </div>
      }
    >
      <section className="rad-section">
        <div className="container">
          <SectionHeading
            eyebrow="Brand & Media"
            title="Creative output and public-facing execution."
            description="These roles shape the visuals, social rollouts, and the overall quality of how RAD shows up online."
          />
          <PersonGrid people={brandStaff} mode="staff" />
        </div>
      </section>

      <section className="rad-section rad-section--alt">
        <div className="container">
          <SectionHeading
            eyebrow="Competitive Operations"
            title="Management, analysis, and coaching support."
            description="This group keeps the roster aligned, prepped, and operating at a professional standard."
          />
          <PersonGrid people={operationsStaff} mode="staff" />
        </div>
      </section>
    </PageShell>
  );
}
