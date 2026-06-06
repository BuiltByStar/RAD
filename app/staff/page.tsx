import type { Metadata } from "next";
import Image from "next/image";

import { PageShell } from "@/components/page-shell";
import { PageRail, PageRailSection } from "@/components/ui";
import { cn } from "@/components/ui/cn";
import { SocialIconLink } from "@/components/ui/social-icon-link";
import { inferSocialPlatform, PLATFORM_LABEL, type OrgSocialPlatform } from "@/lib/site-data";
import { getManagedStaffState, type StaffMember } from "@/lib/staff-data.server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff | RAD Esports",
  description:
    "The people behind RAD Esports — leadership, coaching, and content.",
  openGraph: {
    title: "Staff | RAD Esports",
    description:
      "The people behind RAD Esports — leadership, coaching, and content.",
    type: "website"
  }
};

function getInitials(name: string) {
  const cleaned = name
    .replace(/["']/g, "")
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "RAD";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function StaffCardImage({ member }: { member: StaffMember }) {
  const initials = getInitials(member.name);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a] bg-[radial-gradient(circle_at_50%_22%,rgba(229,6,47,0.12),transparent_55%)]">
      {member.image ? (
        <Image
          src={member.image}
          alt={`${member.name} — RAD Esports staff`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_38%,rgba(229,6,47,0.22),transparent_60%)]">
          <span
            aria-hidden
            className="font-[family-name:var(--font-display)] text-5xl font-extrabold uppercase tracking-tight text-white/35 sm:text-6xl"
          >
            {initials}
          </span>
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.45)_100%)]"
      />
    </div>
  );
}

function StaffSocials({ member }: { member: StaffMember }) {
  if (!member.socials?.length) return null;

  const entries = member.socials
    .map((social) => {
      const platform: OrgSocialPlatform | undefined =
        social.platform ?? inferSocialPlatform(social.label, social.href);
      return { social, platform };
    })
    .filter((entry) => Boolean(entry.platform)) as {
    social: NonNullable<StaffMember["socials"]>[number];
    platform: OrgSocialPlatform;
  }[];

  if (entries.length === 0) return null;

  return (
    <div className="mt-4 flex items-center gap-2 border-t border-white/8 pt-3">
      {entries.map(({ social, platform }) => (
        <SocialIconLink
          key={`${platform}-${social.href}`}
          href={social.href}
          platform={platform}
          label={social.label}
          ariaLabel={`Follow ${member.name} on ${PLATFORM_LABEL[platform]}`}
          sizeClass="h-7 w-7"
          iconClass="h-4 w-4"
        />
      ))}
    </div>
  );
}

function StaffCard({ member }: { member: StaffMember }) {
  const blurb = member.bio ?? member.descriptor;

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-black transition-colors duration-300",
        "hover:bg-[#080808]"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:ring-[var(--color-blood)]/30"
      />

      <StaffCardImage member={member} />

      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-blood)]">
          {member.role}
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold uppercase leading-tight tracking-tight text-white sm:text-xl">
          {member.name}
        </h2>
        {blurb ? (
          <p className="text-sm leading-relaxed text-white/55">{blurb}</p>
        ) : null}

        <div className="mt-auto">
          <StaffSocials member={member} />
        </div>
      </div>
    </article>
  );
}

export default async function StaffPage() {
  const { staff } = await getManagedStaffState();

  return (
    <PageShell
      variant="staff"
      hideHero
      eyebrow="Staff"
      title="Staff"
      route="/staff"
    >
      <PageRail className="pb-14 sm:pb-16">
        <PageRailSection className="py-8 md:py-10">
          {staff.length === 0 ? (
            <p className="border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/55">
              Staff coming soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-px border border-white/8 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {staff.map((member) => (
                <StaffCard key={member.id ?? member.slug} member={member} />
              ))}
            </div>
          )}
        </PageRailSection>
      </PageRail>
    </PageShell>
  );
}
