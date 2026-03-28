function read(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value : undefined;
}

export function getPublicSiteUrl() {
  return (
    read("NEXT_PUBLIC_SITE_URL") ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

export function getSupabaseEnv() {
  return {
    url: read("NEXT_PUBLIC_SUPABASE_URL"),
    publishableKey: read("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    serviceRoleKey: read("SUPABASE_SERVICE_ROLE_KEY")
  };
}

export function hasSupabaseBrowserEnv() {
  const env = getSupabaseEnv();
  return Boolean(env.url && env.publishableKey);
}

export function hasSupabaseServiceEnv() {
  const env = getSupabaseEnv();
  return Boolean(env.url && env.serviceRoleKey);
}
