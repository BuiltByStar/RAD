"use client";

import { Children, useEffect, useMemo, useState, type ReactNode } from "react";

type DashboardTabsProps = {
  tabs: { id: string; label: string }[];
  defaultTabId?: string;
  children: ReactNode;
};

const tabButtonClass =
  "inline-flex items-center justify-center rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition";

export function DashboardTabs({ tabs, defaultTabId, children }: DashboardTabsProps) {
  const panels = useMemo(() => Children.toArray(children), [children]);
  const [activeTab, setActiveTab] = useState(defaultTabId ?? tabs[0]?.id ?? "");

  useEffect(() => {
    if (defaultTabId) {
      setActiveTab(defaultTabId);
    }
  }, [defaultTabId]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hash = window.location.hash.replace(/^#/, "");
    if (hash && tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, [tabs]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tabId}`);
    }
  };

  return (
    <div className="mt-6">
      <div className="rounded-[1.55rem] border border-white/10 bg-black/30 p-3 backdrop-blur-xl">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`${tabButtonClass} ${
                  active
                    ? "border-[color:var(--color-rad)]/42 bg-[color:var(--color-rad)]/18 text-white shadow-[0_16px_36px_-24px_rgba(220,20,60,0.8)]"
                    : "border-white/10 bg-white/[0.035] text-white/58 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
                }`}
                aria-pressed={active}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        {tabs.map((tab, index) => (
          <div key={tab.id} hidden={tab.id !== activeTab}>
            {panels[index]}
          </div>
        ))}
      </div>
    </div>
  );
}
