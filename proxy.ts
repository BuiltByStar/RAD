import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseEnv } from "@/lib/env";

const protectedPrefixes = ["/dashboard", "/admin"];
const adminRoles = new Set(["owner", "admin", "developer"]);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next();
  response.cookies.delete("staff_role");

  if (!protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return response;
  }

  if (process.env.LOCAL_ADMIN_BYPASS === "1") {
    return response;
  }

  const env = getSupabaseEnv();
  if (!env.url || !env.publishableKey) {
    return NextResponse.redirect(new URL("/?auth=unavailable", request.url));
  }

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/?auth=required", request.url));
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = typeof profile?.role === "string" ? profile.role.toLowerCase() : "";

  if (!adminRoles.has(role)) {
    return NextResponse.redirect(new URL("/?auth=denied", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
