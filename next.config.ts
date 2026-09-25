import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so the dev server never walks up into d:\Pavillion
  // (.venv, legacy/, _assets-originals/) when inferring what to watch.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Keep compiled routes warm — evicting /studio forces a full ~10k-module rebuild.
  onDemandEntries: {
    maxInactiveAge: 30 * 60 * 1000,
    pagesBufferLength: 12,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    const target = process.env.NEXT_PUBLIC_SITE_URL;
    const isCanonicalHost = Boolean(target) && !target!.includes("hotelpavillion.co.in");

    const serviceRedirect = {
      source: "/services",
      destination: "/contact",
      permanent: true,
    };

    // Legacy `hotelpavillion.co.in` slugs mapped to the current route names.
    // `.co.in` is on another developer's DNS/hosting, so update this list once
    // they confirm the live URL list (see gpt-session.md Section 3/17).
    const legacyRouteRedirects: Array<{ source: string; destination: string }> = [
      { source: "/rooms", destination: "/stay" },
      { source: "/accommodation", destination: "/stay" },
      { source: "/restaurant", destination: "/dining" },
      { source: "/restaurants", destination: "/dining" },
      { source: "/banquets", destination: "/events" },
      { source: "/banquets-lawns", destination: "/events" },
      { source: "/weddings", destination: "/events" },
      { source: "/gallery-images", destination: "/gallery" },
      { source: "/photos", destination: "/gallery" },
      { source: "/contact-us", destination: "/contact" },
      { source: "/booking", destination: "/booking-options" },
      { source: "/book-now", destination: "/booking-options" },
    ];

    if (!isCanonicalHost) {
      return [
        serviceRedirect,
        ...legacyRouteRedirects.map((redirect) => ({ ...redirect, permanent: true })),
      ];
    }

    const legacyDomainHosts = ["hotelpavillion.co.in", "www.hotelpavillion.co.in"];

    return [
      serviceRedirect,
      // Old slugs bookmarked/linked directly on the canonical domain.
      ...legacyRouteRedirects.map((redirect) => ({ ...redirect, permanent: true })),
      // Old slugs hit on the `.co.in` host: single hop straight to the new
      // domain's current route name (only takes effect once `.co.in` DNS
      // points at this deployment).
      ...legacyDomainHosts.flatMap((host) =>
        legacyRouteRedirects.map((redirect) => ({
          source: redirect.source,
          has: [{ type: "host" as const, value: host }],
          destination: `${target}${redirect.destination}`,
          permanent: true,
        })),
      ),
      // Any other `.co.in` path: same path, new domain.
      ...legacyDomainHosts.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${target}/:path*`,
        permanent: true,
      })),
    ];
  },

};

export default nextConfig;
