create extension if not exists pgcrypto;

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

alter table public.contact_inquiries enable row level security;

comment on table public.contact_inquiries is
  'Website contact submissions for RAD Esports.';
