import { ReorderControls } from "@/components/dashboard/reorder-controls";
import {
  buttonClass,
  formCardClass,
  rowCardClass,
  uploadHintClass
} from "@/components/dashboard/dashboard-styles";
import { Check, DeleteForm, Field, FileField, Select, TextArea } from "@/components/dashboard/dashboard-fields";
import {
  deleteRosterEntry,
  reorderRosterEntry,
  upsertRosterEntry
} from "@/app/dashboard/actions";
import { SectionHeading } from "@/components/ui";

export type RosterRow = {
  id: string;
  display_order: number;
  handle: string;
  slug?: string | null;
  real_name?: string | null;
  player_role: string;
  roster_header: string;
  region?: string | null;
  bio?: string | null;
  image_url?: string | null;
  x_url?: string | null;
  twitch_url?: string | null;
  instagram_url?: string | null;
  youtube_url?: string | null;
  featured: boolean;
  role_order: string;
  descriptor?: string | null;
  specialties?: string[] | null;
  tags?: string[] | null;
  rank?: string | null;
  jersey_number?: number | null;
};

function RosterForm({ row }: { row?: RosterRow }) {
  return (
    <form action={upsertRosterEntry} className={`${row ? "" : formCardClass} grid gap-4 md:grid-cols-2`}>
      {row ? <input type="hidden" name="id" value={row.id} /> : null}
      <Field label="Handle" name="handle" defaultValue={row?.handle} required />
      <Field label="Slug" name="slug" defaultValue={row?.slug} placeholder="url-hash-id" />
      <Field label="Real Name" name="real_name" defaultValue={row?.real_name} />
      <Field label="Player Role" name="player_role" defaultValue={row?.player_role ?? "DPS"} />
      <Field label="Descriptor" name="descriptor" defaultValue={row?.descriptor} />
      <Field label="Roster / Game" name="roster_header" defaultValue={row?.roster_header ?? "Marvel Rivals"} />
      <Field label="Region" name="region" defaultValue={row?.region} />
      <Field label="Rank" name="rank" defaultValue={row?.rank} />
      <Field label="Jersey #" name="jersey_number" type="number" defaultValue={row?.jersey_number} />
      <Field label="Image URL" name="image_url" defaultValue={row?.image_url} />
      <FileField label="Profile Upload" name="image_file" />
      <Field label="X URL" name="x_url" defaultValue={row?.x_url} />
      <Field label="Twitch URL" name="twitch_url" defaultValue={row?.twitch_url} />
      <Field label="Instagram URL" name="instagram_url" defaultValue={row?.instagram_url} />
      <Field label="YouTube URL" name="youtube_url" defaultValue={row?.youtube_url} />
      <Field
        label="Specialties"
        name="specialties"
        defaultValue={row?.specialties?.join(", ")}
        placeholder="Space Creation, Peel"
      />
      <Field label="Tags" name="tags" defaultValue={row?.tags?.join(", ")} placeholder="Starter, DPS" />
      <Select
        label="Role Order"
        name="role_order"
        defaultValue={row?.role_order}
        options={["Starter", "Sub", "Coach", "Manager"]}
      />
      <TextArea label="Bio" name="bio" defaultValue={row?.bio} rows={5} />
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <Check label="Featured" name="featured" defaultChecked={row?.featured} />
        <button className={buttonClass} type="submit">
          {row ? "Save Player" : "Add Player"}
        </button>
        {!row ? <span className={uploadHintClass}>Upload overrides image URL when provided.</span> : null}
      </div>
    </form>
  );
}

export function RosterSection({ rows, error }: { rows: RosterRow[]; error: string | null }) {
  const sorted = [...rows].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="grid gap-5">
      <SectionHeading
        eyebrow="Roster"
        title="Player cards"
        description="Handles, roles, bios, specialties, and profile images sync to the public roster revolver."
      />
      {error ? (
        <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{error}</p>
      ) : null}
      <RosterForm />
      <div className="grid gap-3">
        {sorted.map((player, index) => (
          <div key={player.id} className={rowCardClass}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-3">
              <div className="flex items-center gap-3">
                {player.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={player.image_url}
                    alt=""
                    className="h-12 w-12 rounded-md border border-white/10 object-cover"
                  />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-md border border-dashed border-white/15 text-[10px] text-white/35">
                    PFP
                  </div>
                )}
                <div>
                  <p className="font-[family-name:var(--font-display)] text-xl uppercase text-white">{player.handle}</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">
                    #{player.display_order} · {player.player_role}
                  </p>
                </div>
              </div>
              <ReorderControls
                id={player.id}
                action={reorderRosterEntry}
                canMoveUp={index > 0}
                canMoveDown={index < sorted.length - 1}
              />
            </div>
            <RosterForm row={player} />
            <div className="mt-3">
              <DeleteForm action={deleteRosterEntry} id={player.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
