import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { getAdminViewer } from "@/lib/admin";
import { hasSupabaseServiceEnv } from "@/lib/env";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export const metadata: Metadata = {
  title: "Admin",
  description: "RAD's restricted admin dashboard for website inquiries."
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
  source: string;
  site_url: string | null;
};

export default async function AdminPage() {
  const { user, isAdmin, email } = await getAdminViewer();

  if (!user) {
    redirect("/?auth=required");
  }

  if (!isAdmin) {
    return (
      <PageShell
        eyebrow="Admin"
        title="Access Denied."
        description="This dashboard is restricted to allowlisted admin accounts."
        background="black"
      >
        <section className="section">
          <div className="container admin-empty-state">
            <p className="section-copy">
              Signed in as <strong>{email ?? "unknown user"}</strong>, but this account is not listed in
              <code> ADMIN_EMAILS</code>.
            </p>
          </div>
        </section>
      </PageShell>
    );
  }

  if (!hasSupabaseServiceEnv()) {
    return (
      <PageShell
        eyebrow="Admin"
        title="Supabase Not Ready."
        description="The dashboard route exists, but the service role key is missing."
        background="black"
      >
        <section className="section">
          <div className="container admin-empty-state">
            <p className="section-copy">
              Add <code>SUPABASE_SERVICE_ROLE_KEY</code> in Vercel to enable inquiry reads for the admin dashboard.
            </p>
          </div>
        </section>
      </PageShell>
    );
  }

  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(error.message);
  }

  const inquiries = (data ?? []) as InquiryRow[];
  const statusCounts = inquiries.reduce<Record<string, number>>((acc, inquiry) => {
    acc[inquiry.status] = (acc[inquiry.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <PageShell
      eyebrow="Admin"
      title="RAD Dashboard."
      description="Operational visibility for inbound contact leads and website submissions."
      background="black"
    >
      <section className="section">
        <div className="container admin-metrics-grid">
          <article className="rad-card">
            <div className="rad-card__body">
              <p className="eyebrow">Total</p>
              <h2 className="admin-metric-value">{inquiries.length}</h2>
              <p className="card-desc">Recent submissions pulled from Supabase.</p>
            </div>
          </article>
          <article className="rad-card">
            <div className="rad-card__body">
              <p className="eyebrow">New</p>
              <h2 className="admin-metric-value">{statusCounts.new ?? 0}</h2>
              <p className="card-desc">Items still waiting on first review.</p>
            </div>
          </article>
          <article className="rad-card">
            <div className="rad-card__body">
              <p className="eyebrow">Partner Leads</p>
              <h2 className="admin-metric-value">
                {inquiries.filter((inquiry) => inquiry.inquiry_type.toLowerCase().includes("partner")).length}
              </h2>
              <p className="card-desc">Partnership-oriented submissions in the latest batch.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Inquiries</p>
              <h2>Latest submissions.</h2>
            </div>
            <div className="section-meta">
              <p className="section-copy">
                This dashboard currently reads website inquiries only. Status edits can be added next once the review
                workflow is settled.
              </p>
            </div>
          </div>

          {inquiries.length === 0 ? (
            <div className="admin-empty-state">
              <p className="section-copy">No inquiries stored yet. Submit the contact form once to seed this dashboard.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>
                        <strong>{inquiry.name}</strong>
                        {inquiry.organization ? <span className="admin-subtext">{inquiry.organization}</span> : null}
                      </td>
                      <td>{inquiry.inquiry_type}</td>
                      <td>
                        <span className="admin-status-pill">{inquiry.status}</span>
                      </td>
                      <td>{new Date(inquiry.submitted_at).toLocaleString()}</td>
                      <td>
                        <a href={`mailto:${inquiry.email}`} className="text-link">
                          {inquiry.email}
                        </a>
                        {inquiry.socials ? <span className="admin-subtext">{inquiry.socials}</span> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="admin-quick-links">
            <Link href="/contact" className="text-link">
              Contact page
            </Link>
            <Link href="/content" className="text-link">
              Content page
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
