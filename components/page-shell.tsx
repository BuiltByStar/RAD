import Image from "next/image";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  heroVideo?: string;
  status?: string;
  note?: ReactNode;
  children: ReactNode;
};

export function PageShell({
  title,
  eyebrow,
  description,
  heroImage = "/assets/RadBanner1920_1080.png",
  heroVideo,
  status,
  note,
  children
}: PageShellProps) {
  return (
    <main className="rad-subpage">
      <section className="rad-subpage-hero">
        <div className="container">
          <div className="rad-subpage-hero__panel">
            <div className="rad-subpage-hero__copy">
              <p className="rad-subpage-eyebrow">{eyebrow}</p>
              <h1 className="rad-subpage-title">{title}</h1>
              <p className="rad-subpage-description">{description}</p>
              {status ? <span className="rad-subpage-status">{status}</span> : null}
            </div>

            <div className="rad-subpage-hero__media">
              {heroVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="rad-subpage-hero__video"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 44vw"
                  className="rad-subpage-hero__image"
                />
              )}
              <div className="rad-subpage-hero__wash" />
              {note ? <div className="rad-subpage-note">{note}</div> : null}
            </div>
          </div>
        </div>
      </section>

      <div className="rad-subpage__body">{children}</div>
    </main>
  );
}
