import { promises as fs } from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

const uploadRoot = path.join(process.cwd(), ".codex-local", "uploads");

function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

export async function GET(_: Request, context: { params: Promise<{ path: string[] }> }) {
  if (process.env.LOCAL_ADMIN_BYPASS !== "1") {
    return NextResponse.json({ error: "Local media is disabled." }, { status: 404 });
  }

  const { path: segments } = await context.params;
  const safeSegments = segments.filter((segment) => segment !== ".." && !segment.includes("\\"));
  const filePath = path.join(uploadRoot, ...safeSegments);

  if (!filePath.startsWith(uploadRoot)) {
    return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
  }

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentTypeFor(filePath),
        "Cache-Control": "no-cache"
      }
    });
  } catch {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }
}
