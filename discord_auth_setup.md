# Discord OAuth Setup for RAD Esports

To make the Discord login work on your site, you need to configure the connection between **Discord** and **Supabase**. Follow these steps:

## 1. Create a Discord Application
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **"New Application"** and name it (e.g., "RAD Esports Login").
3. In the sidebar, go to **OAuth2 > General**.
4. Copy your **Client ID** and **Client Secret** (you'll need these for Supabase).
5. Click **"Add Redirect"** and enter your Supabase callback URL. It usually looks like this:
   `https://[YOUR_PROJECT_ID].supabase.co/auth/v1/callback`
   *(You can find this in your Supabase Auth settings).*

## 2. Configure Supabase
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **Authentication > Providers**.
3. Find **Discord** in the list and enable it.
4. Enter the **Client ID** and **Client Secret** you copied from Discord.
5. Save the changes.

## 3. Environment Variables
Ensure your local `.env` file (or Vercel environment variables) has the following:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anonymous Key.

## 4. Test the Login
1. Once configured, click the **Login** button in the site header.
2. It should redirect you to Discord for authorization.
3. After authorizing, you should be redirected back to RAD Esports and be logged in!

> [!NOTE]
> If you see a "redirect_uri_mismatch" error, double-check that the redirect URL in Discord EXACTLY matches the one shown in your Supabase Discord provider settings.
