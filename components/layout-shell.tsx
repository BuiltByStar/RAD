"use client";

import { LayoutGroup } from "framer-motion";

type LayoutShellProps = {
  children: React.ReactNode;
};

export function LayoutShell({ children }: LayoutShellProps) {
  return <LayoutGroup id="rad-brand">{children}</LayoutGroup>;
}
