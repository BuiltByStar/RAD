import type { ReactNode } from "react";

import { PageShellHero } from "@/components/page-shell-hero";

type Variant =
  | "default"
  | "about"
  | "roster"
  | "staff"
  | "content"
  | "contact"
  | "partners"
  | "legal";

type PageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  heroImage?: string;
  heroVideo?: string;
  status?: string;
  note?: ReactNode;
  variant?: Variant;
  children: ReactNode;
};

const heroMetaMap: Record<Variant, { mark: string; code: string; line: string; tags: string[] }> = {
  default: {
    mark: "RAD // WILD",
    code: "RAD 00",
    line: "wild pressure",
    tags: ["Pressure-built", "Red // black // white", "Go wild"]
  },
  about: {
    mark: "RAD // ABOUT",
    code: "RAD 01",
    line: "org profile",
    tags: ["World champions", "EMEA tested", "Built to scale"]
  },
  roster: {
    mark: "RAD // ROSTER",
    code: "RAD 02",
    line: "competitive core",
    tags: []
  },
  staff: {
    mark: "RAD // STAFF",
    code: "RAD 03",
    line: "team behind team",
    tags: ["Brand", "Analytics", "Coaching"]
  },
  content: {
    mark: "RAD // CONTENT",
    code: "RAD 04",
    line: "media",
    tags: ["Stories", "Video", "Community"]
  },
  contact: {
    mark: "RAD // CONTACT",
    code: "RAD 05",
    line: "open line",
    tags: ["Partnerships", "Talent", "Media"]
  },
  partners: {
    mark: "RAD // ACTIVATIONS",
    code: "RAD 06",
    line: "brand fit",
    tags: ["Campaigns", "Apparel", "Peripherals"]
  },
  legal: {
    mark: "RAD // POLICY",
    code: "RAD 07",
    line: "site rules",
    tags: ["Privacy", "Cookies", "Terms"]
  }
};

export function PageShell({
  title,
  eyebrow,
  description,
  heroImage,
  heroVideo,
  status,
  note,
  variant = "default",
  children
}: PageShellProps) {
  return (
    <main className="relative isolate">
      <PageShellHero
        title={title}
        eyebrow={eyebrow}
        description={description}
        heroImage={heroImage}
        heroVideo={heroVideo}
        status={status}
        note={note}
        meta={heroMetaMap[variant]}
        variant={variant}
      />
      <div>{children}</div>
    </main>
  );
}
