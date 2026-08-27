import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { QuickActions } from "@/components/quick-actions";
import { hotelJsonLd, websiteJsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([hotelJsonLd, websiteJsonLd]).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      {children}
      <SiteFooter />
      <QuickActions />
    </>
  );
}
