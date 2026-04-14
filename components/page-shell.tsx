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
    default: {
      mark: "RAD // SYSTEM",
      code: "FILE 00",
      channel: "teamrad.gg",
      tags: ["Pressure-built", "Red // black // white", "Go wild"]
    },
    about: {
      mark: "RAD // ABOUT",
      code: "FILE 01",
      channel: "org identity",
      tags: ["World champions", "EMEA tested", "Built to scale"]
    },
    roster: {
      mark: "RAD // ROSTER",
      code: "FILE 02",
      channel: "competitive core",
      tags: ["Featured division", "Active lineup", "Role clarity"]
    },
    staff: {
      mark: "RAD // STAFF",
      code: "FILE 03",
      channel: "operations",
      tags: ["Brand", "Analytics", "Coaching"]
    },
    content: {
      mark: "RAD // CONTENT",
      code: "FILE 04",
      channel: "editorial layer",
      tags: ["Stories", "Video", "Community"]
    },
    contact: {
      mark: "RAD // CONTACT",
      code: "FILE 05",
      channel: "inquiry path",
      tags: ["Partnerships", "Talent", "Media"]
    },
    partners: {
      mark: "RAD // ACTIVATIONS",
      code: "FILE 06",
      channel: "brand fit",
      tags: ["Campaigns", "Apparel", "Peripherals"]
    },
    legal: {
      mark: "RAD // POLICY",
      code: "FILE 07",
      channel: "public terms",
      tags: ["Privacy", "Cookies", "Terms"]
    }
  }[variant];

  return (
    <main className={`rad-subpage rad-subpage--${variant}`}>
      <section className="rad-subpage-hero">
        <div className="container">
          <div className="rad-subpage-hero__panel">
            <div className="rad-subpage-hero__copy" data-reveal="true">
              <div className="rad-subpage-hero__system">
                <span>{heroMeta.code}</span>
                <span>{heroMeta.channel}</span>
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
              <div className="rad-subpage-hero__logo" aria-hidden="true">
                <Image
                  src="/assets/RadNewLogoWordmarkRed.png"
                  alt=""
                  width={180}
                  height={54}
                  className="rad-subpage-hero__logo-image"
                />
              </div>
              <div className="rad-subpage-hero__stencil" aria-hidden="true">
                {heroMeta.mark}
              </div>
              <div className={`rad-subpage-hero__motif rad-subpage-hero__motif--${variant}`} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="rad-subpage-hero__wash" />
              <div className="rad-subpage-hero__ticker" aria-hidden="true">
                {heroMeta.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
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
