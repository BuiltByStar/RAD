"use client";

import { useFormStatus } from "react-dom";

import {
  buttonClass,
  dangerButtonClass,
  ghostButtonClass
} from "@/components/dashboard/dashboard-styles";

type Variant = "primary" | "ghost" | "danger";

const variantClass: Record<Variant, string> = {
  primary: buttonClass,
  ghost: ghostButtonClass,
  danger: dangerButtonClass
};

/**
 * Shared submit button that reads form pending state via useFormStatus.
 * Disables itself and swaps to `pendingLabel` while the surrounding form
 * submission is in flight, so every dashboard CRUD form gives the same
 * "I heard you, working on it" signal without extra wiring.
 */
export function SubmitButton({
  label,
  pendingLabel,
  variant = "primary",
  className,
  disabled
}: {
  label: string;
  pendingLabel?: string;
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  const base = variantClass[variant];
  const combined = [
    base,
    "disabled:pointer-events-none disabled:opacity-55",
    pending ? "cursor-wait" : null,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="submit"
      className={combined}
      disabled={pending || disabled}
      aria-busy={pending || undefined}
      data-pending={pending ? "true" : undefined}
    >
      {pending && pendingLabel ? pendingLabel : label}
    </button>
  );
}
