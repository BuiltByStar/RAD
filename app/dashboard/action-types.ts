/**
 * Shared types for dashboard server actions. Kept in a separate module
 * because Next.js `"use server"` files can only export async functions —
 * type exports get stripped at the boundary.
 */

export type ActionResult = {
  ok: boolean;
  message: string;
  /** id of the affected row (insert/update/delete/reorder target) */
  id?: string;
  /** human-friendly label of the affected entity ("handle", "name", etc.) */
  label?: string;
};
