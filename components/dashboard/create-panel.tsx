"use client";

import { useState, type ReactNode } from "react";

import { buttonClass, formCardClass, ghostButtonClass } from "@/components/dashboard/dashboard-styles";

type CreatePanelProps = {
  label: string;
  count: number;
  /** When provided, the panel becomes controlled (parent owns open state). */
  open?: boolean;
  /** Called whenever the user toggles the panel or the parent closes it on success. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
};

export function CreatePanel({ label, count, open, onOpenChange, children }: CreatePanelProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const value = isControlled ? Boolean(open) : internalOpen;

  const setValue = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
          {count} {count === 1 ? "entry" : "entries"}
        </p>
        <button
          type="button"
          className={value ? ghostButtonClass : buttonClass}
          onClick={() => setValue(!value)}
          aria-expanded={value}
        >
          {value ? "Cancel" : label}
        </button>
      </div>
      {value ? <div className={formCardClass}>{children}</div> : null}
    </div>
  );
}
