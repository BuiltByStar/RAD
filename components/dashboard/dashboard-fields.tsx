"use client";

import { useState } from "react";

import { inputClass, labelClass } from "@/components/dashboard/dashboard-styles";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_UPLOAD_LABEL = "8MB";
const TARGET_UPLOAD_BYTES = 900 * 1024;
const MAX_IMAGE_DIMENSION = 1800;

async function optimizeImageFile(file: File) {
  if (file.size <= TARGET_UPLOAD_BYTES || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return file;
  }

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read image."));
    };
    img.src = objectUrl;
  });

  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return file;

  context.drawImage(image, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.82);
  });

  if (!blob || blob.size >= file.size) return file;

  return new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), {
    type: "image/webp",
    lastModified: Date.now()
  });
}

function replaceSelectedFile(input: HTMLInputElement, file: File) {
  const transfer = new DataTransfer();
  transfer.items.add(file);
  input.files = transfer.files;
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  placeholder
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={labelClass}>
      {label}
      <input
        className={inputClass}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 4
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className={labelClass}>
      {label}
      <textarea className={inputClass} name={name} rows={rows} defaultValue={defaultValue ?? ""} />
    </label>
  );
}

export function FileField({ label, name }: { label: string; name: string }) {
  const [status, setStatus] = useState(`PNG, JPG, WebP, or GIF. Max ${MAX_UPLOAD_LABEL}.`);

  return (
    <label className={labelClass}>
      {label}
      <input
        className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-[color:var(--color-rad)]/18 file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.12em] file:text-white`}
        name={name}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={async (event) => {
          const input = event.currentTarget;
          const file = input.files?.[0];
          input.setCustomValidity("");

          if (!file) {
            setStatus(`PNG, JPG, WebP, or GIF. Max ${MAX_UPLOAD_LABEL}.`);
            return;
          }

          setStatus("Preparing image...");

          try {
            const optimized = await optimizeImageFile(file);
            if (optimized !== file) {
              replaceSelectedFile(input, optimized);
              setStatus(`Optimized to ${(optimized.size / 1024 / 1024).toFixed(2)}MB before upload.`);
            } else {
              setStatus(`Selected ${(file.size / 1024 / 1024).toFixed(2)}MB image.`);
            }
          } catch {
            setStatus("Could not optimize this image. Try a smaller JPG, PNG, or WebP.");
          }

          const selected = input.files?.[0];
          const message =
            selected && selected.size > MAX_UPLOAD_BYTES
              ? `Image must be ${MAX_UPLOAD_LABEL} or smaller.`
              : "";
          input.setCustomValidity(message);
          if (message) {
            setStatus(message);
            input.reportValidity();
          }
        }}
      />
      <span className="text-[10px] leading-relaxed text-white/36">
        {status}
      </span>
    </label>
  );
}

export function Check({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/58">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 accent-[#dc143c]" />
      {label}
    </label>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  options
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  options: string[];
}) {
  return (
    <label className={labelClass}>
      {label}
      <select className={inputClass} name={name} defaultValue={defaultValue ?? options[0]}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function DeleteForm({
  action,
  id,
  label = "Delete",
  confirmMessage = "Delete this entry? This cannot be undone."
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[11px] text-white/55 transition hover:border-[color:var(--color-rad)]/40 hover:text-white"
        type="submit"
        aria-label={label}
        title={label}
      >
        ✕
      </button>
    </form>
  );
}
