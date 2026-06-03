"use client";

import { Children, useEffect, useMemo, useState, type ReactNode } from "react";

export type DashboardNavItem = {
  id: string;
  label: string;
  group?: string;
};

type DashboardShellProps = {
  nav: DashboardNavItem[];
  defaultTabId?: string;
  header?: ReactNode;
  children: ReactNode;
};

const navButtonClass =
  "flex w-full items-center rounded-md border px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.14em] transition";

export function DashboardShell({ nav, defaultTabId, header, children }: DashboardShellProps) {
  const panels = useMemo(() => Children.toArray(children), [children]);
  const [activeTab, setActiveTab] = useState(defaultTabId ?? nav[0]?.id ?? "");

  useEffect(() => {
    if (defaultTabId) setActiveTab(defaultTabId);
  }, [defaultTabId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && nav.some((item) => item.id === hash)) {
      setActiveTab(hash);
    }
  }, [nav]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tabId}`);
    }
  };

  const groups = useMemo(() => {
    const map = new Map<string, DashboardNavItem[]>();
    for (const item of nav) {
      const key = item.group ?? "General";
      const bucket = map.get(key) ?? [];
      bucket.push(item);
      map.set(key, bucket);
    }
    return [...map.entries()];
  }, [nav]);

  return (
    <div className="mt-4 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-white/10 bg-black/35 p-3 backdrop-blur-xl">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">Admin</p>
          <nav className="grid gap-4">
            {groups.map(([group, items]) => (
              <div key={group} className="grid gap-1">
                <p className="px-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/28">{group}</p>
                {items.map((item) => {
                  const active = item.id === activeTab;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleTabChange(item.id)}
                      className={`${navButtonClass} ${
                        active
                          ? "border-[color:var(--color-rad)]/42 bg-[color:var(--color-rad)]/16 text-white"
                          : "border-transparent text-white/55 hover:border-white/12 hover:bg-white/[0.04] hover:text-white"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="min-w-0">
        {header}
        <div className="mt-4">
          {nav.map((item, index) => (
            <div key={item.id} hidden={item.id !== activeTab}>
              {panels[index]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
