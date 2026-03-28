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

The site now includes a server-side inquiry pipeline backed by Supabase.

Required environment variables:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Set the same variables in Vercel for:
- `Production`
- `Preview`
- `Development` if you use `vercel env pull`

Create the Supabase table by running the SQL in `supabase/schema.sql`.

Once configured:
- the contact page submits to `/api/contact`
- the route stores inquiries in `public.contact_inquiries`
- direct contact blocks still remain as a fallback
