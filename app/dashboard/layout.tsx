import type { ReactNode } from "react";

import { DashboardToaster } from "@/components/dashboard/dashboard-toaster";

/**
 * Dashboard layout wraps every /dashboard/** route with the shared Sonner
 * toaster so CRUD actions can fire feedback from anywhere in the tree
 * without needing a global provider higher up the app.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <DashboardToaster />
    </>
  );
}
