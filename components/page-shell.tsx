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
  variant?: "default" | "about" | "roster" | "staff" | "content" | "contact" | "partners" | "legal";
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
  variant = "default",
  children
}: PageShellProps) {
  const heroMeta = {
    default: { word: "RAD", code: "SYS 00" },
    about: { word: "ORIGIN", code: "SYS 01" },
    roster: { word: "LINEUP", code: "SYS 02" },
    staff: { word: "SYSTEM", code: "SYS 03" },
    content: { word: "EDITORIAL", code: "SYS 04" },
    contact: { word: "ACCESS", code: "SYS 05" },
    partners: { word: "ACTIVATE", code: "SYS 06" },
    legal: { word: "POLICY", code: "SYS 07" }
  }[variant];

  return (
    <main className={`rad-subpage rad-subpage--${variant}`}>
      <section className="rad-subpage-hero">
        <div className="container">
          <div className="rad-subpage-hero__panel">
            <div className="rad-subpage-hero__copy" data-reveal="true">
              <div className="rad-subpage-hero__system">
                <span>{heroMeta.code}</span>
                <span>teamrad.gg</span>
              </div>
              <p className="rad-subpage-eyebrow">{eyebrow}</p>
              <h1 className="rad-subpage-title">{title}</h1>
              <p className="rad-subpage-description">{description}</p>
              {status ? <span className="rad-subpage-status">{status}</span> : null}
            </div>

            <div className="rad-subpage-hero__media" data-reveal="true" data-delay="1">
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
              <div className="rad-subpage-hero__ghost" aria-hidden="true">
                {heroMeta.word}
              </div>
              <div className="rad-subpage-hero__grid" aria-hidden="true" />
              <div className="rad-subpage-hero__wash" />
              {note ? (
                <div className="rad-subpage-note" data-reveal="true" data-delay="2">
                  {note}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="rad-subpage__body">{children}</div>
    </main>
  );
}
