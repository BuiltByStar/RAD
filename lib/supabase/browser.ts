import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.publishableKey) {
    throw new Error("Supabase browser environment variables are not configured.");
  }

  return createBrowserClient(env.url, env.publishableKey);
}
