import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Pavillion Hotel",
    short_name: "The Pavillion",
    description: "Hotel, dining, weddings, and events in Shahupuri, Kolhapur.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2ecdf",
    theme_color: "#253b2e",
  };
}