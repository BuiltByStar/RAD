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

const heroMetaMap: Record<Variant, { mark: string; code: string; channel: string; tags: string[] }> = {
  default: {
    mark: "RAD // SYSTEM",
    code: "Profile 00",
    channel: "teamrad.gg",
    tags: ["The Wild Ones", "Competitive Identity", "Modern Platform"]
  },
  about: {
    mark: "RAD // ABOUT",
    code: "Profile 01",
    channel: "org identity",
    tags: ["World champions", "EMEA tested", "Built to scale"]
  },
  roster: {
    mark: "RAD // ROSTER",
    code: "Profile 02",
    channel: "competitive core",
    tags: []
  },
  staff: {
    mark: "RAD // STAFF",
    code: "Profile 03",
    channel: "operations",
    tags: ["Brand", "Analytics", "Coaching"]
  },
  content: {
    mark: "RAD // CONTENT",
    code: "Profile 04",
    channel: "editorial layer",
    tags: ["Stories", "Video", "Community"]
  },
  contact: {
    mark: "RAD // CONTACT",
    code: "Profile 05",
    channel: "inquiry path",
    tags: ["Partnerships", "Talent", "Media"]
  },
  partners: {
    mark: "RAD // ACTIVATIONS",
    code: "Profile 06",
    channel: "brand fit",
    tags: ["Campaigns", "Apparel", "Peripherals"]
  },
  legal: {
    mark: "RAD // POLICY",
    code: "Profile 07",
    channel: "public terms",
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
