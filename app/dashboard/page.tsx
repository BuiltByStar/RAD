import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  buttonClass,
  dangerButtonClass,
  formCardClass,
  inputClass,
  labelClass,
  rowCardClass,
  uploadHintClass
} from "@/components/dashboard/dashboard-styles";
import { Check, DeleteForm, Field, FileField, Select, TextArea } from "@/components/dashboard/dashboard-fields";
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
  createNewsPost,
  deleteContentItem,
  deleteNewsPost,
  exportLocalDashboardData,
  seedDashboardFromSite,
  updateInquiryStatus,
  updateMaintenanceSetting,
  updateNewsPost,
  upsertContentItem
} from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "RAD's restricted admin dashboard for website operations."
};

export const dynamic = "force-dynamic";
const localAdminBypassEnabled = process.env.LOCAL_ADMIN_BYPASS === "1";

type NewsPostRow = {
  id: string;
  title: string;
  slug: string;
  date: string;
  summary: string;
  category: string;
  cover: string;
  body: string;
  featured: boolean;
  published: boolean;
  display_order: number;
};

type ContentItemRow = {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnail: string;
  type: "video" | "article" | "clip";
  tags: string[];
  featured: boolean;
  display_order: number;
};

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

function ContentItemForm({ row }: { row?: ContentItemRow }) {
  return (
    <form action={upsertContentItem} className={`${row ? "" : formCardClass} grid gap-4 md:grid-cols-2`}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Title" name="title" defaultValue={row?.title} required />
      <Field label="URL" name="url" defaultValue={row?.url ?? "https://www.youtube.com/@RadEsport"} required />
      <Field label="Thumbnail URL" name="thumbnail" defaultValue={row?.thumbnail ?? "/assets/rad-bg-red.png"} required />
      <Select label="Type" name="type" defaultValue={row?.type} options={["video", "article", "clip"]} />
      <Field label="Tags" name="tags" defaultValue={row?.tags?.join(", ")} />
      <Field label="Order" name="display_order" type="number" defaultValue={row?.display_order ?? 0} />
      <TextArea label="Description" name="description" defaultValue={row?.description} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Featured" name="featured" defaultChecked={row?.featured} />
        <button className={buttonClass} type="submit">
          {row ? "Save Card" : "Create Card"}
        </button>
      </div>
    </form>
  );
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

  const [news, roster, staff, partners, contentItems, inquiries, settings] = localAdminBypassEnabled
    ? await (async () => {
        const data = await readLocalDashboardData();
        return [
          { rows: data.news_posts as NewsPostRow[], error: null },
          { rows: data.roster_entries as RosterRow[], error: null },
          { rows: data.staff_entries as StaffRow[], error: null },
          { rows: data.partner_entries as PartnerRow[], error: null },
          { rows: data.content_items as ContentItemRow[], error: null },
          { rows: data.contact_inquiries as InquiryRow[], error: null },
          { rows: data.site_settings as SiteSettingRow[], error: null }
        ] as const;
      })()
    : await Promise.all([
        readTable<NewsPostRow>(
          realAccess!.supabase
            .from("news_posts")
            .select("*")
            .order("display_order", { ascending: true })
            .order("date", { ascending: false })
        ),
        readTable<RosterRow>(
          realAccess!.supabase.from("roster_entries").select("*").order("display_order", { ascending: true })
        ),
        readTable<StaffRow>(
          realAccess!.supabase.from("staff_entries").select("*").order("display_order", { ascending: true })
        ),
        readTable<PartnerRow>(
          realAccess!.supabase.from("partner_entries").select("*").order("display_order", { ascending: true })
        ),
        readTable<ContentItemRow>(
          realAccess!.supabase
            .from("content_items")
            .select("*")
            .order("display_order", { ascending: true })
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
  const defaultDashboardTab = "roster";
  const hasPeopleData = roster.rows.length > 0 || staff.rows.length > 0 || partners.rows.length > 0;

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
      description="Manage roster, staff, partners, content, and site settings."
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
            defaultTabId={defaultDashboardTab}
            header={
              <>
                {seedBanner}
                {!hasPeopleData && !localAdminBypassEnabled ? (
                  <p className="mb-4 text-sm text-white/55">
                    No roster, staff, or partner rows yet — use Import from site-data to sync static content.
                  </p>
                ) : null}
              </>
            }
            nav={[
              { id: "roster", label: "Roster", group: "People" },
              { id: "staff", label: "Staff", group: "People" },
              { id: "partners", label: "Partners", group: "People" },
              { id: "news", label: "News", group: "Content" },
              { id: "latest-content", label: "Latest", group: "Content" },
              { id: "inquiries", label: "Inquiries", group: "Ops" },
              { id: "settings", label: "Settings", group: "Ops" }
            ]}
          >
            <RosterSection rows={roster.rows} error={roster.error} />
            <StaffSection rows={staff.rows} error={staff.error} />
            <PartnersSection rows={partners.rows} error={partners.error} />

            <div className="grid gap-5">
              <SectionHeading eyebrow="News" title="Posts" description="Edit the news_posts collection." />
              {news.error ? (
                <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{news.error}</p>
              ) : null}
              <form action={createNewsPost} className={`${formCardClass} grid gap-4 md:grid-cols-2`}>
                <Field label="Title" name="title" required />
                <Field label="Slug" name="slug" />
                <Field label="Date" name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                <Field label="Category" name="category" defaultValue="Org Update" />
                <Field label="Cover URL" name="cover" defaultValue="/assets/rad-bg-red.png" />
                <FileField label="Cover Upload" name="cover_file" />
                <Field label="Order" name="display_order" type="number" defaultValue={0} />
                <TextArea label="Summary" name="summary" />
                <TextArea label="Body" name="body" />
                <div className="flex flex-wrap items-center gap-4 md:col-span-2">
                  <Check label="Featured" name="featured" />
                  <Check label="Published" name="published" defaultChecked />
                  <button className={buttonClass} type="submit">
                    Create Post
                  </button>
                  <span className={uploadHintClass}>Upload overrides cover URL when provided.</span>
                </div>
              </form>
              <div className="grid gap-4">
                {news.rows.map((post) => (
                  <div key={post.id} className={rowCardClass}>
                    <form action={updateNewsPost} className="grid gap-4 md:grid-cols-2">
                      <input type="hidden" name="id" value={post.id} />
                      <Field label="Title" name="title" defaultValue={post.title} required />
                      <Field label="Slug" name="slug" defaultValue={post.slug} required />
                      <Field label="Date" name="date" type="date" defaultValue={post.date} />
                      <Field label="Category" name="category" defaultValue={post.category} />
                      <Field label="Cover URL" name="cover" defaultValue={post.cover} />
                      <FileField label="Cover Upload" name="cover_file" />
                      <Field label="Order" name="display_order" type="number" defaultValue={post.display_order} />
                      <TextArea label="Summary" name="summary" defaultValue={post.summary} />
                      <TextArea label="Body" name="body" defaultValue={post.body} rows={7} />
                      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
                        <Check label="Featured" name="featured" defaultChecked={post.featured} />
                        <Check label="Published" name="published" defaultChecked={post.published} />
                        <button className={buttonClass} type="submit">
                          Save Post
                        </button>
                      </div>
                    </form>
                    <div className="mt-3">
                      <DeleteForm action={deleteNewsPost} id={post.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <SectionHeading eyebrow="Latest" title="Fallback media cards" />
              {contentItems.error ? (
                <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">
                  {contentItems.error}
                </p>
              ) : null}
              <ContentItemForm />
              <div className="grid gap-4">
                {contentItems.rows.map((item) => (
                  <div key={item.id} className={rowCardClass}>
                    <ContentItemForm row={item} />
                    <div className="mt-3">
                      <DeleteForm action={deleteContentItem} id={item.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                          <select
                            className={inputClass}
                            name="status"
                            defaultValue={inquiry.status}
                          >
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
