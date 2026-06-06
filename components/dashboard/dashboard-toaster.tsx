"use client";

import { Toaster } from "sonner";

/**
 * Sonner toaster, restyled to match the RAD editorial dark surface.
 * Mounted once from app/dashboard/layout.tsx so every dashboard route
 * shares the same toast queue.
 */
export function DashboardToaster() {
  return (
    <Toaster
      position="bottom-right"
      theme="dark"
      duration={3200}
      gap={10}
      offset={20}
      closeButton
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "!rounded-md !border !border-white/12 !bg-black/95 !text-white !shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] !backdrop-blur",
          title:
            "!text-[12px] !font-semibold !uppercase !tracking-[0.14em] !text-white",
          description: "!text-[11px] !text-white/65",
          success:
            "!border-l-[3px] !border-l-[color:var(--color-blood)] !text-white",
          error:
            "!border-l-[3px] !border-l-[#ff4d63] !text-white",
          info: "!border-l-[3px] !border-l-white/40 !text-white",
          warning:
            "!border-l-[3px] !border-l-[color:var(--color-rad-soft)] !text-white",
          actionButton:
            "!bg-[color:var(--color-blood)]/22 !text-white !border !border-[color:var(--color-blood)]/40",
          cancelButton:
            "!bg-white/5 !text-white/70 !border !border-white/10",
          closeButton:
            "!bg-white/5 !border !border-white/10 !text-white/60 hover:!text-white"
        }
      }}
    />
  );
}
