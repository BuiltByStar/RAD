import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/sections";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About RAD"
      title="Competitive intent, cinematic presentation, scalable infrastructure."
      description="RAD Esports is set up to look premium at launch while staying flexible enough for new teams, better media, and future sponsor growth."
      background="red"
    >
      <section className="section">
        <SectionHeading
          eyebrow="Identity"
          title="RAD is built to feel established from day one."
          description="The v1 site uses current media carefully, with overlays, spacing, and type doing the heavy lifting so the brand feels intentional."
        />
        <div className="grid-3">
          <article className="rad-card">
            <div className="rad-card__body">
              <h3 className="card-title">Competitive</h3>
              <p className="card-desc">
                The site centers titles, roster growth, and match-ready tone rather than
                generic lifestyle branding.
              </p>
            </div>
          </article>
          <article className="rad-card">
            <div className="rad-card__body">
              <h3 className="card-title">Editorial</h3>
              <p className="card-desc">
                A real content system gives RAD a place for announcements, recaps, and
                future storytelling.
              </p>
            </div>
          </article>
          <article className="rad-card">
            <div className="rad-card__body">
              <h3 className="card-title">Replaceable Media</h3>
              <p className="card-desc">
                Logos, hero videos, wallpapers, and art can all improve later without
                changing the design system.
              </p>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
