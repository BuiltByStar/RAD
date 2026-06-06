"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { ghostButtonClass, rowCardClass } from "@/components/dashboard/dashboard-styles";

type EditFormRenderApi = {
  /** Collapse the edit form and return the card to its compact list row. */
  close: () => void;
};

type EntryCardProps = {
  entryId: string;
  title: string;
  subtitle: string;
  image?: ReactNode;
  reorder?: ReactNode;
  detail: ReactNode;
  /**
   * Render-prop so the section can compose the edit form with an onSuccess
   * callback that both fires a toast and closes the card via `api.close()`.
   */
  renderEditForm: (api: EditFormRenderApi) => ReactNode;
  deleteForm: ReactNode;
  /** When true, scroll the card into view and flash the brand-red ring once. */
  justChanged?: boolean;
  /** Changes when the same card should flash again after another mutation. */
  highlightKey?: number;
};

export function EntryCard({
  entryId,
  title,
  subtitle,
  image,
  reorder,
  detail,
  renderEditForm,
  deleteForm,
  justChanged,
  highlightKey
}: EntryCardProps) {
  const [mode, setMode] = useState<"list" | "view" | "edit">("list");
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!justChanged) return;
    const node = cardRef.current;
    if (!node) return;

    try {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      // older browsers without smooth scroll support
    }

    node.classList.add("rad-dashboard-highlight");
    const timeout = window.setTimeout(() => {
      node.classList.remove("rad-dashboard-highlight");
    }, 1600);

    return () => {
      window.clearTimeout(timeout);
      node.classList.remove("rad-dashboard-highlight");
    };
  }, [justChanged, entryId, highlightKey]);

  const closeEdit = () => setMode("list");

  return (
    <div ref={cardRef} className={rowCardClass} data-entry-id={entryId}>
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
            <button type="button" className={ghostButtonClass} onClick={closeEdit} title="Cancel">
              ✕
            </button>
          </div>
          {renderEditForm({ close: closeEdit })}
        </div>
      ) : null}
    </div>
  );
}
