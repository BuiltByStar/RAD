import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  buttonClass,
  formCardClass,
  inputClass,
  labelClass,
  rowCardClass
} from "@/components/dashboard/dashboard-styles";
import { Check, Field } from "@/components/dashboard/dashboard-fields";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PartnersSection, type PartnerRow } from "@/components/dashboard/partners-section";
import { RosterSection, type RosterRow } from "@/components/dashboard/roster-section";
import { StaffSection, type StaffRow } from "@/components/dashboard/staff-section";
import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardBody,
  CardEyebrow,
  CardTitle,
  Container,
  Section,
  SectionHeading
} from "@/components/ui";
import { requireAdminAccess } from "@/lib/admin";
import { localSupabaseExportPath, readLocalDashboardData } from "@/lib/local-admin-store";

import {
  exportLocalDashboardData,
  seedDashboardFromSite,
  updateInquiryStatus,
  updateMaintenanceSetting
} from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "RAD admin dashboard for roster and staff management."
};

export const dynamic = "force-dynamic";
const localAdminBypassEnabled = process.env.LOCAL_ADMIN_BYPASS === "1";

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
};

type SiteSettingRow = {
  key: string;
  value: { enabled?: boolean } | null;
};

async function readTable<T>(query: PromiseLike<{ data: unknown; error: { message: string } | null }>) {
  const { data, error } = await query;
  return {
    rows: error ? [] : ((data ?? []) as T[]),
    error: error?.message ?? null
  };
}

export default async function DashboardPage() {
  const access = await requireAdminAccess();

  if (!localAdminBypassEnabled && !access.ok && access.status === 401) {
    redirect("/?auth=required");
  }

  if (!localAdminBypassEnabled && !access.ok) {
    return (
      <PageShell
        variant="default"
        eyebrow="Dashboard"
        title={access.status === 503 ? "Supabase not ready." : "Access denied."}
        description={
          access.status === 503
            ? "Supabase environment variables are missing, so RAD cannot verify the protected session."
            : "Admin access is limited to owner, admin, and developer roles in public.profiles."
        }
        heroImage="/assets/rad-bg-red.png"
        status="Restricted"
      >
        <Section padding="sm">
          <Container>
            <Card>
              <CardEyebrow>Admin Setup</CardEyebrow>
              <CardTitle size="sm">Login first, then grant the role.</CardTitle>
              <CardBody>
                A developer signs in with Discord once so Supabase creates their profile. An owner or service-role
                operator then updates <code>public.profiles.role</code> to developer, admin, or owner.
              </CardBody>
            </Card>
          </Container>
        </Section>
      </PageShell>
    );
  }

  const viewer =
    localAdminBypassEnabled || access.ok
      ? {
          email: localAdminBypassEnabled ? "local@rad.dev" : access.email,
          role: localAdminBypassEnabled ? ("developer" as const) : access.role
        }
      : null;
  const realAccess = access.ok ? access : null;

  const [roster, staff, partners, inquiries, settings] = localAdminBypassEnabled
    ? await (async () => {
        const data = await readLocalDashboardData();
        return [
          { rows: data.roster_entries as RosterRow[], error: null },
          { rows: data.staff_entries as StaffRow[], error: null },
          { rows: data.partner_entries as PartnerRow[], error: null },
          { rows: data.contact_inquiries as InquiryRow[], error: null },
          { rows: data.site_settings as SiteSettingRow[], error: null }
        ] as const;
      })()
    : await Promise.all([
        readTable<RosterRow>(
          realAccess!.supabase.from("roster_entries").select("*").order("display_order", { ascending: true })
        ),
        readTable<StaffRow>(
          realAccess!.supabase.from("staff_entries").select("*").order("display_order", { ascending: true })
        ),
        readTable<PartnerRow>(
          realAccess!.supabase.from("partner_entries").select("*").order("display_order", { ascending: true })
        ),
        readTable<InquiryRow>(
          realAccess!.supabase
            .from("contact_inquiries")
            .select("*")
            .order("submitted_at", { ascending: false })
            .limit(50)
        ),
        readTable<SiteSettingRow>(realAccess!.supabase.from("site_settings").select("*"))
      ]);

  const maintenance = settings.rows.find((setting) => setting.key === "maintenance")?.value?.enabled ?? false;
  const hasPeopleData = roster.rows.length > 0 || staff.rows.length > 0;

  const seedBanner = (
    <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-4">
      <form action={seedDashboardFromSite} className="flex flex-wrap items-center gap-3">
        <button className={buttonClass} type="submit">
          Import from site-data
        </button>
        <Check label="Replace existing" name="force" />
      </form>
      {localAdminBypassEnabled ? (
        <form action={exportLocalDashboardData}>
          <button className={buttonClass} type="submit">
            Export JSON
          </button>
        </form>
      ) : null}
      <p className="max-w-2xl text-xs leading-relaxed text-white/46">
        Seeds players, staff, and partners from <code>lib/site-data.ts</code> when tables are empty.
        {localAdminBypassEnabled ? (
          <>
            {" "}
            Local export path: <code>{localSupabaseExportPath}</code>
          </>
        ) : (
          " Requires applied migration for extended roster/staff fields."
        )}
      </p>
    </div>
  );

  return (
    <PageShell
      variant="default"
      eyebrow="Dashboard"
      title="RAD Admin"
      description="Manage roster, staff, partners, and site settings."
      heroImage="/assets/rad-bg-red.png"
      status={`${viewer?.role ?? "developer"} · ${viewer?.email ?? ""}`}
    >
      <Section padding="sm">
        <Container>
          {localAdminBypassEnabled ? (
            <div className="mb-6 rounded-lg border border-[color:var(--color-rad)]/28 bg-[color:var(--color-rad)]/10 p-4 text-sm leading-relaxed text-white/72">
              Local admin bypass is active. Changes save to the local JSON store and public pages read from it when
              populated.
            </div>
          ) : null}

          <DashboardShell
            defaultTabId="roster"
            header={
              <>
                {seedBanner}
                {!hasPeopleData && !localAdminBypassEnabled ? (
                  <p className="mb-4 text-sm text-white/55">
                    No roster or staff rows yet — use Import from site-data to sync static content.
                  </p>
                ) : null}
              </>
            }
            nav={[
              { id: "roster", label: "Roster", group: "People" },
              { id: "staff", label: "Staff", group: "People" },
              { id: "partners", label: "Partners", group: "Secondary" },
              { id: "inquiries", label: "Inquiries", group: "Ops" },
              { id: "settings", label: "Settings", group: "Ops" }
            ]}
          >
            <RosterSection rows={roster.rows} error={roster.error} />
            <StaffSection rows={staff.rows} error={staff.error} />
            <PartnersSection rows={partners.rows} error={partners.error} />

            <div className="grid gap-5">
              <SectionHeading eyebrow="Inquiries" title="Contact submissions" />
              {inquiries.error ? (
                <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{inquiries.error}</p>
              ) : null}
              <div className="grid gap-3">
                {inquiries.rows.map((inquiry) => (
                  <div key={inquiry.id} className={rowCardClass}>
                    <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
                      <div>
                        <p className="font-[family-name:var(--font-display)] text-2xl uppercase leading-none text-white">
                          {inquiry.name}
                        </p>
                        <p className="mt-1 text-sm text-white/58">
                          {inquiry.inquiry_type} · {inquiry.email}
                        </p>
                        {inquiry.organization ? (
                          <p className="mt-1 text-sm text-white/45">{inquiry.organization}</p>
                        ) : null}
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/62">{inquiry.message}</p>
                      </div>
                      <form action={updateInquiryStatus} className="flex flex-wrap items-end gap-3">
                        <input type="hidden" name="id" value={inquiry.id} />
                        <label className={labelClass}>
                          Status
                          <select className={inputClass} name="status" defaultValue={inquiry.status}>
                            {["new", "reviewing", "replied", "closed"].map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </label>
                        <button className={buttonClass} type="submit">
                          Update
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <SectionHeading eyebrow="Settings" title="Site controls" />
              <form action={updateMaintenanceSetting} className={`${formCardClass} flex flex-wrap items-center gap-4`}>
                <Check label="Maintenance mode" name="enabled" defaultChecked={maintenance} />
                <button className={buttonClass} type="submit">
                  Save Settings
                </button>
              </form>
            </div>
          </DashboardShell>
        </Container>
      </Section>
    </PageShell>
  );
}
