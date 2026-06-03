import { ghostButtonClass } from "@/components/dashboard/dashboard-styles";

type ReorderControlsProps = {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export function ReorderControls({ id, action, canMoveUp, canMoveDown }: ReorderControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="up" />
        <button className={ghostButtonClass} type="submit" disabled={!canMoveUp} aria-label="Move up">
          ↑
        </button>
      </form>
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="down" />
        <button className={ghostButtonClass} type="submit" disabled={!canMoveDown} aria-label="Move down">
          ↓
        </button>
      </form>
    </div>
  );
}
