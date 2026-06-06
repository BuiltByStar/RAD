"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { toast } from "sonner";

import type { ActionResult } from "@/app/dashboard/action-types";

type ActionFn = (formData: FormData) => Promise<ActionResult>;

type Props = {
  action: ActionFn;
  className?: string;
  children: ReactNode;
  /** Reset the form fields when the action returns ok. Useful for create forms. */
  resetOnSuccess?: boolean;
  /** Override the toast text rendered on success (otherwise uses ActionResult.message). */
  successMessage?: string;
  /** Override the toast text rendered on failure (otherwise uses ActionResult.message). */
  errorMessage?: string;
  /** Fired after a successful submission so the parent can scroll, close panels, etc. */
  onSuccess?: (result: ActionResult) => void;
  /** Fired after a failed submission for custom error handling. */
  onError?: (result: ActionResult) => void;
};

const initialState: ActionResult | null = null;

/**
 * Wraps a `<form>` with `useActionState`, surfaces every submission outcome
 * through a Sonner toast, and gives the caller a hook to react to success
 * (close the create panel, mark the row as just-changed, scroll, etc.).
 *
 * The underlying server action is invoked with the raw FormData so the
 * existing field components keep working unchanged.
 */
export function ToastForm({
  action,
  className,
  children,
  resetOnSuccess,
  successMessage,
  errorMessage,
  onSuccess,
  onError
}: Props) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    async (_prev, formData) => action(formData),
    initialState
  );
  const handled = useRef<ActionResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state || state === handled.current) return;
    handled.current = state;

    if (state.ok) {
      toast.success(successMessage ?? state.message ?? "Saved");
      if (resetOnSuccess) formRef.current?.reset();
      onSuccess?.(state);
    } else {
      toast.error(errorMessage ?? state.message ?? "Something went wrong");
      onError?.(state);
    }
  }, [state, successMessage, errorMessage, resetOnSuccess, onSuccess, onError]);

  return (
    <form ref={formRef} action={formAction} className={className}>
      {children}
    </form>
  );
}
