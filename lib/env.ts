function read(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}

export function getPublicSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  return { url, publishableKey, serviceRoleKey };
}

export function hasSupabaseBrowserEnv() {
  const env = getSupabaseEnv();
  return Boolean(env.url && env.publishableKey);
}

export function hasSupabaseServiceEnv() {
  const env = getSupabaseEnv();
  return Boolean(env.url && env.serviceRoleKey);
}
