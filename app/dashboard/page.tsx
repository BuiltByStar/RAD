import type { Metadata } from "next";
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
import { requireAdminAccess } from "@/lib/admin";

import {
  createNewsPost,
  deleteNewsPost,
  deletePartnerEntry,
  deleteRosterEntry,
  deleteStaffEntry,
  updateInquiryStatus,
  updateMaintenanceSetting,
  updateNewsPost,
  upsertPartnerEntry,
  upsertRosterEntry,
  upsertStaffEntry
} from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "RAD's restricted admin dashboard for website operations."
};

export const dynamic = "force-dynamic";

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

type RosterRow = {
  id: string;
  display_order: number;
  handle: string;
  real_name: string | null;
  player_role: string;
  roster_header: string;
  region: string | null;
  bio: string | null;
  image_url: string | null;
  x_url: string | null;
  twitch_url: string | null;
  featured: boolean;
  role_order: string;
};

type StaffRow = {
  id: string;
  display_order: number;
  name: string;
  title: string;
  bio: string | null;
  x_url: string | null;
  section: string;
  leadership: boolean;
  image_url: string | null;
};

type PartnerRow = {
  id: string;
  display_order: number;
  name: string | null;
  tier: string | null;
  description: string | null;
  logo_url: string | null;
  url: string | null;
  is_open_slot: boolean;
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

const inputClass =
  "w-full rounded-md border border-white/10 bg-black/45 px-3 py-2 text-sm text-white outline-none transition focus:border-[color:var(--color-rad)]";
const labelClass = "grid gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/48";
const formCardClass = "rounded-lg border border-white/10 bg-white/[0.035] p-4";
const rowCardClass = "rounded-lg border border-white/10 bg-black/30 p-4";
const buttonClass =
  "inline-flex rounded-md border border-[color:var(--color-rad)]/40 bg-[color:var(--color-rad)]/14 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[color:var(--color-rad)]/24";
const dangerButtonClass =
  "inline-flex rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-[color:var(--color-rad)]/40 hover:text-white";

async function readTable<T>(query: PromiseLike<{ data: unknown; error: { message: string } | null }>) {
  const { data, error } = await query;
  return {
    rows: error ? [] : ((data ?? []) as T[]),
    error: error?.message ?? null
  };
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      <input
        className={inputClass}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
      />
    </label>
  );
}

function TextArea({ label, name, defaultValue, rows = 4 }: { label: string; name: string; defaultValue?: string | null; rows?: number }) {
  return (
    <label className={labelClass}>
      {label}
      <textarea className={inputClass} name={name} rows={rows} defaultValue={defaultValue ?? ""} />
    </label>
  );
}

function Check({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/58">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-[#ff0000]" />
      {label}
    </label>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  options: string[];
}) {
  return (
    <label className={labelClass}>
      {label}
      <select className={inputClass} name={name} defaultValue={defaultValue ?? options[0]}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DeleteForm({ action, id, label = "Delete" }: { action: (formData: FormData) => void | Promise<void>; id: string; label?: string }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className={dangerButtonClass} type="submit">
        {label}
      </button>
    </form>
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
            ? "Supabase environment variables are missing, so RAD cannot verify the protected session."
            : "Admin access is limited to owner, admin, and developer roles in public.profiles."
        }
        heroImage="/assets/RadRivals_Wallpaper_Black.png"
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

  const [news, roster, staff, partners, inquiries, settings] = await Promise.all([
    readTable<NewsPostRow>(
      access.supabase
        .from("news_posts")
        .select("*")
        .order("display_order", { ascending: true })
        .order("date", { ascending: false })
    ),
    readTable<RosterRow>(
      access.supabase
        .from("roster_entries")
        .select("*")
        .order("display_order", { ascending: true })
    ),
    readTable<StaffRow>(
      access.supabase
        .from("staff_entries")
        .select("*")
        .order("display_order", { ascending: true })
    ),
    readTable<PartnerRow>(
      access.supabase
        .from("partner_entries")
        .select("*")
        .order("display_order", { ascending: true })
    ),
    readTable<InquiryRow>(
      access.supabase
        .from("contact_inquiries")
        .select("*")
        .order("submitted_at", { ascending: false })
        .limit(50)
    ),
    readTable<SiteSettingRow>(access.supabase.from("site_settings").select("*"))
  ]);

  const maintenance = settings.rows.find((setting) => setting.key === "maintenance")?.value?.enabled ?? false;

  return (
    <PageShell
      variant="default"
      eyebrow="Dashboard"
      title="RAD Admin."
      description="Manage news, roster, staff, partners, inquiries, and core site settings from one protected panel."
      heroImage="/assets/RadRivals_Wallpaper_Black.png"
      status={`Signed in as ${access.role}`}
    >
      <Section padding="sm">
        <Container>
          <SectionHeading eyebrow="Overview" title="CMS core." />

          <CardGrid cols={4}>
            <Card tone="metric">
              <CardMetric>{String(news.rows.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">News Posts</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>{String(roster.rows.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">Roster Rows</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>{String(staff.rows.length).padStart(2, "0")}</CardMetric>
              <CardEyebrow className="mt-2">Staff Rows</CardEyebrow>
            </Card>
            <Card tone="metric">
              <CardMetric>{maintenance ? "ON" : "OK"}</CardMetric>
              <CardEyebrow className="mt-2">Maintenance</CardEyebrow>
            </Card>
          </CardGrid>

          <div className="mt-6 flex flex-wrap gap-2">
            {["news", "roster", "staff", "partners", "inquiries", "settings"].map((item) => (
              <a key={item} href={`#${item}`} className={buttonClass}>
                {item}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="news" padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading
            eyebrow="News"
            title="One posts collection."
            description="Feature and archive are display choices. The admin edits the same news_posts table."
          />

          {news.error ? (
            <p className="mb-5 rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{news.error}</p>
          ) : null}

          <form action={createNewsPost} className={`${formCardClass} grid gap-4 md:grid-cols-2`}>
            <Field label="Title" name="title" required />
            <Field label="Slug" name="slug" />
            <Field label="Date" name="date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
            <Field label="Category" name="category" defaultValue="Org Update" />
            <Field label="Cover URL" name="cover" defaultValue="/assets/RadBannerNewTest300ppi.png" />
            <Field label="Order" name="display_order" type="number" defaultValue={0} />
            <TextArea label="Summary" name="summary" />
            <TextArea label="Body" name="body" />
            <div className="flex flex-wrap items-center gap-4 md:col-span-2">
              <Check label="Featured" name="featured" />
              <Check label="Published" name="published" defaultChecked />
              <button className={buttonClass} type="submit">
                Create Post
              </button>
            </div>
          </form>

          <div className="mt-5 grid gap-4">
            {news.rows.map((post) => (
              <div key={post.id} className={rowCardClass}>
                <form action={updateNewsPost} className="grid gap-4 md:grid-cols-2">
                  <input type="hidden" name="id" value={post.id} />
                  <Field label="Title" name="title" defaultValue={post.title} required />
                  <Field label="Slug" name="slug" defaultValue={post.slug} required />
                  <Field label="Date" name="date" type="date" defaultValue={post.date} />
                  <Field label="Category" name="category" defaultValue={post.category} />
                  <Field label="Cover URL" name="cover" defaultValue={post.cover} />
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
        </Container>
      </Section>

      <Section id="roster" padding="sm">
        <Container>
          <SectionHeading eyebrow="Roster" title="Manage player records." />
          <RosterForm />
          <div className="mt-5 grid gap-4">
            {roster.rows.map((player) => (
              <div key={player.id} className={rowCardClass}>
                <RosterForm row={player} />
                <div className="mt-3">
                  <DeleteForm action={deleteRosterEntry} id={player.id} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="staff" padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading eyebrow="Staff" title="Manage staff records." />
          <StaffForm />
          <div className="mt-5 grid gap-4">
            {staff.rows.map((member) => (
              <div key={member.id} className={rowCardClass}>
                <StaffForm row={member} />
                <div className="mt-3">
                  <DeleteForm action={deleteStaffEntry} id={member.id} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="partners" padding="sm">
        <Container>
          <SectionHeading eyebrow="Partners" title="Manage partner lanes." />
          <PartnerForm />
          <div className="mt-5 grid gap-4">
            {partners.rows.map((partner) => (
              <div key={partner.id} className={rowCardClass}>
                <PartnerForm row={partner} />
                <div className="mt-3">
                  <DeleteForm action={deletePartnerEntry} id={partner.id} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="inquiries" padding="sm" className="bg-white/[.015]">
        <Container>
          <SectionHeading eyebrow="Inquiries" title="Review contact submissions." />
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
                    {inquiry.organization ? <p className="mt-1 text-sm text-white/45">{inquiry.organization}</p> : null}
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/62">{inquiry.message}</p>
                  </div>
                  <form action={updateInquiryStatus} className="flex flex-wrap items-end gap-3">
                    <input type="hidden" name="id" value={inquiry.id} />
                    <Select label="Status" name="status" defaultValue={inquiry.status} options={["new", "reviewing", "replied", "closed"]} />
                    <button className={buttonClass} type="submit">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="settings" padding="sm">
        <Container>
          <SectionHeading eyebrow="Settings" title="Site controls." />
          <form action={updateMaintenanceSetting} className={`${formCardClass} flex flex-wrap items-center gap-4`}>
            <Check label="Maintenance mode" name="enabled" defaultChecked={maintenance} />
            <button className={buttonClass} type="submit">
              Save Settings
            </button>
          </form>
        </Container>
      </Section>
    </PageShell>
  );
}

function RosterForm({ row }: { row?: RosterRow }) {
  return (
    <form action={upsertRosterEntry} className={`${row ? "" : formCardClass} grid gap-4 md:grid-cols-2`}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Handle" name="handle" defaultValue={row?.handle} required />
      <Field label="Real Name" name="real_name" defaultValue={row?.real_name} />
      <Field label="Player Role" name="player_role" defaultValue={row?.player_role ?? "DPS"} />
      <Field label="Roster Header" name="roster_header" defaultValue={row?.roster_header ?? "Marvel Rivals"} />
      <Field label="Region" name="region" defaultValue={row?.region} />
      <Field label="Image URL" name="image_url" defaultValue={row?.image_url} />
      <Field label="X URL" name="x_url" defaultValue={row?.x_url} />
      <Field label="Twitch URL" name="twitch_url" defaultValue={row?.twitch_url} />
      <Select label="Role Order" name="role_order" defaultValue={row?.role_order} options={["Starter", "Sub", "Coach", "Manager"]} />
      <Field label="Order" name="display_order" type="number" defaultValue={row?.display_order ?? 0} />
      <TextArea label="Bio" name="bio" defaultValue={row?.bio} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Featured" name="featured" defaultChecked={row?.featured} />
        <button className={buttonClass} type="submit">
          {row ? "Save Player" : "Create Player"}
        </button>
      </div>
    </form>
  );
}

function StaffForm({ row }: { row?: StaffRow }) {
  return (
    <form action={upsertStaffEntry} className={`${row ? "" : formCardClass} grid gap-4 md:grid-cols-2`}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Name" name="name" defaultValue={row?.name} required />
      <Field label="Title" name="title" defaultValue={row?.title} required />
      <Field label="Image URL" name="image_url" defaultValue={row?.image_url} />
      <Field label="X URL" name="x_url" defaultValue={row?.x_url} />
      <Select
        label="Section"
        name="section"
        defaultValue={row?.section}
        options={["Leadership", "Content + Social Media", "General Staff"]}
      />
      <Field label="Order" name="display_order" type="number" defaultValue={row?.display_order ?? 0} />
      <TextArea label="Bio" name="bio" defaultValue={row?.bio} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Leadership" name="leadership" defaultChecked={row?.leadership} />
        <button className={buttonClass} type="submit">
          {row ? "Save Staff" : "Create Staff"}
        </button>
      </div>
    </form>
  );
}

function PartnerForm({ row }: { row?: PartnerRow }) {
  return (
    <form action={upsertPartnerEntry} className={`${row ? "" : formCardClass} grid gap-4 md:grid-cols-2`}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Name" name="name" defaultValue={row?.name} />
      <Field label="Tier" name="tier" defaultValue={row?.tier ?? "Open Slot"} />
      <Field label="Logo URL" name="logo_url" defaultValue={row?.logo_url} />
      <Field label="URL" name="url" defaultValue={row?.url} />
      <Field label="Order" name="display_order" type="number" defaultValue={row?.display_order ?? 0} />
      <TextArea label="Description" name="description" defaultValue={row?.description} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Open Slot" name="is_open_slot" defaultChecked={row?.is_open_slot} />
        <button className={buttonClass} type="submit">
          {row ? "Save Partner" : "Create Partner"}
        </button>
      </div>
    </form>
  );
}
