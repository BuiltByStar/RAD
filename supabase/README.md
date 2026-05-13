# RAD Supabase Setup

Use `schema.sql` for a brand-new Supabase database.

1. Open the Supabase project SQL editor.
2. Paste and run the full contents of `supabase/schema.sql`.
3. Log in to the website once with Discord. New users will get a `profiles` row automatically.
4. If the first user already existed before the schema was installed, rerun `supabase/schema.sql`; the backfill block will create the missing profile and assign the first profile as `owner`.
5. To manually promote an account, run:

```sql
update public.profiles
set role = 'owner'
where id = '<your-auth-user-id>';
```

Dashboard access is allowed only for `owner`, `admin`, and `developer`.
The app checks the live Supabase session and `public.profiles.role`; cookies do not grant access.
