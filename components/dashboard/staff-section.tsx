import { ReorderControls } from "@/components/dashboard/reorder-controls";
import { buttonClass, formCardClass, rowCardClass } from "@/components/dashboard/dashboard-styles";
import { Check, DeleteForm, Field, FileField, Select, TextArea } from "@/components/dashboard/dashboard-fields";
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

function StaffForm({ row }: { row?: StaffRow }) {
  return (
    <form action={upsertStaffEntry} className={`${row ? "" : formCardClass} grid gap-4 md:grid-cols-2`}>
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
        <button className={buttonClass} type="submit">
          {row ? "Save Staff" : "Add Staff"}
        </button>
      </div>
    </form>
  );
}

export function StaffSection({ rows, error }: { rows: StaffRow[]; error: string | null }) {
  const sorted = [...rows].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="grid gap-5">
      <SectionHeading eyebrow="Staff" title="Staff cards" description="Name, role, bio, group, tags, and images for /staff." />
      {error ? (
        <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{error}</p>
      ) : null}
      <StaffForm />
      <div className="grid gap-3">
        {sorted.map((member, index) => (
          <div key={member.id} className={rowCardClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-3">
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl uppercase text-white">{member.name}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                  #{member.display_order} · {member.title}
                </p>
              </div>
              <ReorderControls
                id={member.id}
                action={reorderStaffEntry}
                canMoveUp={index > 0}
                canMoveDown={index < sorted.length - 1}
              />
            </div>
            <StaffForm row={member} />
            <div className="mt-3">
              <DeleteForm action={deleteStaffEntry} id={member.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
