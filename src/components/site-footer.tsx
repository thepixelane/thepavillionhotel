import { FacebookIcon, InstagramIcon, MailIcon, MapIcon, PhoneIcon, WhatsAppIcon } from "@/components/action-icons";
import { siteSettings } from "@/lib/site-data";

export function SiteFooter() {
  const { contactPhone: phone, contactPhoneAlt: phoneAlt, contactEmail: email, whatsappNumber: whatsapp, address, googleMapsUrl: mapsUrl, instagramUrl, facebookUrl } = siteSettings;
  const telHref = (raw: string) => `tel:${raw.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="border-t border-line bg-surface pb-24 pt-8 lg:pb-8">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-sm leading-6 text-fg-muted transition hover:text-emerald">
            <MapIcon className="mt-1 h-5 w-5 shrink-0 text-fresh" />
            <span className="whitespace-pre-line">{address}</span>
          </a>
          <div className="mt-6 flex items-start gap-3">
            <SocialLink href={`https://wa.me/${whatsapp}`} label="WhatsApp"><WhatsAppIcon className="h-5 w-5" /></SocialLink>
            <SocialLink href={instagramUrl ?? "https://www.instagram.com/"} label="Instagram"><InstagramIcon className="h-5 w-5" /></SocialLink>
            <SocialLink href={facebookUrl ?? "https://www.facebook.com/"} label="Facebook"><FacebookIcon className="h-5 w-5" /></SocialLink>
          </div>
        </div>
        <div className="space-y-3 text-sm text-fg-muted lg:justify-self-end">
          <p className="text-[11px] uppercase tracking-[0.3em] text-emerald dark:text-fresh">Contact &amp; Reservations</p>
          <a href={telHref(phone)} className="flex items-center gap-2 transition hover:text-emerald"><PhoneIcon className="h-4 w-4 text-fresh" /><strong className="text-fg">Stay</strong> {phone}</a>
          <a href={telHref(phoneAlt)} className="flex items-center gap-2 transition hover:text-emerald"><PhoneIcon className="h-4 w-4 text-fresh" /><strong className="text-fg">Banquets</strong> {phoneAlt}</a>
          <a href={`mailto:${email}`} className="flex items-center gap-2 transition hover:text-emerald">
            <MailIcon className="h-4 w-4 shrink-0 text-fresh" />
            <span>{email}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="grid h-10 w-10 place-items-center rounded-full border border-line text-forest transition hover:border-fresh hover:bg-fresh hover:text-white dark:text-offwhite">{children}</a>;
}