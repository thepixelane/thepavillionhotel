"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("Global error boundary caught:", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#f2ecdf",
          color: "#2c2e28",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "34rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
            The Pavillion Hotel
          </p>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", margin: "1rem 0 0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ opacity: 0.8, lineHeight: 1.55 }}>
            We hit an unexpected error while loading this page. Please try again in a moment. If the
            issue persists, call us on{" "}
            <a href="tel:+919665599999" style={{ color: "#b45a30" }}>
              +91 96655 99999
            </a>
            .
          </p>
          {error.digest ? (
            <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "1rem" }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#253b2e",
                color: "#f2ecdf",
                border: "none",
                borderRadius: "999px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error renders outside the Next.js Router context */}
            <a
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                background: "transparent",
                color: "#253b2e",
                border: "1px solid rgba(37, 59, 46, 0.2)",
                borderRadius: "999px",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
