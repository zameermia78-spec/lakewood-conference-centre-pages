# Lakewood Conference Centre — Part 3

A continuation of the Part 2 Lakewood Conference Centre website. The original visual direction (dark ink, cream, sage, Playfair Display and DM Sans) has been retained and extended with interactive functionality, event enquiry processing, a separate contact mailto form, a gallery lightbox, map, SEO metadata and technical website files.

## Part 2 feedback review

The available LMS feedback screenshot records 75/100 (75%) but does not show written lecturer comments or a criterion-by-criterion rubric breakdown. The project therefore does not invent specific lecturer-requested corrections. See [`PART2_FEEDBACK_REVIEW.md`](PART2_FEEDBACK_REVIEW.md) for the evidence and the improvements carried into Part 3.

## Project structure

```text
Lakewood-Part3/
├── index.html
├── style.css
├── script.js
├── 404.html
├── robots.txt
├── sitemap.xml
├── README.md
├── CHANGELOG.md
├── PART2_FEEDBACK_REVIEW.md
├── REFERENCES.md
├── assets/
│   ├── favicon.svg
│   └── README.md
└── screenshots/
```

## Run locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Start `index.html` with the Live Server extension, or serve the folder with a local HTTP server.
4. Keep an internet connection available for Google Fonts, Unsplash gallery images, Leaflet and OpenStreetMap tiles.

## Part 3 features

### Interactive elements
- Responsive navigation menu with accessible expanded state.
- FAQ accordion using native disclosure elements; JavaScript keeps one answer open at a time.
- Gallery lightbox with close, previous/next, Escape and arrow-key controls.

### Gallery and dynamic content
- 24 gallery records are stored in a JavaScript data array.
- Category filters: conferences, weddings, celebrations, and dining/spaces.
- Search filters titles, alt text and categories as the visitor types.
- Results count and no-results feedback update dynamically.
- Images use lazy loading and descriptive alt text.

### Event enquiry form
The enquiry form is distinct from the general contact form. It collects name, phone, email, event type, date, guest count, setup preference and requirements. It validates required fields, phone digits, guest count and date, then processes the values into a reviewable on-screen summary. The summary can be printed. **This is client-side demonstration processing only**: it does not store submissions or send them to Lakewood. A real server/form endpoint would be needed for live booking enquiries.

### General contact form
The contact form is separate and validates name, email, subject and message. It generates a `mailto:` draft for the visitor's default email application. The recipient is set to `info@thelakewood.co.za`, which is published on Lakewood's official contact page. A mailto link depends on the visitor having an email application configured.

### Interactive map
Leaflet and OpenStreetMap display an interactive map centred on the published address, 2 Vinton Road, Ormonde, Johannesburg South 2091. The marker coordinates are based on a third-party location listing; the official address is published by Lakewood. Confirm the exact entrance with the venue before relying on turn-by-turn directions.

### SEO and technical files
- Descriptive page title, meta description, required meta keywords, author and robots metadata.
- Open Graph sharing metadata and canonical URL placeholders.
- Descriptive image alt text, semantic headings and internal section links.
- `robots.txt`, `sitemap.xml` and a branded `404.html`.
- Responsive layouts and reduced-motion support.

## Configuration required before public deployment

The following details were not present in the supplied Part 2 files and have deliberately not been invented:

1. Replace `YOUR-DEPLOYED-DOMAIN` in `index.html`, `robots.txt` and `sitemap.xml` with the actual deployed website URL.
2. Confirm the official email recipient (`info@thelakewood.co.za`) and phone numbers before production use.
3. Confirm the map marker is positioned at the correct entrance.
4. Confirm venue names, capacities, prices and package terms before presenting them as facts.
5. Verify all 24 external Unsplash images load. Download and optimise local copies if required, and retain image source attributions.

## Existing Part 2 baseline screenshots

The `screenshots/` folder contains the desktop, tablet and mobile screenshots captured for Part 2. Capture a fresh set after completing the Part 3 implementation and add them to this folder with clear names such as `part3-desktop.png`, `part3-tablet.png` and `part3-mobile.png`. Do not present the older screenshots as proof of the new Part 3 functionality.

## Testing checklist

- [ ] Desktop, tablet and mobile layouts tested in browser developer tools.
- [ ] Mobile navigation opens, closes and updates `aria-expanded`.
- [ ] FAQ accordion opens and closes by mouse and keyboard.
- [ ] Gallery displays 24 items; each category filter works.
- [ ] Gallery search works with matching and no-matching terms.
- [ ] Lightbox opens, closes, navigates and responds to Escape/arrow keys.
- [ ] Enquiry form blocks missing/invalid fields, rejects invalid phone/guest/date values and displays a correct summary.
- [ ] Print summary action works.
- [ ] Contact form validates and generates a mailto draft (test after configuring the official recipient).
- [ ] Map tiles load and exact marker is corrected before publishing.
- [ ] `robots.txt`, `sitemap.xml` and `404.html` are available from the deployed root.
- [ ] All links, image sources and console output checked.
- [ ] SEO and Open Graph values updated to the real deployed URL.

## AI assistance disclosure

AI assistance was used to help draft and review parts of the HTML, CSS, JavaScript and documentation. The student should review, test, understand and adapt the implementation, and follow the lecturer's instructions for acknowledging AI assistance. External libraries and assets are listed in `REFERENCES.md`.

## Security and performance notes

- No passwords, API keys or private credentials are included in the repository.
- The page is intended to be served over HTTPS by the chosen static host.
- External Leaflet assets are pinned to version 1.9.4 and include Subresource Integrity attributes.
- Gallery images are lazy-loaded and request resized image variants.
- Client-side validation improves usability but is not a security boundary. A production form must validate again on a trusted server and use an approved submission endpoint with spam protection.
- Configure host-level security headers (for example Content-Security-Policy, X-Content-Type-Options and Permissions-Policy) through the deployment provider where supported.

## Deployment

The site is a static website and can be hosted using GitHub Pages, Netlify or another static hosting service. After deployment, configure the real site URL in the canonical/Open Graph tags and sitemap, test the published URL, and add the live link to this README. No live deployment has been performed as part of this ZIP creation.

## Development evidence

Use multiple descriptive commits as the project develops, for example:
- `feat: add searchable and filterable event gallery`
- `feat: implement gallery lightbox and FAQ accordion`
- `feat: add event enquiry processing and contact mailto form`
- `feat: add Leaflet map and technical SEO files`
- `docs: update Part 3 changelog, references and testing evidence`


## Part 3 evidence to capture after browser testing

Create and add the following screenshots after running the completed site. These are intentionally not fabricated; the included desktop/tablet/mobile screenshots are from Part 2 and are labelled as the baseline.

- `screenshots/part3-desktop.png` — full desktop page and interactive features.
- `screenshots/part3-tablet.png` — tablet layout.
- `screenshots/part3-mobile.png` — mobile navigation and responsive gallery.
- `screenshots/part3-gallery-filter.png` — gallery category/search result.
- `screenshots/part3-lightbox.png` — image lightbox open.
- `screenshots/part3-enquiry-summary.png` — valid event enquiry summary.
- `screenshots/part3-contact-validation.png` — contact form validation.
- `screenshots/part3-map.png` — loaded map and marker.
- `screenshots/part3-seo-source.png` — page source showing title, meta and OG tags.

## Part 2 feedback evidence and interpretation

The available LMS screenshot records a mark of 75/100 (75%) and Turnitin similarity/AI-indicator values for submitted files. It does not contain marker comments or a criterion-level rubric breakdown. Consequently, this portfolio does not claim that a particular lecturer comment was received. The Part 3 baseline review is documented in `PART2_FEEDBACK_REVIEW.md`.
