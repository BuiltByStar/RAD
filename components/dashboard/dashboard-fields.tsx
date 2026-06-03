import { inputClass, labelClass } from "@/components/dashboard/dashboard-styles";

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
      />
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
  label = "Delete"
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        className="inline-flex rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-[color:var(--color-rad)]/40 hover:text-white"
        type="submit"
      >
        {label}
      </button>
    </form>
  );
}
