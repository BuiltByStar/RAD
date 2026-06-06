"use client";

import { useCallback, useState } from "react";

import type { ActionResult } from "@/app/dashboard/action-types";
import { CreatePanel } from "@/components/dashboard/create-panel";
import { DeleteButton } from "@/components/dashboard/delete-button";
import { EntryCard } from "@/components/dashboard/entry-card";
import { ReorderControls } from "@/components/dashboard/reorder-controls";
import { SubmitButton } from "@/components/dashboard/submit-button";
import { ToastForm } from "@/components/dashboard/toast-form";
import { Check, Field, FileField, TextArea } from "@/components/dashboard/dashboard-fields";
import { deletePartnerEntry, reorderPartnerEntry, upsertPartnerEntry } from "@/app/dashboard/actions";
import { SectionHeading } from "@/components/ui";

export type PartnerRow = {
  id: string;
  display_order: number;
  name: string | null;
  tier: string | null;
  description: string | null;
  logo_url: string | null;
  url: string | null;
  is_open_slot: boolean;
};

function PartnerLogo({ logoUrl }: { logoUrl?: string | null }) {
  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logoUrl} alt="" className="h-10 w-24 shrink-0 object-contain opacity-90" />
    );
  }

  return (
    <div className="grid h-10 w-16 shrink-0 place-items-center border border-dashed border-white/15 text-[9px] text-white/35">
      LOGO
    </div>
  );
}

function PartnerDetail({ row }: { row: PartnerRow }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {row.tier ? (
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">Tier</p>
          <p className="mt-1 text-sm text-white/72">{row.tier}</p>
        </div>
      ) : null}
      {row.url ? (
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">URL</p>
          <a href={row.url} className="mt-1 block break-all text-sm text-white/62 underline-offset-2 hover:underline">
            {row.url}
          </a>
        </div>
      ) : null}
      {row.description ? (
        <div className="md:col-span-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">Description</p>
          <p className="mt-1 text-sm text-white/72">{row.description}</p>
        </div>
      ) : null}
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">Open Slot</p>
        <p className="mt-1 text-sm text-white/72">{row.is_open_slot ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

function PartnerForm({
  row,
  onSuccess
}: {
  row?: PartnerRow;
  onSuccess?: (result: ActionResult) => void;
}) {
  return (
    <ToastForm
      action={upsertPartnerEntry}
      className="grid gap-4 md:grid-cols-2"
      resetOnSuccess={!row}
      onSuccess={onSuccess}
    >
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Name" name="name" defaultValue={row?.name} />
      <Field label="Tier" name="tier" defaultValue={row?.tier ?? "Official"} />
      <Field label="Logo URL" name="logo_url" defaultValue={row?.logo_url} />
      <FileField label="Logo Upload" name="logo_file" />
      <Field label="URL" name="url" defaultValue={row?.url ?? "/contact"} />
      <TextArea label="Description" name="description" defaultValue={row?.description} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Open Slot" name="is_open_slot" defaultChecked={row?.is_open_slot} />
        <SubmitButton
          label={row ? "Save Partner slot" : "Add Partner slot"}
          pendingLabel={row ? "Saving Partner slot..." : "Creating Partner slot..."}
        />
      </div>
    </ToastForm>
  );
}

export function PartnersSection({ rows, error }: { rows: PartnerRow[]; error: string | null }) {
  const sorted = [...rows].sort((a, b) => a.display_order - b.display_order);
  const [createOpen, setCreateOpen] = useState(false);
  const [justChanged, setJustChanged] = useState<{ id: string; key: number } | null>(null);

  const markChanged = useCallback((result: ActionResult) => {
    if (!result.id) return;
    setJustChanged((current) => ({
      id: result.id!,
      key: current && current.id === result.id ? current.key + 1 : 1
    }));
  }, []);

  return (
    <div className="grid gap-5">
      <SectionHeading
        eyebrow="Partners"
        title="Partner wall"
        description="Secondary — order and logos sync to the public partners page."
      />
      {error ? (
        <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{error}</p>
      ) : null}

      <CreatePanel label="Add Partner slot" count={sorted.length} open={createOpen} onOpenChange={setCreateOpen}>
        <PartnerForm
          onSuccess={(result) => {
            setCreateOpen(false);
            markChanged(result);
          }}
        />
      </CreatePanel>

      {sorted.length === 0 ? (
        <p className="rounded-lg border border-dashed border-white/12 bg-black/20 p-6 text-sm text-white/50">
          No partners yet. Import from site-data or add a partner above.
        </p>
      ) : (
        <div className="grid gap-2">
          {sorted.map((partner, index) => (
            <EntryCard
              key={partner.id}
              entryId={partner.id}
              title={partner.name ?? "Open slot"}
              subtitle={`#${partner.display_order}${partner.tier ? ` · ${partner.tier}` : ""}`}
              image={<PartnerLogo logoUrl={partner.logo_url} />}
              reorder={
                <ReorderControls
                  id={partner.id}
                  action={reorderPartnerEntry}
                  canMoveUp={index > 0}
                  canMoveDown={index < sorted.length - 1}
                  noun="Partner slot"
                  onMoved={markChanged}
                />
              }
              detail={<PartnerDetail row={partner} />}
              renderEditForm={(api) => (
                <PartnerForm
                  row={partner}
                  onSuccess={(result) => {
                    api.close();
                    markChanged(result);
                  }}
                />
              )}
              deleteForm={
                <DeleteButton
                  action={deletePartnerEntry}
                  id={partner.id}
                  confirmMessage={`Remove ${partner.name ?? "this partner slot"}?`}
                  label={`Delete Partner slot ${partner.name ?? "Open slot"}`}
                  noun="Partner slot"
                />
              }
              justChanged={justChanged?.id === partner.id}
              highlightKey={justChanged?.key}
            />
          ))}
        </div>
      )}
    </div>
  );
}
