-- Extended fields for roster and staff CMS (descriptor, specialties, tags, etc.)

alter table public.roster_entries
  add column if not exists slug text,
  add column if not exists descriptor text,
  add column if not exists specialties text[] not null default '{}'::text[],
  add column if not exists tags text[] not null default '{}'::text[],
  add column if not exists rank text,
  add column if not exists jersey_number integer,
  add column if not exists instagram_url text,
  add column if not exists youtube_url text;

alter table public.staff_entries
  add column if not exists slug text,
  add column if not exists descriptor text,
  add column if not exists tags text[] not null default '{}'::text[],
  add column if not exists group_name text;

create index if not exists roster_entries_slug_idx on public.roster_entries(slug);
create index if not exists staff_entries_slug_idx on public.staff_entries(slug);
