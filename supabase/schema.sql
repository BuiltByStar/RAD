-- RAD Esports Supabase bootstrap
-- Run this entire file in the Supabase SQL editor for a fresh database.
-- After your Discord login creates a profile row, make yourself owner:
-- update public.profiles set role = 'owner' where id = '<your-auth-user-id>';

create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon;
revoke all on schema private from authenticated;
grant usage on schema private to authenticated;
grant usage on schema private to service_role;

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
  cover text not null default '/assets/rad-bg-red.png',
  body text not null default '',
  featured boolean not null default false,
  published boolean not null default true
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  display_order integer not null default 0,
  title text not null,
  description text,
  url text not null,
  thumbnail text not null default '/assets/rad-bg-red.png',
  type text not null default 'video' check (type in ('video', 'article', 'clip')),
  tags text[] not null default '{}'::text[],
  featured boolean not null default false
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists contact_inquiries_submitted_at_idx on public.contact_inquiries(submitted_at desc);
create index if not exists roster_entries_display_order_idx on public.roster_entries(display_order);
create index if not exists staff_entries_display_order_idx on public.staff_entries(display_order);
create index if not exists partner_entries_display_order_idx on public.partner_entries(display_order);
create index if not exists news_posts_published_order_idx on public.news_posts(published, display_order, date desc);
create index if not exists content_items_display_order_idx on public.content_items(display_order);

do $$
begin
  execute 'drop trigger if exists on_auth_user_created_profile on auth.users';

  if to_regclass('public.profiles') is not null then
    execute 'drop trigger if exists profiles_touch_updated_at on public.profiles';
    execute 'drop policy if exists "profiles_read_own_or_staff" on public.profiles';
    execute 'drop policy if exists "profiles_update_own_safe_fields" on public.profiles';
    execute 'drop policy if exists "profiles_staff_manage" on public.profiles';
    execute 'drop policy if exists "profiles_self_select" on public.profiles';
    execute 'drop policy if exists "profiles_staff_select" on public.profiles';
    execute 'drop policy if exists "profiles_self_update_safe_fields" on public.profiles';
    execute 'drop policy if exists "profiles_owner_update_roles" on public.profiles';
  end if;

  if to_regclass('public.contact_inquiries') is not null then
    execute 'drop policy if exists "contact_inquiries_staff_read" on public.contact_inquiries';
    execute 'drop policy if exists "contact_inquiries_staff_select" on public.contact_inquiries';
    execute 'drop policy if exists "contact_inquiries_staff_update" on public.contact_inquiries';
    execute 'drop policy if exists "contact_inquiries_staff_delete" on public.contact_inquiries';
  end if;

  if to_regclass('public.roster_entries') is not null then
    execute 'drop trigger if exists roster_entries_touch_updated_at on public.roster_entries';
    execute 'drop policy if exists "roster_entries_public_read" on public.roster_entries';
    execute 'drop policy if exists "roster_entries_public_select" on public.roster_entries';
    execute 'drop policy if exists "roster_entries_staff_write" on public.roster_entries';
    execute 'drop policy if exists "roster_entries_staff_insert" on public.roster_entries';
    execute 'drop policy if exists "roster_entries_staff_update" on public.roster_entries';
    execute 'drop policy if exists "roster_entries_staff_delete" on public.roster_entries';
  end if;

  if to_regclass('public.staff_entries') is not null then
    execute 'drop trigger if exists staff_entries_touch_updated_at on public.staff_entries';
    execute 'drop policy if exists "staff_entries_public_read" on public.staff_entries';
    execute 'drop policy if exists "staff_entries_public_select" on public.staff_entries';
    execute 'drop policy if exists "staff_entries_staff_write" on public.staff_entries';
    execute 'drop policy if exists "staff_entries_staff_insert" on public.staff_entries';
    execute 'drop policy if exists "staff_entries_staff_update" on public.staff_entries';
    execute 'drop policy if exists "staff_entries_staff_delete" on public.staff_entries';
  end if;

  if to_regclass('public.partner_entries') is not null then
    execute 'drop trigger if exists partner_entries_touch_updated_at on public.partner_entries';
    execute 'drop policy if exists "partner_entries_public_read" on public.partner_entries';
    execute 'drop policy if exists "partner_entries_public_select" on public.partner_entries';
    execute 'drop policy if exists "partner_entries_staff_write" on public.partner_entries';
    execute 'drop policy if exists "partner_entries_staff_insert" on public.partner_entries';
    execute 'drop policy if exists "partner_entries_staff_update" on public.partner_entries';
    execute 'drop policy if exists "partner_entries_staff_delete" on public.partner_entries';
  end if;

  if to_regclass('public.news_posts') is not null then
    execute 'drop trigger if exists news_posts_touch_updated_at on public.news_posts';
    execute 'drop policy if exists "news_posts_public_read" on public.news_posts';
    execute 'drop policy if exists "news_posts_public_select" on public.news_posts';
    execute 'drop policy if exists "news_posts_staff_select" on public.news_posts';
    execute 'drop policy if exists "news_posts_staff_write" on public.news_posts';
    execute 'drop policy if exists "news_posts_staff_insert" on public.news_posts';
    execute 'drop policy if exists "news_posts_staff_update" on public.news_posts';
    execute 'drop policy if exists "news_posts_staff_delete" on public.news_posts';
  end if;

  if to_regclass('public.content_items') is not null then
    execute 'drop trigger if exists content_items_touch_updated_at on public.content_items';
    execute 'drop policy if exists "content_items_public_select" on public.content_items';
    execute 'drop policy if exists "content_items_staff_insert" on public.content_items';
    execute 'drop policy if exists "content_items_staff_update" on public.content_items';
    execute 'drop policy if exists "content_items_staff_delete" on public.content_items';
  end if;

  if to_regclass('public.site_settings') is not null then
    execute 'drop trigger if exists site_settings_touch_updated_at on public.site_settings';
    execute 'drop policy if exists "site_settings_public_read" on public.site_settings';
    execute 'drop policy if exists "site_settings_public_select" on public.site_settings';
    execute 'drop policy if exists "site_settings_staff_write" on public.site_settings';
    execute 'drop policy if exists "site_settings_staff_insert" on public.site_settings';
    execute 'drop policy if exists "site_settings_staff_update" on public.site_settings';
    execute 'drop policy if exists "site_settings_staff_delete" on public.site_settings';
  end if;
end $$;

drop function if exists public.touch_updated_at();
drop function if exists public.handle_new_user_profile();
drop function if exists public.current_user_role();
drop function if exists public.is_staff(uuid);
drop function if exists public.is_staff();
drop function if exists private.touch_updated_at();
drop function if exists private.handle_new_user_profile();
drop function if exists private.current_user_role();
drop function if exists private.is_staff(uuid);
drop function if exists private.is_staff();
drop function if exists private.is_owner(uuid);
drop function if exists private.is_owner();

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'global_name',
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'preferred_username'
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update
  set
    username = coalesce(public.profiles.username, excluded.username),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at = now();

  return new;
end;
$$;

create or replace function private.current_user_role()
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

create or replace function private.is_staff(check_user_id uuid default auth.uid())
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

create or replace function private.is_owner(check_user_id uuid default auth.uid())
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
      and role = 'owner'::public.user_role
  )
$$;

grant execute on function private.current_user_role() to authenticated;
grant execute on function private.is_staff(uuid) to authenticated;
grant execute on function private.is_owner(uuid) to authenticated;

create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function private.handle_new_user_profile();

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function private.touch_updated_at();

create trigger roster_entries_touch_updated_at
  before update on public.roster_entries
  for each row execute function private.touch_updated_at();

create trigger staff_entries_touch_updated_at
  before update on public.staff_entries
  for each row execute function private.touch_updated_at();

create trigger partner_entries_touch_updated_at
  before update on public.partner_entries
  for each row execute function private.touch_updated_at();

create trigger news_posts_touch_updated_at
  before update on public.news_posts
  for each row execute function private.touch_updated_at();

create trigger content_items_touch_updated_at
  before update on public.content_items
  for each row execute function private.touch_updated_at();

create trigger site_settings_touch_updated_at
  before update on public.site_settings
  for each row execute function private.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.roster_entries enable row level security;
alter table public.staff_entries enable row level security;
alter table public.partner_entries enable row level security;
alter table public.news_posts enable row level security;
alter table public.content_items enable row level security;
alter table public.site_settings enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant usage on type public.user_role to authenticated, service_role;

grant select on public.roster_entries to anon, authenticated;
grant select on public.staff_entries to anon, authenticated;
grant select on public.partner_entries to anon, authenticated;
grant select on public.news_posts to anon, authenticated;
grant select on public.content_items to anon, authenticated;
grant select on public.site_settings to anon, authenticated;

grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.news_posts to authenticated;
grant select, insert, update, delete on public.roster_entries to authenticated;
grant select, insert, update, delete on public.staff_entries to authenticated;
grant select, insert, update, delete on public.partner_entries to authenticated;
grant select, insert, update, delete on public.content_items to authenticated;
grant select, update, delete on public.contact_inquiries to authenticated;
grant select, insert, update, delete on public.site_settings to authenticated;

grant all on public.profiles to service_role;
grant all on public.contact_inquiries to service_role;
grant all on public.news_posts to service_role;
grant all on public.roster_entries to service_role;
grant all on public.staff_entries to service_role;
grant all on public.partner_entries to service_role;
grant all on public.content_items to service_role;
grant all on public.site_settings to service_role;

create policy "profiles_self_select"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_staff_select"
  on public.profiles for select
  to authenticated
  using (private.is_staff());

create policy "profiles_self_update_safe_fields"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and role = private.current_user_role());

create policy "profiles_owner_update_roles"
  on public.profiles for update
  to authenticated
  using (private.is_owner())
  with check (private.is_owner());

create policy "contact_inquiries_staff_select"
  on public.contact_inquiries for select
  to authenticated
  using (private.is_staff());

create policy "contact_inquiries_staff_update"
  on public.contact_inquiries for update
  to authenticated
  using (private.is_staff())
  with check (private.is_staff());

create policy "contact_inquiries_staff_delete"
  on public.contact_inquiries for delete
  to authenticated
  using (private.is_staff());

create policy "roster_entries_public_select"
  on public.roster_entries for select
  to anon, authenticated
  using (true);

create policy "roster_entries_staff_insert"
  on public.roster_entries for insert
  to authenticated
  with check (private.is_staff());

create policy "roster_entries_staff_update"
  on public.roster_entries for update
  to authenticated
  using (private.is_staff())
  with check (private.is_staff());

create policy "roster_entries_staff_delete"
  on public.roster_entries for delete
  to authenticated
  using (private.is_staff());

create policy "staff_entries_public_select"
  on public.staff_entries for select
  to anon, authenticated
  using (true);

create policy "staff_entries_staff_insert"
  on public.staff_entries for insert
  to authenticated
  with check (private.is_staff());

create policy "staff_entries_staff_update"
  on public.staff_entries for update
  to authenticated
  using (private.is_staff())
  with check (private.is_staff());

create policy "staff_entries_staff_delete"
  on public.staff_entries for delete
  to authenticated
  using (private.is_staff());

create policy "partner_entries_public_select"
  on public.partner_entries for select
  to anon, authenticated
  using (true);

create policy "partner_entries_staff_insert"
  on public.partner_entries for insert
  to authenticated
  with check (private.is_staff());

create policy "partner_entries_staff_update"
  on public.partner_entries for update
  to authenticated
  using (private.is_staff())
  with check (private.is_staff());

create policy "partner_entries_staff_delete"
  on public.partner_entries for delete
  to authenticated
  using (private.is_staff());

create policy "news_posts_public_select"
  on public.news_posts for select
  to anon, authenticated
  using (published = true);

create policy "news_posts_staff_select"
  on public.news_posts for select
  to authenticated
  using (private.is_staff());

create policy "news_posts_staff_insert"
  on public.news_posts for insert
  to authenticated
  with check (private.is_staff());

create policy "news_posts_staff_update"
  on public.news_posts for update
  to authenticated
  using (private.is_staff())
  with check (private.is_staff());

create policy "news_posts_staff_delete"
  on public.news_posts for delete
  to authenticated
  using (private.is_staff());

create policy "content_items_public_select"
  on public.content_items for select
  to anon, authenticated
  using (true);

create policy "content_items_staff_insert"
  on public.content_items for insert
  to authenticated
  with check (private.is_staff());

create policy "content_items_staff_update"
  on public.content_items for update
  to authenticated
  using (private.is_staff())
  with check (private.is_staff());

create policy "content_items_staff_delete"
  on public.content_items for delete
  to authenticated
  using (private.is_staff());

create policy "site_settings_public_select"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "site_settings_staff_insert"
  on public.site_settings for insert
  to authenticated
  with check (private.is_staff());

create policy "site_settings_staff_update"
  on public.site_settings for update
  to authenticated
  using (private.is_staff())
  with check (private.is_staff());

create policy "site_settings_staff_delete"
  on public.site_settings for delete
  to authenticated
  using (private.is_staff());

insert into public.site_settings (key, value)
values ('maintenance', '{"enabled": false}'::jsonb)
on conflict (key) do nothing;

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
drop policy if exists "rad_admin_media_staff_select" on storage.objects;
drop policy if exists "rad_admin_media_staff_insert" on storage.objects;
drop policy if exists "rad_admin_media_staff_update" on storage.objects;
drop policy if exists "rad_admin_media_staff_delete" on storage.objects;

create policy "rad_admin_media_staff_select"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'rad-admin-media' and private.is_staff());

create policy "rad_admin_media_staff_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'rad-admin-media'
    and private.is_staff()
    and lower(storage.extension(name)) = any (array['png', 'jpg', 'jpeg', 'webp'])
  );

create policy "rad_admin_media_staff_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'rad-admin-media' and private.is_staff())
  with check (
    bucket_id = 'rad-admin-media'
    and private.is_staff()
    and lower(storage.extension(name)) = any (array['png', 'jpg', 'jpeg', 'webp'])
  );

create policy "rad_admin_media_staff_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'rad-admin-media' and private.is_staff());

comment on table public.profiles is
  'User profile and role records. Dashboard authorization reads the live role from this table.';

comment on table public.contact_inquiries is
  'Website contact submissions for RAD Esports.';

comment on table public.news_posts is
  'RAD news and content posts. Featured and published are presentation flags.';

comment on table public.content_items is
  'Dashboard-managed latest content cards used when live content APIs are unavailable.';
