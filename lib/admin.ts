import { createSupabaseServerClient } from "@/lib/supabase/server";

export const adminRoles = ["owner", "admin", "developer"] as const;

export type AdminRole = (typeof adminRoles)[number];

export type AdminAccess =
  | {
      ok: true;
      supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
      userId: string;
      email: string | null;
      role: AdminRole;
    }
  | {
      ok: false;
      status: 401 | 403 | 503;
      user: null;
      email: string | null;
      role: null;
    };

export function normalizeStaffRole(role: unknown): AdminRole | null {
  if (typeof role !== "string") return null;
  const normalized = role.trim().toLowerCase();
  return adminRoles.includes(normalized as AdminRole) ? (normalized as AdminRole) : null;
}

export async function requireAdminAccess(): Promise<AdminAccess> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return { ok: false, status: 401, user: null, email: null, role: null };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const role = normalizeStaffRole(profile?.role);

    if (!role) {
      return {
        ok: false,
        status: 403,
        user: null,
        email: user.email ?? null,
        role: null
      };
    }

    return {
      ok: true,
      supabase,
      userId: user.id,
      email: user.email ?? null,
      role
    };
  } catch {
    return { ok: false, status: 503, user: null, email: null, role: null };
  }
}

export async function getAdminViewer() {
  const access = await requireAdminAccess();

  if (!access.ok) {
    return {
      user: null,
      email: access.email,
      isAdmin: false,
      role: null
    };
  }

  return {
    user: { id: access.userId },
    email: access.email,
    isAdmin: true,
    role: access.role
  };
}
