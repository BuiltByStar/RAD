import { NextResponse } from "next/server";

import { requireAdminAccess } from "@/lib/admin";

export async function GET() {
  if (process.env.LOCAL_ADMIN_BYPASS === "1") {
    return NextResponse.json({
      authenticated: true,
      isAdmin: true,
      role: "developer",
      localBypass: true
    });
  }

  const access = await requireAdminAccess();
  const response = NextResponse.json({
    authenticated: access.ok || access.status === 403,
    isAdmin: access.ok,
    role: access.ok ? access.role : null
  });

  response.cookies.delete("staff_role");
  return response;
}
