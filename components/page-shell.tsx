import type { ReactNode } from "react";

import { PageReadySignal } from "@/components/page-ready-signal";
import { PageShellHero } from "@/components/page-shell-hero";

type Variant =
  | "default"
  | "about"
  | "roster"
  | "staff"
  | "content"
  | "contact"
  | "partners"
  | "legal"
  | "merch";

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
    line: "home",
    tags: ["Team", "Shop", "World champions"]
  },
  about: {
    mark: "RAD // ABOUT",
    code: "RAD 01",
    line: "about",
    tags: ["History", "Titles", "Growth"]
  },
  roster: {
    mark: "RAD // TEAM",
    code: "RAD 02",
    line: "team",
    tags: ["World champions", "EMEA tested", "Player-first"]
  },
  staff: {
    mark: "RAD // STAFF",
    code: "RAD 03",
    line: "staff",
    tags: ["Brand", "Analytics", "Coaching"]
  },
  content: {
    mark: "RAD // CONTENT",
    code: "RAD 04",
    line: "news",
    tags: ["Stories", "Video", "Community"]
  },
  contact: {
    mark: "RAD // CONTACT",
    code: "RAD 05",
    line: "contact",
    tags: ["Partnerships", "Talent", "Media"]
  },
  partners: {
    mark: "RAD // PARTNERS",
    code: "RAD 06",
    line: "partners",
    tags: ["Campaigns", "Apparel", "Peripherals"]
  },
  legal: {
    mark: "RAD // POLICY",
    code: "RAD 07",
    line: "legal",
    tags: ["Privacy", "Cookies", "Terms"]
  },
  merch: {
    mark: "RAD // MERCH",
    code: "RAD 08",
    line: "merch",
    tags: ["Drop 01", "Featured item", "Coming soon"]
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
      <PageReadySignal route={variant === "default" ? "/" : `/${variant}`} delayMs={32} />
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
