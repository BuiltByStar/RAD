import { CreatePanel } from "@/components/dashboard/create-panel";
import { EntryCard } from "@/components/dashboard/entry-card";
import { ReorderControls } from "@/components/dashboard/reorder-controls";
import { buttonClass, uploadHintClass } from "@/components/dashboard/dashboard-styles";
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

function RosterAvatar({ imageUrl }: { imageUrl?: string | null }) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt="" className="h-12 w-12 shrink-0 rounded-md border border-white/10 object-cover" />
    );
  }

  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-dashed border-white/15 text-[10px] text-white/35">
      PFP
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

function RosterDetail({ row }: { row: RosterRow }) {
  const socials = [
    row.x_url ? { label: "X", value: row.x_url } : null,
    row.twitch_url ? { label: "Twitch", value: row.twitch_url } : null,
    row.instagram_url ? { label: "Instagram", value: row.instagram_url } : null,
    row.youtube_url ? { label: "YouTube", value: row.youtube_url } : null
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <DetailField label="Real Name" value={row.real_name} />
      <DetailField label="Player Role" value={row.player_role} />
      <DetailField label="Roster / Game" value={row.roster_header} />
      <DetailField label="Region" value={row.region} />
      <DetailField label="Rank" value={row.rank} />
      <DetailField label="Jersey #" value={row.jersey_number} />
      <DetailField label="Role Order" value={row.role_order} />
      <DetailField label="Descriptor" value={row.descriptor} />
      <DetailField label="Specialties" value={row.specialties?.join(", ")} />
      <DetailField label="Tags" value={row.tags?.join(", ")} />
      <DetailField label="Slug" value={row.slug} />
      <DetailField label="Featured" value={row.featured ? "Yes" : "No"} />
      {row.bio ? (
        <div className="md:col-span-2">
          <DetailField label="Bio" value={row.bio} />
        </div>
      ) : null}
      {socials.length ? (
        <div className="md:col-span-2">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/32">Socials</p>
          <ul className="mt-2 grid gap-1 text-sm text-white/62">
            {socials.map((link) => (
              <li key={link.label}>
                <span className="text-white/40">{link.label} · </span>
                <a href={link.value} className="break-all underline-offset-2 hover:underline">
                  {link.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function RosterForm({ row }: { row?: RosterRow }) {
  return (
    <form action={upsertRosterEntry} className="grid gap-4 md:grid-cols-2">
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
        title="Players"
        description="Manage player cards for the public roster revolver — create, edit, reorder, or remove entries."
      />
      {error ? (
        <p className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm text-white/62">{error}</p>
      ) : null}

      <CreatePanel label="Add Player" count={sorted.length}>
        <RosterForm />
      </CreatePanel>

      {sorted.length === 0 ? (
        <p className="rounded-lg border border-dashed border-white/12 bg-black/20 p-6 text-sm text-white/50">
          No players yet. Import from site-data or add your first player above.
        </p>
      ) : (
        <div className="grid gap-2">
          {sorted.map((player, index) => (
            <EntryCard
              key={player.id}
              title={player.handle}
              subtitle={`#${player.display_order} · ${player.player_role}${player.role_order ? ` · ${player.role_order}` : ""}`}
              image={<RosterAvatar imageUrl={player.image_url} />}
              reorder={
                <ReorderControls
                  id={player.id}
                  action={reorderRosterEntry}
                  canMoveUp={index > 0}
                  canMoveDown={index < sorted.length - 1}
                />
              }
              detail={<RosterDetail row={player} />}
              editForm={<RosterForm row={player} />}
              deleteForm={
                <DeleteForm
                  action={deleteRosterEntry}
                  id={player.id}
                  confirmMessage={`Remove ${player.handle} from the roster?`}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
