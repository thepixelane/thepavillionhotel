"use client";

import { useSyncExternalStore } from "react";

type Mode = "light" | "dark";

function subscribe(onChange: () => void) {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Mode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// On the server (and during hydration) we render a neutral placeholder so
// the initial DOM matches what SSR produced, avoiding hydration mismatches.
function getServerSnapshot(): null {
  return null;
}

function applyMode(next: Mode) {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* localStorage unavailable — ignore */
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const resolvedMode = mode ?? "light";
  const nextMode: Mode = resolvedMode === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => applyMode(nextMode)}
      aria-label={resolvedMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={resolvedMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3 text-[10px] uppercase tracking-[0.2em] text-fg transition hover:border-gold hover:text-gold ${className}`}
    >
      {resolvedMode === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      <span className="hidden sm:inline">{resolvedMode === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a.7.7 0 0 0-.9-.9 9.5 9.5 0 1 0 12.8 12.8.7.7 0 0 0-.9-.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
