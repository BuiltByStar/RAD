import { aboutSummary } from "@/lib/site-data";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About RAD"
      title="About RAD."
      description="World champions. EMEA champions. Built to do it again."
      background="red"
    >
      <section className="section">
        <SectionHeading
          eyebrow="Identity"
          title="RAD didn't wait for permission."
          description={aboutSummary}
        />
        <div className="grid-3">
          <article className="rad-card">
            <div className="rad-card__body">
              <h3 className="card-title">World Champions</h3>
              <p className="card-desc">
                RAD cemented its place as the inaugural Marvel Rivals Ignite:
                Mid-Season World Champions.
              </p>
            </div>
          </article>
          <article className="rad-card">
            <div className="rad-card__body">
              <h3 className="card-title">EMEA Champions</h3>
              <p className="card-desc">
                The org most recently added the EMEA Regional Champions title
                to its record.
              </p>
            </div>
          </article>
          <article className="rad-card">
            <div className="rad-card__body">
              <h3 className="card-title">#GoWild</h3>
              <p className="card-desc">
                You've seen RAD do it before. Get ready to see it again.
                Welcome to the wild.
              </p>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
