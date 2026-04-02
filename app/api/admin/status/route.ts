import { NextResponse } from "next/server";

import { getAdminViewer } from "@/lib/admin";

export async function GET() {
  const { user, isAdmin } = await getAdminViewer();

  return NextResponse.json({
    authenticated: Boolean(user),
    isAdmin
  });
}
