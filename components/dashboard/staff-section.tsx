"use client";

import { useCallback, useState } from "react";

import type { ActionResult } from "@/app/dashboard/action-types";
import { CreatePanel } from "@/components/dashboard/create-panel";
import { DeleteButton } from "@/components/dashboard/delete-button";
import { EntryCard } from "@/components/dashboard/entry-card";
import { ReorderControls } from "@/components/dashboard/reorder-controls";
import { SubmitButton } from "@/components/dashboard/submit-button";
import { ToastForm } from "@/components/dashboard/toast-form";
import { Check, Field, FileField, Select, TextArea } from "@/components/dashboard/dashboard-fields";
import { deleteStaffEntry, reorderStaffEntry, upsertStaffEntry } from "@/app/dashboard/actions";
import { SectionHeading } from "@/components/ui";

export type StaffRow = {
  id: string;
  display_order: number;
  name: string;
  title: string;
  bio?: string | null;
  x_url?: string | null;
  section: string;
  leadership: boolean;
  image_url?: string | null;
  slug?: string | null;
  descriptor?: string | null;
  tags?: string[] | null;
  group_name?: string | null;
};

function StaffAvatar({ imageUrl }: { imageUrl?: string | null }) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-md border border-white/10 object-cover" />
    );
  }

  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-dashed border-white/15 text-[10px] text-white/35">
      IMG
    </div>
  );
}

function DetailField({ label, value }: { label: string; value?: string | number | null }) {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">{label}</p>
      <p className="mt-1 text-sm text-white/72">{value}</p>
    </div>
  );
}

function StaffDetail({ row }: { row: StaffRow }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <DetailField label="Title / Role" value={row.title} />
      <DetailField label="Section" value={row.section} />
      <DetailField label="Group" value={row.group_name} />
      <DetailField label="Descriptor" value={row.descriptor} />
      <DetailField label="Tags" value={row.tags?.join(", ")} />
      <DetailField label="Slug" value={row.slug} />
      <DetailField label="Leadership" value={row.leadership ? "Yes" : "No"} />
      {row.bio ? (
        <div className="md:col-span-2">
          <DetailField label="Bio" value={row.bio} />
        </div>
      ) : null}
      {row.x_url ? (
        <div className="md:col-span-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">X</p>
          <a href={row.x_url} className="mt-1 block break-all text-sm text-white/62 underline-offset-2 hover:underline">
            {row.x_url}
          </a>
        </div>
      ) : null}
    </div>
  );
}

function StaffForm({
  row,
  onSuccess
}: {
  row?: StaffRow;
  onSuccess?: (result: ActionResult) => void;
}) {
  return (
    <ToastForm
      action={upsertStaffEntry}
      className="grid gap-4 md:grid-cols-2"
      resetOnSuccess={!row}
      onSuccess={onSuccess}
    >
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Name" name="name" defaultValue={row?.name} required />
      <Field label="Slug" name="slug" defaultValue={row?.slug} />
      <Field label="Title / Role" name="title" defaultValue={row?.title} required />
      <Field label="Descriptor" name="descriptor" defaultValue={row?.descriptor} />
      <Field label="Group" name="group_name" defaultValue={row?.group_name} placeholder="Brand, Operations" />
      <Field label="Image URL" name="image_url" defaultValue={row?.image_url} />
      <FileField label="Image Upload" name="image_file" />
      <Field label="X URL" name="x_url" defaultValue={row?.x_url} />
      <Field label="Tags" name="tags" defaultValue={row?.tags?.join(", ")} />
      <Select
        label="Section"
        name="section"
        defaultValue={row?.section}
        options={["Leadership", "Content + Social Media", "General Staff"]}
      />
      <TextArea label="Bio" name="bio" defaultValue={row?.bio} rows={5} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Leadership" name="leadership" defaultChecked={row?.leadership} />
        <SubmitButton
          label={row ? "Save Staff member" : "Add Staff member"}
          pendingLabel={row ? "Saving Staff member..." : "Creating Staff member..."}
        />
      </div>
    </ToastForm>
  );
}

export function StaffSection({ rows, error }: { rows: StaffRow[]; error: string | null }) {
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
        eyebrow="Staff"
        title="Team"
        description="Manage staff cards for the public staff page — create, edit, reorder, or remove entries."
      />
      {error ? (
        <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{error}</p>
      ) : null}

      <CreatePanel label="Add Staff member" count={sorted.length} open={createOpen} onOpenChange={setCreateOpen}>
        <StaffForm
          onSuccess={(result) => {
            setCreateOpen(false);
            markChanged(result);
          }}
        />
      </CreatePanel>

      {sorted.length === 0 ? (
        <p className="rounded-lg border border-dashed border-white/12 bg-black/20 p-6 text-sm text-white/50">
          No staff yet. Import from site-data or add your first staff member above.
        </p>
      ) : (
        <div className="grid gap-2">
          {sorted.map((member, index) => (
            <EntryCard
              key={member.id}
              entryId={member.id}
              title={member.name}
              subtitle={`#${member.display_order} · ${member.title}${member.section ? ` · ${member.section}` : ""}`}
              image={<StaffAvatar imageUrl={member.image_url} />}
              reorder={
                <ReorderControls
                  id={member.id}
                  action={reorderStaffEntry}
                  canMoveUp={index > 0}
                  canMoveDown={index < sorted.length - 1}
                  noun="Staff member"
                  onMoved={markChanged}
                />
              }
              detail={<StaffDetail row={member} />}
              renderEditForm={(api) => (
                <StaffForm
                  row={member}
                  onSuccess={(result) => {
                    api.close();
                    markChanged(result);
                  }}
                />
              )}
              deleteForm={
                <DeleteButton
                  action={deleteStaffEntry}
                  id={member.id}
                  confirmMessage={`Remove ${member.name} from staff?`}
                  label={`Delete Staff member ${member.name}`}
                  noun="Staff member"
                />
              }
              justChanged={justChanged?.id === member.id}
              highlightKey={justChanged?.key}
            />
          ))}
        </div>
      )}
    </div>
  );
}
