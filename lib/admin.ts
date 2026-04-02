import { getAdminEmails } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminViewer() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const email = user?.email?.toLowerCase() ?? null;
    const isAdmin = Boolean(email && getAdminEmails().includes(email));

    return { user, email, isAdmin };
  } catch {
    return { user: null, email: null, isAdmin: false };
  }
}
