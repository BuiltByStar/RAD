import { NextRequest, NextResponse } from "next/server";

import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const redirectPath = next?.startsWith("/") ? next : "/";

  if (code) {
    const response = NextResponse.redirect(`${origin}${redirectPath}`);

    try {
      const supabase = createSupabaseRouteClient(request, response);
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return response;
      }
    } catch {
      // Supabase not configured
    }
  }

  return NextResponse.redirect(`${origin}/?auth=error`);
}
