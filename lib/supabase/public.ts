import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "@/lib/env";

export function createSupabasePublicClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.publishableKey) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  return createClient(env.url, env.publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
