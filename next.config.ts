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
    const servicesRedirect = {
      source: "/services",
      destination: "/contact",
      permanent: true,
    };

    if (target && !target.includes("hotelpavillion.co.in")) {
      return [
        servicesRedirect,
        { source: "/:path*", has: [{ type: "host", value: "hotelpavillion.co.in" }], destination: `${target}/:path*`, permanent: true },
        { source: "/:path*", has: [{ type: "host", value: "www.hotelpavillion.co.in" }], destination: `${target}/:path*`, permanent: true },
      ];
    }
    return [servicesRedirect];
  },
};

export default nextConfig;
