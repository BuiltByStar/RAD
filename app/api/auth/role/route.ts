import { NextResponse } from "next/server";

import { requireAdminAccess } from "@/lib/admin";

export async function GET() {
  const access = await requireAdminAccess();
  const response = NextResponse.json(
    access.ok
      ? { staff: true, role: access.role }
      : { staff: false, role: null }
  );

  response.cookies.delete("staff_role");
  return response;
}
