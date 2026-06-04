"use client";

import { useState, type ReactNode } from "react";

import { ghostButtonClass, rowCardClass } from "@/components/dashboard/dashboard-styles";

type EntryCardProps = {
  title: string;
  subtitle: string;
  image?: ReactNode;
  reorder?: ReactNode;
  detail: ReactNode;
  editForm: ReactNode;
  deleteForm: ReactNode;
};

export function EntryCard({ title, subtitle, image, reorder, detail, editForm, deleteForm }: EntryCardProps) {
  const [mode, setMode] = useState<"list" | "view" | "edit">("list");

  return (
    <div className={rowCardClass}>
      {mode === "list" ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {image}
            <div className="min-w-0">
              <p className="truncate font-[family-name:var(--font-display)] text-xl uppercase text-white">{title}</p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">{subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {reorder}
            <button
              type="button"
              className={ghostButtonClass}
              onClick={() => setMode("view")}
              aria-label={`View ${title}`}
              title="View details"
            >
              ◉
            </button>
            <button
              type="button"
              className={ghostButtonClass}
              onClick={() => setMode("edit")}
              aria-label={`Edit ${title}`}
              title="Edit"
            >
              ✎
            </button>
            {deleteForm}
          </div>
        </div>
      ) : null}

      {mode === "view" ? (
        <div className="grid gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/8 pb-3">
            <div className="flex items-center gap-3">
              {image}
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl uppercase text-white">{title}</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className={ghostButtonClass} onClick={() => setMode("edit")} title="Edit">
                ✎
              </button>
              <button type="button" className={ghostButtonClass} onClick={() => setMode("list")} title="Close">
                ✕
              </button>
            </div>
          </div>
          {detail}
        </div>
      ) : null}

      {mode === "edit" ? (
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 pb-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">Editing · {title}</p>
            <button type="button" className={ghostButtonClass} onClick={() => setMode("list")} title="Cancel">
              ✕
            </button>
          </div>
          {editForm}
        </div>
      ) : null}
    </div>
  );
}
