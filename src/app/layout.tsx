import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/public-env";
import { defaultSocialImage } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "The Pavillion Hotel",
  authors: [{ name: "The Pavillion Hotel", url: siteUrl }],
  creator: "The Pavillion Hotel",
  publisher: "The Pavillion Hotel",
  category: "travel",
  title: {
    default: "The Pavillion Hotel | Kolhapur",
    template: "%s | The Pavillion Hotel",
  },
  description:
    "The Pavillion Hotel is a boutique hotel in Shahupuri, Kolhapur offering comfortable rooms, dining, wedding venues, and event facilities near Kolhapur Railway Station.",
  openGraph: {
    title: "The Pavillion Hotel | Kolhapur",
    description:
      "The Pavillion Hotel is a boutique hotel in Shahupuri, Kolhapur offering comfortable rooms, dining, wedding venues, and event facilities near Kolhapur Railway Station.",
    url: "/",
    siteName: "The Pavillion Hotel",
    locale: "en_IN",
    type: "website",
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pavillion Hotel | Kolhapur",
    description:
      "The Pavillion Hotel is a boutique hotel in Shahupuri, Kolhapur offering comfortable rooms, dining, wedding venues, and event facilities near Kolhapur Railway Station.",
    images: [defaultSocialImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Search Console HTML-tag verification, set once a property is confirmed (see gpt-session.md Section 19).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} bg-bg text-fg antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
