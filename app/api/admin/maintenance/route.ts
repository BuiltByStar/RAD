import { NextRequest, NextResponse } from "next/server";

import { requireAdminAccess } from "@/lib/admin";
import { isTrustedSameOriginRequest } from "@/lib/security";

export async function POST(request: NextRequest) {
  if (!isTrustedSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  }

  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json(
      { error: access.status === 401 ? "Authentication required." : "Access denied." },
      { status: access.status }
    );
  }

  const body = (await request.json().catch(() => null)) as { enabled?: unknown } | null;
  if (typeof body?.enabled !== "boolean") {
    return NextResponse.json({ error: "Invalid maintenance state." }, { status: 422 });
  }

  const { error } = await access.supabase
    .from("site_settings")
    .upsert({
      key: "maintenance",
      value: { enabled: body.enabled },
      updated_at: new Date().toISOString()
    });

  if (error) {
    return NextResponse.json({ error: "Unable to update maintenance mode." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
