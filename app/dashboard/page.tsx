import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardGrid,
  CardMetric,
  CardTitle,
  Container,
  Section,
  SectionHeading
} from "@/components/ui";
import { isMaintenanceModeEnabled } from "@/lib/env";
import { requireAdminAccess } from "@/lib/admin";
import { partners, players, staff } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "RAD's restricted admin dashboard for website operations."
};

export const dynamic = "force-dynamic";

type InquiryRow = {
  id: string;
  submitted_at: string;
  name: string;
  email: string;
  organization: string | null;
  inquiry_type: string;
  message: string;
  socials: string | null;
  status: string;
  source: string;
  site_url: string | null;
};

const rosterSortOrder = ["Starter", "Substitute", "Coach", "Manager"];

const dashboardSections = [
  {
    title: "Roster Management",
    eyebrow: "Players",
    body:
      "Add, edit, delete, reorder, feature, and upload player profile images through protected server routes once the roster CMS table is connected.",
    items: ["Handle", "Real name", "Role", "Region", "Bio", "Social handles", "Featured state"]
  },
  {
    title: "Staff Management",
    eyebrow: "Staff",
    body:
      "Group leadership, content and social, and general staff while keeping staff writes behind session, role, and RLS checks.",
    items: ["Name", "Role/title", "Bio", "Twitter/X", "Leadership flag", "Section group"]
  },
  {
    title: "Partners Management",
    eyebrow: "Sponsors",
    body:
      "Manage sponsor entries and empty partner slots without showing fake sponsors on the public site.",
    items: ["Name", "Tier/tag", "Description", "Logo", "Order", "Open-slot state"]
  },
  {
    title: "System Controls",
    eyebrow: "Ops",
    body:
      "Maintenance controls belong behind admin-only server routes and should never rely on a role cookie.",
    items: ["Maintenance mode", "Site status", "Admin-only actions", "Audit-ready mutations"]
  }
];

function SectionList({ items }: { items: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/56"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const access = await requireAdminAccess();

  if (!access.ok && access.status === 401) {
    redirect("/?auth=required");
  }

  if (!access.ok) {
    return (
      <PageShell
        variant="default"
        eyebrow="Dashboard"
        title={access.status === 503 ? "Supabase not ready." : "Access denied."}
        description={
          access.status === 503
            ? "Supabase environment variables are missing or unavailable, so the protected dashboard cannot verify the live session."
            : "This dashboard is restricted to owner, admin, and developer roles stored in public.profiles."
        }
        heroImage="/assets/RadRivals_Wallpaper_Black.png"
        status="Restricted access"
      >
        <Section padding="sm">
          <Container>
            <Card>
              <CardEyebrow>Security</CardEyebrow>
              <CardTitle size="sm">Dashboard access uses profiles.role.</CardTitle>
              <CardBody>
                Discord proves identity, Supabase stores the session, and the current database role decides access.
                Role cookies are not trusted for authorization.
              </CardBody>
            </Card>
          </Container>
        </Section>
      </PageShell>
    );
  }

  const { data, error } = await access.supabase
    .from("contact_inquiries")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(50);

  const inquiries = error ? [] : ((data ?? []) as InquiryRow[]);
  const statusCounts = inquiries.reduce<Record<string, number>>((acc, inquiry) => {
    acc[inquiry.status] = (acc[inquiry.status] ?? 0) + 1;
    return acc;
  }, {});

  const sortedRoster = [...players].sort((a, b) => {
    const aOrder = rosterSortOrder.findIndex((role) => a.tags?.includes(role));
    const bOrder = rosterSortOrder.findIndex((role) => b.tags?.includes(role));
    return (aOrder === -1 ? 99 : aOrder) - (bOrder === -1 ? 99 : bOrder);
  });

  return (
    <PageShell
      variant="default"
      eyebrow="Dashboard"
      title="RAD Admin Dashboard."
      description="Protected operational surface for roster, staff, partner, and system management. Server-side role checks gate the page; Supabase RLS still gates the database."
      heroImage="/assets/RadRivals_Wallpaper_Black.png"
      status={`Signed in as ${access.role}`}
    >
      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Overview"
            title="Current site operations."
            description="These counts combine current site data with live inquiry reads from Supabase using the logged-in session."
          />

          <CardGrid cols={4}>
            <Card tone="metric">
              <CardMetric>{String(players.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">Roster Entries</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>{String(staff.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">Staff Members</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>{String(partners.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">Partner Slots</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>{isMaintenanceModeEnabled() ? "ON" : "OK"}</CardMetric>
              <CardEyebrow className="mt-2">Site Status</CardEyebrow>
            </Card>
          </CardGrid>
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="Management"
            title="Admin sections are scoped and explicit."
            description="The UI separates each area, but all real mutations must be handled by protected server routes or server actions."
          />

          <CardGrid cols={2}>
            {dashboardSections.map((section) => (
              <Card key={section.title} tone="lead">
                <CardEyebrow>{section.eyebrow}</CardEyebrow>
                <CardTitle size="sm">{section.title}</CardTitle>
                <CardBody>{section.body}</CardBody>
                <SectionList items={section.items} />
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <SectionHeading
            eyebrow="Roster Order"
            title="Display order is controlled."
            description="Roster management should keep starters first, then subs, coaches, and managers. Current local roster data is shown below until the CMS table is connected."
          />

          <div className="grid gap-3">
            {sortedRoster.map((player) => (
              <div
                key={player.slug}
                className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none text-white">
                    {player.name}
                  </p>
                  <p className="mt-1 text-sm text-white/58">
                    {player.role} · {player.descriptor}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {(player.tags ?? []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="Inquiries"
            title="Latest contact submissions."
            description={
              error
                ? "Inquiry reads are currently blocked by Supabase configuration or RLS. Apply the updated schema policies before using this table."
                : "Recent submissions are read with the current Supabase session and database role."
            }
          />

          <CardGrid cols={3}>
            <Card tone="metric">
              <CardMetric>{String(inquiries.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">Recent Items</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>{String(statusCounts.new ?? 0).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">New</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>
                {String(
                  inquiries.filter((inquiry) => inquiry.inquiry_type.toLowerCase().includes("partner")).length
                ).padStart(2, "0")}
              </CardMetric>
              <CardEyebrow className="mt-2">Partner Leads</CardEyebrow>
            </Card>
          </CardGrid>

          <div className="mt-6 overflow-hidden rounded-lg border border-white/10">
            {inquiries.length === 0 ? (
              <div className="bg-white/[0.025] p-6 text-sm leading-relaxed text-white/62">
                {error ? error.message : "No inquiries stored yet."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                  <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.14em] text-white/48">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Submitted</th>
                      <th className="px-4 py-3">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8 bg-black/30">
                    {inquiries.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="px-4 py-4">
                          <strong className="text-white">{inquiry.name}</strong>
                          {inquiry.organization ? (
                            <span className="mt-1 block text-xs text-white/45">{inquiry.organization}</span>
                          ) : null}
                        </td>
                        <td className="px-4 py-4 text-white/66">{inquiry.inquiry_type}</td>
                        <td className="px-4 py-4">
                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/58">
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-white/58">
                          {new Date(inquiry.submitted_at).toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <a href={`mailto:${inquiry.email}`} className="text-[color:var(--color-rad-hi)]">
                            {inquiry.email}
                          </a>
                          {inquiry.socials ? (
                            <span className="mt-1 block text-xs text-white/45">{inquiry.socials}</span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section padding="sm">
        <Container>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="text-link">
              Contact page
            </Link>
            <Link href="/content" className="text-link">
              Content page
            </Link>
            <Link href="/api/auth/role" className="text-link">
              Role endpoint
            </Link>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
