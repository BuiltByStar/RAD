"use client";

import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";

function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.77}
      viewBox="0 0 71 55"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M60.1 4.9A58.55 58.55 0 0 0 45.6.3a40.85 40.85 0 0 0-1.85 3.8 54.15 54.15 0 0 0-16.4 0A36.81 36.81 0 0 0 25.5.3 58.36 58.36 0 0 0 11 4.9C1.58 18.77-1 32.3.65 45.62a58.82 58.82 0 0 0 17.9 9.07 43.8 43.8 0 0 0 3.8-6.2 38.14 38.14 0 0 1-6-2.88 28.6 28.6 0 0 0 1.45-1.15 41.66 41.66 0 0 0 35.8 0c.47.4.95.78 1.45 1.15a38.25 38.25 0 0 1-6 2.89 43.19 43.19 0 0 0 3.8 6.19 58.61 58.61 0 0 0 17.9-9.07C72.16 32.17 68.62 18.68 60.1 4.9ZM23.73 37.73c-3.55 0-6.46-3.25-6.46-7.25s2.84-7.25 6.46-7.25c3.61 0 6.52 3.25 6.46 7.25 0 4-2.85 7.25-6.46 7.25Zm23.54 0c-3.55 0-6.46-3.25-6.46-7.25s2.84-7.25 6.46-7.25c3.61 0 6.52 3.25 6.46 7.25 0 4-2.85 7.25-6.46 7.25Z" />
    </svg>
  );
}

export function AuthWidget() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const { createSupabaseBrowserClient } = await import("@/lib/supabase/browser");
        const supabase = createSupabaseBrowserClient();
        setAvailable(true);

        const { data } = await supabase.auth.getUser();
        setUser(data.user);
        setLoading(false);

        const {
          data: { subscription }
        } = supabase.auth.onAuthStateChange((_, session) => {
          setUser(session?.user ?? null);
        });

        unsubscribe = () => subscription.unsubscribe();
      } catch {
        setLoading(false);
      }
    })();

    return () => unsubscribe?.();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function signIn() {
    if (!available) return;
    try {
      const { createSupabaseBrowserClient } = await import("@/lib/supabase/browser");
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: { redirectTo: `${window.location.origin}/auth/callback` }
      });
    } catch {
      /* no-op */
    }
  }

  async function signOut() {
    if (!available) return;
    try {
      const { createSupabaseBrowserClient } = await import("@/lib/supabase/browser");
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      setUser(null);
      setDropdownOpen(false);
    } catch {
      /* no-op */
    }
  }

  if (loading) {
    return (
      <div className="auth-skeleton-mini" aria-hidden="true" />
    );
  }

  if (user) {
    const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
    const displayName =
      (user.user_metadata?.custom_claims?.global_name as string) ??
      (user.user_metadata?.full_name as string) ??
      user.email ??
      "Member";
    const initials = displayName.slice(0, 2).toUpperCase();

    return (
      <div className="auth-user" ref={dropdownRef}>
        <button
          className="auth-user-btn"
          onClick={() => setDropdownOpen((o) => !o)}
          aria-expanded={dropdownOpen}
          aria-label={`Logged in as ${displayName}`}
        >
          <span className="auth-online-dot" aria-hidden="true" />
          {avatarUrl ? (
            <img src={avatarUrl} alt="" className="auth-avatar" />
          ) : (
            <span className="auth-avatar auth-avatar-initials">{initials}</span>
          )}
          <span className="auth-username">{displayName}</span>
          <svg
            className={`auth-chevron${dropdownOpen ? " auth-chevron--open" : ""}`}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="currentColor"
          >
            <path d="M0 0l5 6 5-6z" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="auth-dropdown">
            <div className="auth-dropdown-header">
              <DiscordIcon size={12} />
              <span>Connected via Discord</span>
            </div>
            <div className="auth-dropdown-divider" />
            <button className="auth-dropdown-item" onClick={signOut}>
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="auth-action-group">
      <button
        className={`auth-discord-btn ${!available ? "auth-discord-btn--disabled" : ""}`}
        onClick={signIn}
        disabled={!available}
        title={!available ? "Supabase environment variables (URL/Anon Key) are missing. Check .env.local" : "Login with Discord"}
      >
        <DiscordIcon size={14} />
        <span>{available ? "Login" : "System Offline"}</span>
      </button>
    </div>
  );
}
