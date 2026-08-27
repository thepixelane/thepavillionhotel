import type { ReactNode } from "react";

export function RoomFeatureIcon({ label }: { label: string }) {
  return <span className="inline-flex items-center gap-2 text-sm text-fg-muted"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fresh/15 text-emerald">{iconFor(label)}</span>{label}</span>;
}

function iconFor(label: string): ReactNode {
  const value = label.toLowerCase();
  if (value.includes("wi-fi") || value.includes("wifi")) return <Icon path="M4 9a12 12 0 0 1 16 0M7 12a8 8 0 0 1 10 0M10 15a4 4 0 0 1 4 0M12 19h.01" />;
  if (value.includes("dining")) return <Icon path="M7 3v8M4 3v5c0 2 6 2 6 0V3M7 11v10M16 3v18M16 3c3 2 4 6 0 10" />;
  if (value.includes("sit-out") || value.includes("balcony") || value.includes("garden")) return <Icon path="M5 20V9M19 20V9M3 20h18M7 9h10M9 9V5h6v4M8 14h8" />;
  if (value.includes("tv")) return <Icon path="M4 6h16v11H4zM9 21h6M12 17v4" />;
  if (value.includes("park")) return <Icon path="M5 18V6h6a4 4 0 0 1 0 8H5M8 10h3" />;
  return <Icon path="M4 12v7M20 12v7M4 15h16M6 12V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4M2 19h20" />;
}

function Icon({ path }: { path: string }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5"><path d={path} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}