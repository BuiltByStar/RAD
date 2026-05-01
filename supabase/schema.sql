create extension if not exists pgcrypto;

do $$
begin
  create type public.user_role as enum ('member', 'owner', 'admin', 'developer');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  role public.user_role not null default 'member',
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  submitted_at timestamptz not null default now(),
  name text not null,
  email text not null,
  organization text,
  inquiry_type text not null,
  message text not null,
  socials text,
  source text not null default 'website',
  site_url text,
  status text not null default 'new'
);

create table if not exists public.roster_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  display_order integer not null default 0,
  handle text not null,
  real_name text,
  player_role text not null,
  roster_header text not null default 'Marvel Rivals',
  region text,
  bio text,
  image_url text,
  x_url text,
  twitch_url text,
  featured boolean not null default false,
  role_order text not null default 'Starter'
    check (role_order in ('Starter', 'Sub', 'Coach', 'Manager'))
);

create table if not exists public.staff_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  display_order integer not null default 0,
  name text not null,
  title text not null,
  bio text,
  x_url text,
  section text not null default 'General Staff'
    check (section in ('Leadership', 'Content + Social Media', 'General Staff')),
  leadership boolean not null default false,
  image_url text
);

create table if not exists public.partner_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  display_order integer not null default 0,
  name text,
  tier text,
  description text,
  logo_url text,
  url text,
  is_open_slot boolean not null default false
);

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  display_order integer not null default 0,
  title text not null,
  slug text not null unique,
  date date not null default current_date,
  summary text not null default '',
  category text not null default 'Org Update',
  cover text not null default '/assets/RadBannerNewTest300ppi.png',
  body text not null default '',
  featured boolean not null default false,
  published boolean not null default true
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
values ('maintenance', '{"enabled": false}'::jsonb)
on conflict (key) do nothing;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'global_name', new.raw_user_meta_data->>'full_name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid()
$$;

create or replace function public.is_staff(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_user_id
      and role = any (array[
        'owner'::public.user_role,
        'admin'::public.user_role,
        'developer'::public.user_role
      ])
  )
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists roster_entries_touch_updated_at on public.roster_entries;
create trigger roster_entries_touch_updated_at
  before update on public.roster_entries
  for each row execute function public.touch_updated_at();

drop trigger if exists staff_entries_touch_updated_at on public.staff_entries;
create trigger staff_entries_touch_updated_at
  before update on public.staff_entries
  for each row execute function public.touch_updated_at();

drop trigger if exists partner_entries_touch_updated_at on public.partner_entries;
create trigger partner_entries_touch_updated_at
  before update on public.partner_entries
  for each row execute function public.touch_updated_at();

drop trigger if exists news_posts_touch_updated_at on public.news_posts;
create trigger news_posts_touch_updated_at
  before update on public.news_posts
  for each row execute function public.touch_updated_at();

drop trigger if exists site_settings_touch_updated_at on public.site_settings;
create trigger site_settings_touch_updated_at
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.roster_entries enable row level security;
alter table public.staff_entries enable row level security;
alter table public.partner_entries enable row level security;
alter table public.news_posts enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "profiles_read_own_or_staff" on public.profiles;
create policy "profiles_read_own_or_staff"
  on public.profiles for select
  using (id = auth.uid() or public.is_staff());

drop policy if exists "profiles_update_own_safe_fields" on public.profiles;
create policy "profiles_update_own_safe_fields"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid() and role = public.current_user_role());

drop policy if exists "profiles_staff_manage" on public.profiles;
create policy "profiles_staff_manage"
  on public.profiles for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "contact_inquiries_staff_read" on public.contact_inquiries;
create policy "contact_inquiries_staff_read"
  on public.contact_inquiries for select
  using (public.is_staff());

drop policy if exists "contact_inquiries_staff_update" on public.contact_inquiries;
create policy "contact_inquiries_staff_update"
  on public.contact_inquiries for update
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "contact_inquiries_staff_delete" on public.contact_inquiries;
create policy "contact_inquiries_staff_delete"
  on public.contact_inquiries for delete
  using (public.is_staff());

drop policy if exists "roster_entries_public_read" on public.roster_entries;
create policy "roster_entries_public_read"
  on public.roster_entries for select
  using (true);

drop policy if exists "roster_entries_staff_write" on public.roster_entries;
create policy "roster_entries_staff_write"
  on public.roster_entries for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "staff_entries_public_read" on public.staff_entries;
create policy "staff_entries_public_read"
  on public.staff_entries for select
  using (true);

drop policy if exists "staff_entries_staff_write" on public.staff_entries;
create policy "staff_entries_staff_write"
  on public.staff_entries for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "partner_entries_public_read" on public.partner_entries;
create policy "partner_entries_public_read"
  on public.partner_entries for select
  using (true);

drop policy if exists "partner_entries_staff_write" on public.partner_entries;
create policy "partner_entries_staff_write"
  on public.partner_entries for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "news_posts_public_read" on public.news_posts;
create policy "news_posts_public_read"
  on public.news_posts for select
  using (published = true);

drop policy if exists "news_posts_staff_write" on public.news_posts;
create policy "news_posts_staff_write"
  on public.news_posts for all
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  using (true);

drop policy if exists "site_settings_staff_write" on public.site_settings;
create policy "site_settings_staff_write"
  on public.site_settings for all
  using (public.is_staff())
  with check (public.is_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'rad-admin-media',
  'rad-admin-media',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "rad_admin_media_public_read" on storage.objects;
create policy "rad_admin_media_public_read"
  on storage.objects for select
  using (bucket_id = 'rad-admin-media');

drop policy if exists "rad_admin_media_staff_insert" on storage.objects;
create policy "rad_admin_media_staff_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'rad-admin-media'
    and public.is_staff()
    and lower(storage.extension(name)) = any (array['png', 'jpg', 'jpeg', 'webp'])
  );

drop policy if exists "rad_admin_media_staff_update" on storage.objects;
create policy "rad_admin_media_staff_update"
  on storage.objects for update
  using (bucket_id = 'rad-admin-media' and public.is_staff())
  with check (
    bucket_id = 'rad-admin-media'
    and public.is_staff()
    and lower(storage.extension(name)) = any (array['png', 'jpg', 'jpeg', 'webp'])
  );

drop policy if exists "rad_admin_media_staff_delete" on storage.objects;
create policy "rad_admin_media_staff_delete"
  on storage.objects for delete
  using (bucket_id = 'rad-admin-media' and public.is_staff());

comment on table public.contact_inquiries is
  'Website contact submissions for RAD Esports.';

comment on table public.profiles is
  'User profile and staff role records. Dashboard authorization reads role from this table.';

comment on table public.news_posts is
  'RAD news and content posts. Featured is a presentation flag; archive and feature use this same collection.';
