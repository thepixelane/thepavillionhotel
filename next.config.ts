import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
