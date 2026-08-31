import Link from "next/link";
import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/action-icons";
import { ContactForm } from "@/components/contact-form";
import { getSiteSettings } from "@/lib/sanity-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
	title: "Contact & Directions",
	description:
		"Contact The Pavillion Hotel for room reservations, wedding enquiries, restaurant bookings, and directions in Shahupuri, Kolhapur.",
	path: "/contact",
});

type ContactRow = {
	label: string;
	value: string;
	href: string;
	external?: boolean;
};

export default async function ContactPage() {
	const settings = await getSiteSettings();

	const primaryPhone = settings?.contactPhone ?? "0231 265 4742";
	const primaryPhoneHref = `tel:${primaryPhone.replace(/[^+\d]/g, "")}`;
	const banquetPhone = settings?.contactPhoneAlt ?? "0231 265 2751";
	const banquetPhoneHref = `tel:${banquetPhone.replace(/[^+\d]/g, "")}`;
	const email = settings?.contactEmail ?? "info@hotelpavillion.co.in";
	const whatsapp = settings?.whatsappNumber ?? "919607323737";
	const address =
		settings?.address ??
		"The Pavillion Hotel\n392 E, Assembly Road, Near Basant-Bahar Theatre, Opp. Railway Station, Shahupuri, Kolhapur, Maharashtra – 416001";
	const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
		address.replace(/\n/g, ", ")
	)}&output=embed`;

	const rows: ContactRow[] = [
		{ label: "Reservations", value: primaryPhone, href: primaryPhoneHref },
		{ label: "Banquet Enquiries", value: banquetPhone, href: banquetPhoneHref },
		{ label: "Email", value: email, href: `mailto:${email}` },
		{
			label: "WhatsApp",
			value: "Chat with us instantly",
			href: `https://wa.me/${whatsapp}`,
			external: true,
		},
	];

	return (
		<main className="mx-auto grid max-w-7xl 4xl:max-w-[90rem] gap-8 px-4 py-10 sm:gap-10 sm:px-5 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
			<div>
				<p className="text-[11px] uppercase tracking-[0.4em] text-emerald">Contact & Book</p>
				<h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Plan your stay or event</h1>
				<p className="mt-5 max-w-2xl text-base leading-8 text-fg-muted sm:text-lg">
					Use this page for reservations, WhatsApp, directions, and all direct booking paths.
				</p>

				<div className="mt-8 space-y-5 rounded-3xl border border-line bg-surface p-6 shadow-[0_18px_50px_rgba(20,38,30,0.06)] sm:mt-10 sm:p-7">
					{rows.map((row) => (
						<div key={row.label} className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0 sm:gap-6">
							<div className="min-w-0">
								<p className="text-[11px] uppercase tracking-[0.35em] text-emerald">{row.label}</p>
								<p className="mt-2 wrap-break-word text-base text-fg">{row.value}</p>
							</div>
							<Link
								href={row.href}
								target={row.external ? "_blank" : undefined}
								rel={row.external ? "noopener noreferrer" : undefined}
								className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-emerald transition hover:text-fresh dark:text-fresh"
							>
								{row.label === "WhatsApp" ? <WhatsAppIcon className="h-4 w-4" /> : null}
								<span>Open</span>
							</Link>
						</div>
					))}
				</div>

				<div className="mt-6 rounded-3xl border border-line bg-surface-2 p-6 sm:p-7">
					<p className="text-[11px] uppercase tracking-[0.35em] text-emerald dark:text-fresh">Address</p>
					<p className="mt-3 whitespace-pre-line text-base leading-7 text-fg">{address}</p>
				</div>
			</div>

			<div className="grid gap-6">
				<ContactForm />

				<div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_14px_40px_rgba(20,38,30,0.06)]">
					<iframe
						title="The Pavillion Hotel on Google Maps"
						src={mapEmbedSrc}
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="block h-52 w-full sm:h-64 md:h-72 lg:h-80"
					/>
				</div>
			</div>
		</main>
	);
}