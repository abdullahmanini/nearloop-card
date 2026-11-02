# Nearloop digital business card

Static site for Abdullah Al Mneni's digital business card, served at **https://card.nearloop.ca/** by GitHub Pages.

- `index.html`, `styles.css`, `card.js`: the card and its share view (one QR code at a time: the card itself, or https://nearloop.ca/).
- `card.vcf`: vCard 3.0 for "Add to Contacts".
- `apple-touch-icon.png`, `favicon.svg`: icons.
- `CNAME`: the custom domain.

No tracking, cookies, accounts or backend. The QR codes and vCard were generated from `src/lib/contact-card.ts` in the main Nearloop repository; regenerate them there if the contact details change.
