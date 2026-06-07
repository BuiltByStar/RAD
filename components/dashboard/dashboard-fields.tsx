"use client";

import { inputClass, labelClass } from "@/components/dashboard/dashboard-styles";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_UPLOAD_LABEL = "8MB";

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
  return (
    <label className={labelClass}>
      {label}
      <input
        className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-[color:var(--color-rad)]/18 file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.12em] file:text-white`}
        name={name}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          const message =
            file && file.size > MAX_UPLOAD_BYTES
              ? `Image must be ${MAX_UPLOAD_LABEL} or smaller.`
              : "";
          event.currentTarget.setCustomValidity(message);
          if (message) event.currentTarget.reportValidity();
        }}
      />
      <span className="text-[10px] leading-relaxed text-white/36">
        PNG, JPG, WebP, or GIF. Max {MAX_UPLOAD_LABEL}.
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
