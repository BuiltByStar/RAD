import { NextResponse } from "next/server";

import { sanitizeContactPayload } from "@/lib/contact";
import { getPublicSiteUrl, hasSupabaseServiceEnv } from "@/lib/env";
import { createSupabaseServiceClient } from "@/lib/supabase/service";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = sanitizeContactPayload(body);

    if (!hasSupabaseServiceEnv()) {
      return NextResponse.json(
        {
          error:
            "The contact pipeline is not configured yet. Add the Supabase environment variables before enabling submissions."
        },
        { status: 503 }
      );
    }

    const supabase = createSupabaseServiceClient();

    const { error } = await supabase.from("contact_inquiries").insert({
      name: payload.name,
      email: payload.email,
      organization: payload.organization ?? null,
      inquiry_type: payload.inquiryType,
      message: payload.message,
      socials: payload.socials ?? null,
      source: "website",
      site_url: getPublicSiteUrl(),
      submitted_at: new Date().toISOString()
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      message: "Inquiry received. RAD can review it from Supabase now."
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to store the contact inquiry.";

    const isValidationError =
      message.includes("required") ||
      message.includes("valid email") ||
      message.includes("at least") ||
      message.includes("under");

    return NextResponse.json({ error: message }, { status: isValidationError ? 422 : 400 });
  }
}
