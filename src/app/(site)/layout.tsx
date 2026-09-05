import { HeaderSpacer } from "@/components/header-spacer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { QuickActions } from "@/components/quick-actions";
import { hotelJsonLd, websiteJsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#site-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-deep focus:px-4 focus:py-2 focus:text-sm focus:text-offwhite focus:shadow-lg"
      >
        Skip to main content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([hotelJsonLd, websiteJsonLd]).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <HeaderSpacer />
      <div id="site-main">{children}</div>
      <SiteFooter />
      <QuickActions />
    </>
  );
}
