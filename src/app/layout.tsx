import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { QuickActions } from "@/components/quick-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
  metadataBase: new URL("https://www.hotelpavillion.co.in"),
  title: {
    default: "The Pavillion Hotel | Kolhapur",
    template: "%s | The Pavillion Hotel",
  },
  description:
    "Boutique resort-style hotel in Kolhapur for elegant stays, weddings, dining, and enquiries.",
  openGraph: {
    title: "The Pavillion Hotel | Kolhapur",
    description:
      "Boutique resort-style hotel in Kolhapur for elegant stays, weddings, dining, and enquiries.",
    url: "/",
    siteName: "The Pavillion Hotel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pavillion Hotel | Kolhapur",
    description:
      "Boutique resort-style hotel in Kolhapur for elegant stays, weddings, dining, and enquiries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} bg-stone-50 text-stone-900 antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <QuickActions />
      </body>
    </html>
  );
}
