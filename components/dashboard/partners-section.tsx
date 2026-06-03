import { ReorderControls } from "@/components/dashboard/reorder-controls";
import { buttonClass, formCardClass, rowCardClass } from "@/components/dashboard/dashboard-styles";
import { Check, DeleteForm, Field, FileField, TextArea } from "@/components/dashboard/dashboard-fields";
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

function PartnerForm({ row }: { row?: PartnerRow }) {
  return (
    <form action={upsertPartnerEntry} className={`${row ? "" : formCardClass} grid gap-4 md:grid-cols-2`}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Name" name="name" defaultValue={row?.name} />
      <Field label="Tier" name="tier" defaultValue={row?.tier ?? "Official"} />
      <Field label="Logo URL" name="logo_url" defaultValue={row?.logo_url} />
      <FileField label="Logo Upload" name="logo_file" />
      <Field label="URL" name="url" defaultValue={row?.url ?? "/contact"} />
      <TextArea label="Description" name="description" defaultValue={row?.description} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Open Slot" name="is_open_slot" defaultChecked={row?.is_open_slot} />
        <button className={buttonClass} type="submit">
          {row ? "Save Partner" : "Add Partner"}
        </button>
      </div>
    </form>
  );
}

export function PartnersSection({ rows, error }: { rows: PartnerRow[]; error: string | null }) {
  const sorted = [...rows].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="grid gap-5">
      <SectionHeading
        eyebrow="Partners"
        title="Partner wall"
        description="Order and logos sync to the public partners page."
      />
      {error ? (
        <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{error}</p>
      ) : null}
      <PartnerForm />
      <div className="grid gap-3">
        {sorted.map((partner, index) => (
          <div key={partner.id} className={rowCardClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-3">
              <div className="flex items-center gap-3">
                {partner.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo_url}
                    alt=""
                    className="h-10 w-24 object-contain opacity-90"
                  />
                ) : (
                  <div className="grid h-10 w-16 place-items-center border border-dashed border-white/15 text-[9px] text-white/35">
                    LOGO
                  </div>
                )}
                <div>
                  <p className="font-[family-name:var(--font-display)] text-lg uppercase text-white">
                    {partner.name ?? "Open slot"}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">{partner.tier}</p>
                </div>
              </div>
              <ReorderControls
                id={partner.id}
                action={reorderPartnerEntry}
                canMoveUp={index > 0}
                canMoveDown={index < sorted.length - 1}
              />
            </div>
            <PartnerForm row={partner} />
            <div className="mt-3">
              <DeleteForm action={deletePartnerEntry} id={partner.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
