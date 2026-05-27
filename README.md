# RAD Esports

Next.js App Router site for RAD Esports, built around the current asset pack and ready for higher-quality media swaps later.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the site:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Vercel + Supabase Path

The site includes Supabase-backed contact intake plus Discord OAuth for staff login.

Required environment variables:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_RAD_SHOP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
MAINTENANCE_MODE=0
```

Set the same variables in Vercel for:
- `Production`
- `Preview`
- `Development` if you use `vercel env pull`

Create or update the Supabase schema by running the SQL in `supabase/schema.sql`.

Once configured:
- the contact page submits to `/api/contact`
- the route stores inquiries in `public.contact_inquiries`
- direct contact blocks still remain as a fallback
- login uses Supabase Discord OAuth and returns through `/auth/callback`
- `/dashboard` is protected by the live Supabase session plus `public.profiles.role`
- `/admin` redirects to `/dashboard` for compatibility

Allowed dashboard roles in `public.profiles.role`:

```text
owner
admin
developer
```

Role cookies are not trusted for admin access. Server pages and protected routes always call `supabase.auth.getUser()` and read the current `profiles.role` value.

Protected admin writes should go through server routes or server actions. The included `/api/admin/maintenance` route shows the pattern: same-origin request check, live session verification, `profiles.role` authorization, payload validation, and a server-side Supabase write. Supabase RLS policies in `supabase/schema.sql` remain the final database boundary.
