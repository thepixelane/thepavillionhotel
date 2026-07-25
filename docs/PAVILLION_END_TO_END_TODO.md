# The Pavillion Hotel - End-to-End Delivery & AMS Todo List

Use this as the master checklist from project kickoff through launch and ongoing AMS.

## 1. Project Kickoff & Access
- [ ] Confirm final scope and sign-off on the website brief
- [ ] Confirm commercial terms, milestones, and delivery dates
- [ ] Collect client approvals for brand, copy, and photography direction
- [ ] Set up GitHub repository access and branch strategy
- [ ] Set up Vercel project access
- [ ] Set up Sanity project access
- [ ] Set up Google account access for GA4, GTM, Search Console, and Places API
- [ ] Set up Meta Business Manager / Pixel access
- [ ] Collect registrar and DNS access for the domain
- [ ] Collect booking engine / PMS access and deep-link documentation
- [ ] Collect hotel contact numbers, email, WhatsApp, map link, and social links

## 2. Infrastructure & Environment Setup
- [ ] Create the production Vercel deployment
- [ ] Connect the GitHub repo to Vercel
- [ ] Configure production environment variables
- [ ] Configure `NEXT_PUBLIC_SITE_URL`
- [ ] Configure `SANITY_PROJECT_ID`
- [ ] Configure `SANITY_DATASET=production`
- [ ] Configure `SANITY_API_VERSION`
- [ ] Configure `SANITY_READ_TOKEN` if required
- [ ] Configure `BOOKING_ENGINE_URL`
- [ ] Configure GA4, GTM, and Meta Pixel IDs
- [ ] Configure Google verification tokens if needed
- [ ] Confirm one production CMS environment only
- [ ] Confirm one production booking flow only
- [ ] Add `.env.example` and deployment notes for the team

## 3. Sanity CMS Setup
- [ ] Create Sanity project
- [ ] Create production dataset
- [ ] Create Studio structure
- [ ] Configure site settings schema
- [ ] Configure rooms schema
- [ ] Configure venues schema
- [ ] Configure dining schema
- [ ] Configure gallery schema
- [ ] Configure SEO fields
- [ ] Configure social link fields
- [ ] Configure booking engine URL field if managed in CMS
- [ ] Configure image upload and alt text fields
- [ ] Configure image asset workflow and naming rules
- [ ] Create initial content entries
- [ ] Publish initial production content
- [ ] Verify Studio runs at `/studio`

## 4. Content Collection
- [ ] Final hotel logo
- [ ] Final brand colors and typography approval
- [ ] High-resolution property images
- [ ] Room photos for Deluxe, Executive, and Suite
- [ ] Venue photos for all event spaces
- [ ] Dining photos for Pakhtoon and Areca Café
- [ ] Gallery photos grouped by category
- [ ] Final room descriptions
- [ ] Final amenities list
- [ ] Final venue capacities
- [ ] Final venue suitable-for list
- [ ] Final venue facilities list
- [ ] Final dining intro copy
- [ ] Final popular dishes list
- [ ] Final timings for restaurants
- [ ] Final reservation phone numbers
- [ ] Final banquet enquiry numbers
- [ ] Final email address
- [ ] Final WhatsApp number
- [ ] Final map / directions URL
- [ ] Final Instagram URL
- [ ] Final TripAdvisor URL
- [ ] Final booking engine / PMS URL

## 5. Website Build
- [ ] Build or verify homepage structure
- [ ] Build or verify stay page
- [ ] Build or verify events page
- [ ] Build or verify dining page
- [ ] Build or verify gallery page
- [ ] Build or verify contact / book page
- [ ] Keep navigation concise and premium
- [ ] Keep homepage to 5-6 key sections only
- [ ] Keep page copy short and visual
- [ ] Ensure all layouts are mobile-first
- [ ] Ensure typography is consistent across pages
- [ ] Ensure colors match the approved earthy palette
- [ ] Ensure buttons and cards have consistent treatment
- [ ] Ensure sticky action bar is present across the site
- [ ] Ensure room image carousel works cleanly
- [ ] Ensure events tabs work cleanly
- [ ] Ensure gallery lightbox works cleanly

## 6. Booking Engine & PMS Integration
- [ ] Confirm booking engine vendor and URL format
- [ ] Confirm PMS parameter format for deep links
- [ ] Confirm whether booking engine supports UTM passthrough
- [ ] Confirm whether booking engine supports cross-domain tracking
- [ ] Confirm booking engine thank-you / confirmation page
- [ ] Pass check-in and check-out dates to booking engine
- [ ] Pass adults and children counts if supported
- [ ] Pass room type or room code if supported
- [ ] Preserve UTM source, medium, campaign, and click IDs
- [ ] Preserve `gclid` for Google Ads attribution if used
- [ ] Preserve `fbclid` for Meta attribution if used
- [ ] Verify booking CTA redirects from every entry point
- [ ] Verify room-level booking links if required
- [ ] Verify event enquiry and contact CTA routing

## 7. Analytics, Tracking, and Marketing Tags
- [ ] Set up GA4 property
- [ ] Set up GTM container
- [ ] Set up Meta Pixel
- [ ] Set up Google Search Console
- [ ] Verify site ownership in Search Console
- [ ] Add custom events for call clicks
- [ ] Add custom events for WhatsApp clicks
- [ ] Add custom events for booking clicks
- [ ] Add custom events for directions clicks
- [ ] Add custom events for enquiry form submissions
- [ ] Add custom events for booking start
- [ ] Add custom events for booking completion if supported
- [ ] Test event firing in preview/debug mode
- [ ] Test conversion attribution across domains
- [ ] Test analytics on mobile and desktop

## 8. Google Places / Reviews
- [ ] Confirm Google Business Profile access
- [ ] Confirm Place ID for The Pavillion Hotel
- [ ] Integrate Places API if reviews are to be displayed
- [ ] Set fallback content if API quota is hit
- [ ] Verify review count and rating display
- [ ] Verify compliance with Google display rules
- [ ] Add a visible link to view the profile on Google

## 9. SEO Setup
- [ ] Set page titles and meta descriptions
- [ ] Set open graph tags
- [ ] Set Twitter card tags
- [ ] Set canonical URLs
- [ ] Set structured data where relevant
- [ ] Set image alt text across all public imagery
- [ ] Add XML sitemap
- [ ] Add robots.txt
- [ ] Verify internal linking between key pages
- [ ] Verify page slugs and route names
- [ ] Verify indexability of production pages
- [ ] Verify noindex is not accidentally enabled on live pages

## 10. Performance & QA
- [ ] Check mobile responsiveness on Android and iPhone widths
- [ ] Check tablet layouts
- [ ] Check desktop layouts
- [ ] Verify image loading and lazy loading behavior
- [ ] Optimize above-the-fold hero image priority
- [ ] Verify Core Web Vitals targets
- [ ] Verify fast LCP on key pages
- [ ] Verify minimal layout shift
- [ ] Verify cross-browser behavior in Chrome, Safari, Edge, Firefox
- [ ] Verify touch targets on mobile
- [ ] Verify forms and buttons are easy to use on small screens
- [ ] Verify no broken links
- [ ] Verify no console errors
- [ ] Verify lint and build pass

## 11. DNS & Domain Cutover
- [ ] Confirm live domain registrar access
- [ ] Confirm DNS records required by Vercel
- [ ] Set apex A record to Vercel target
- [ ] Set `www` CNAME to Vercel target
- [ ] Lower TTL before cutover if needed
- [ ] Verify SSL certificate issuance
- [ ] Verify live domain resolves correctly
- [ ] Verify `www` and apex both work as expected
- [ ] Verify redirects and canonical domain choice
- [ ] Verify production metadata points to the live domain

## 12. Launch Readiness
- [ ] Freeze final content
- [ ] Freeze design changes
- [ ] Freeze CMS schema changes
- [ ] Confirm final client approval
- [ ] Confirm analytics debug checks passed
- [ ] Confirm booking engine deep links passed QA
- [ ] Confirm contact channels are correct
- [ ] Confirm all social links are correct
- [ ] Confirm site is deployed on production branch only
- [ ] Confirm rollback path exists
- [ ] Confirm admin access list is documented

## 13. Go-Live Tasks
- [ ] Deploy final production build
- [ ] Push live DNS cutover
- [ ] Verify live site after DNS propagation
- [ ] Verify booking engine redirect on live domain
- [ ] Verify all forms on live domain
- [ ] Verify all tracking on live domain
- [ ] Verify Google indexing and sitemap submission
- [ ] Verify Search Console coverage
- [ ] Verify Meta Pixel activity
- [ ] Share live URL with client

## 14. Handover
- [ ] Hand over GitHub access details
- [ ] Hand over Vercel access details
- [ ] Hand over Sanity Studio access details
- [ ] Hand over analytics access details
- [ ] Hand over booking engine / PMS contact details
- [ ] Document CMS editing instructions
- [ ] Document image upload guidelines
- [ ] Document how to update content safely
- [ ] Document how to update booking links if needed
- [ ] Document support contacts and escalation path

## 15. AMS / Post-Launch Support
- [ ] Monitor live site uptime
- [ ] Monitor booking CTA performance
- [ ] Monitor contact form submissions
- [ ] Monitor analytics events
- [ ] Monitor Search Console coverage
- [ ] Monitor page speed and Core Web Vitals
- [ ] Monitor broken links and 404s
- [ ] Monitor CMS publishing issues
- [ ] Monitor image optimization and asset usage
- [ ] Monitor SSL and DNS validity
- [ ] Handle content updates requested by the client
- [ ] Handle photo replacements and new venue/room content
- [ ] Handle SEO metadata changes if needed
- [ ] Handle new offers, notices, or banners if required
- [ ] Handle booking engine link changes if the PMS changes
- [ ] Handle Google review / Places content updates if needed
- [ ] Keep dependencies updated on a regular schedule
- [ ] Take scheduled backups / export content if needed
- [ ] Review security and access permissions periodically
- [ ] Review analytics reports monthly
- [ ] Review conversion and direct booking trends monthly
- [ ] Maintain a support log of issues and resolutions
- [ ] Renew domain, Vercel, Sanity, and any third-party subscriptions on time

## 16. Nice-to-Have Next Steps
- [ ] Add blog / editorial content for SEO
- [ ] Add offers / packages module in Sanity
- [ ] Add testimonials section
- [ ] Add FAQ section
- [ ] Add richer event enquiry automation
- [ ] Add downloadable brochure or PDF if required
- [ ] Add multilingual support if the client requests it later



Yes, that's the right approach.

For Google Analytics, GTM, Search Console, Maps API, Places API, and Meta Pixel, wait until:

The website is functionally complete.
The client approves the staging site.
You're close to production.

That avoids creating unnecessary properties or changing domains later.