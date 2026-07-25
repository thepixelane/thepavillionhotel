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

  return (
    <>
      {/* Desktop / tablet: segmented control — makes the option obvious. */}
      <div
        role="radiogroup"
        aria-label="Theme"
        className={`hidden items-center gap-1 rounded-full border border-line bg-surface p-1 text-[10px] uppercase tracking-[0.25em] sm:inline-flex ${className}`}
      >
        <ThemeSegment
          label="Light"
          active={mode === "light"}
          onSelect={() => applyMode("light")}
          icon={<SunIcon className="h-3.5 w-3.5" />}
        />
        <ThemeSegment
          label="Dark"
          active={mode === "dark"}
          onSelect={() => applyMode("dark")}
          icon={<MoonIcon className="h-3.5 w-3.5" />}
        />
      </div>

      {/* Mobile: compact icon-only toggle to save header space. */}
      <button
        type="button"
        onClick={() => applyMode(mode === "dark" ? "light" : "dark")}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg transition hover:border-gold hover:text-gold sm:hidden"
      >
        {mode === "dark" ? (
          <SunIcon className="h-4 w-4" />
        ) : mode === "light" ? (
          <MoonIcon className="h-4 w-4" />
        ) : (
          <span className="h-4 w-4" />
        )}
      </button>
    </>
  );
}

function ThemeSegment({
  label,
  active,
  onSelect,
  icon,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition ${
        active
          ? "bg-gold text-forest-deep shadow-sm"
          : "text-fg/60 hover:text-fg"
      }`}
    >
      {icon}
      <span>{label}</span>
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
