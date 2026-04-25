import type { NextRequest } from "next/server";

export function isTrustedSameOriginRequest(request: NextRequest) {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const requestOrigin = request.nextUrl.origin;
  const secFetchSite = request.headers.get("sec-fetch-site");

  if (origin) return origin === requestOrigin;
  if (referer) return referer === requestOrigin || referer.startsWith(`${requestOrigin}/`);
  return secFetchSite === "same-origin";
}
