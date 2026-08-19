import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/public-env";

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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pavillion Hotel | Kolhapur",
    description:
      "The Pavillion Hotel is a boutique hotel in Shahupuri, Kolhapur offering comfortable rooms, dining, wedding venues, and event facilities near Kolhapur Railway Station.",
  },
};

// Runs before hydration so the correct theme is set on first paint (no flash).
const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${cormorant.variable} bg-bg text-fg antialiased`}>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
