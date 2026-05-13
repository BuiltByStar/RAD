# RAD Supabase Setup

Use `schema.sql` for a brand-new Supabase database.

1. Open the Supabase project SQL editor.
2. Paste and run the full contents of `supabase/schema.sql`.
3. Log in to the website once with Discord so Supabase creates your `profiles` row.
4. In the SQL editor, make that account an owner:

```sql
update public.profiles
set role = 'owner'
where id = '<your-auth-user-id>';
```

Dashboard access is allowed only for `owner`, `admin`, and `developer`.
The app checks the live Supabase session and `public.profiles.role`; cookies do not grant access.
