-- Add Discord + TikTok URL columns to roster entries so the dashboard
-- form can capture every OrgSocialPlatform variant. The public roster
-- card renders each social as a platform icon.

alter table public.roster_entries
  add column if not exists discord_url text,
  add column if not exists tiktok_url text;
