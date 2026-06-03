import { randomUUID } from "node:crypto";

import { saveLocalAdminUpload } from "@/lib/local-admin-store";

const ADMIN_MEDIA_BUCKET = "rad-admin-media";

function extensionForMime(mime: string) {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  return "jpg";
}

type StorageBucket = {
  upload: (
    path: string,
    body: Buffer,
    options: { contentType: string; upsert: boolean }
  ) => Promise<{ error: { message: string } | null }>;
  getPublicUrl: (path: string) => { data: { publicUrl: string } };
};

type UploadClient = {
  storage: {
    from: (bucket: string) => StorageBucket;
  };
};

export async function resolveAdminImageUpload(
  file: File | null,
  folder: string,
  supabase: UploadClient | null
) {
  if (!file || file.size === 0) return null;

  if (!supabase) {
    return saveLocalAdminUpload(file, folder);
  }

  const extension = extensionForMime(file.type || "image/jpeg");
  const objectPath = `${folder}/${Date.now()}-${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const bucket = supabase.storage.from(ADMIN_MEDIA_BUCKET);
  const { error } = await bucket.upload(objectPath, buffer, {
    contentType: file.type || "image/jpeg",
    upsert: true
  });

  if (error) {
    throw new Error(error.message);
  }

  return bucket.getPublicUrl(objectPath).data.publicUrl;
}
