"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { ActionResult } from "@/app/dashboard/action-types";
import { ghostButtonClass } from "@/components/dashboard/dashboard-styles";

type ReorderAction = (formData: FormData) => Promise<ActionResult>;

type ReorderControlsProps = {
  id: string;
  action: ReorderAction;
  canMoveUp: boolean;
  canMoveDown: boolean;
  /** Used to phrase the success toast, e.g. "Player". Defaults to "Entry". */
  noun?: string;
  onMoved?: (result: ActionResult) => void;
};

export function ReorderControls({
  id,
  action,
  canMoveUp,
  canMoveDown,
  noun = "Entry",
  onMoved
}: ReorderControlsProps) {
  const [pending, start] = useTransition();

  const move = (direction: "up" | "down") => {
    if (pending) return;
    start(async () => {
      const fd = new FormData();
      fd.set("id", id);
      fd.set("direction", direction);
      const result = await action(fd);
      if (result.ok) {
        toast.success(result.message ?? `${noun} moved`);
        onMoved?.(result);
      } else {
        toast.error(result.message ?? `Could not move ${noun.toLowerCase()}.`);
      }
    });
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={ghostButtonClass}
        disabled={!canMoveUp || pending}
        onClick={() => move("up")}
        aria-label="Move up"
        aria-busy={pending || undefined}
        title="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        className={ghostButtonClass}
        disabled={!canMoveDown || pending}
        onClick={() => move("down")}
        aria-label="Move down"
        aria-busy={pending || undefined}
        title="Move down"
      >
        ↓
      </button>
    </div>
  );
}
