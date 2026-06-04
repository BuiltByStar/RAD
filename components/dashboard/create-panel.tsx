"use client";

import { useState, type ReactNode } from "react";

import { buttonClass, formCardClass, ghostButtonClass } from "@/components/dashboard/dashboard-styles";

type CreatePanelProps = {
  label: string;
  count: number;
  children: ReactNode;
};

export function CreatePanel({ label, count, children }: CreatePanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
          {count} {count === 1 ? "entry" : "entries"}
        </p>
        <button
          type="button"
          className={open ? ghostButtonClass : buttonClass}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Cancel" : label}
        </button>
      </div>
      {open ? <div className={formCardClass}>{children}</div> : null}
    </div>
  );
}
