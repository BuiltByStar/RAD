"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { ActionResult } from "@/app/dashboard/action-types";

type Props = {
  action: (formData: FormData) => Promise<ActionResult>;
  id: string;
  confirmMessage: string;
  /** Accessible label, e.g. "Delete Player". */
  label?: string;
  /** Tooltip + sr text fallback. */
  noun?: string;
  onSuccess?: (result: ActionResult) => void;
};

/**
 * Trash button that handles the confirm prompt, fires the delete action
 * inside a transition (so it shows a pending state on the button itself),
 * and surfaces a toast on completion.
 */
export function DeleteButton({
  action,
  id,
  confirmMessage,
  label = "Delete",
  noun,
  onSuccess
}: Props) {
  const [pending, start] = useTransition();

  const handleClick = () => {
    if (pending) return;
    if (typeof window !== "undefined" && !window.confirm(confirmMessage)) return;
    start(async () => {
      const fd = new FormData();
      fd.set("id", id);
      const result = await action(fd);
      if (result.ok) {
        toast.success(result.message ?? (noun ? `${noun} removed` : "Removed"));
        onSuccess?.(result);
      } else {
        toast.error(result.message ?? "Could not delete.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-busy={pending || undefined}
      aria-label={pending ? `Deleting ${noun ?? "entry"}...` : label}
      title={pending ? "Deleting..." : label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[11px] text-white/55 transition hover:border-[color:var(--color-rad)]/40 hover:text-white disabled:pointer-events-none disabled:opacity-50"
      data-pending={pending ? "true" : undefined}
    >
      {pending ? (
        <span className="inline-block h-3 w-3 animate-spin rounded-full border border-white/30 border-t-[color:var(--color-blood)]" />
      ) : (
        "✕"
      )}
    </button>
  );
}
