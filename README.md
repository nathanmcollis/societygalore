# Archive Shop

Static HTML/CSS/JS shop generated from the supplied product photos.

## What is included
- `index.html` — tiled landing page with all 15 items
- `products/` — one separate page per item
- gallery thumbnails + full-screen lightbox on every item page
- suggested AUD prices and detailed item descriptions
- simple localStorage bag with an email-order checkout
- responsive layouts for desktop and mobile

## Before publishing
1. Open `catalog.js` and change `ARCHIVE SHOP` to your store name.
2. Replace `your-email@example.com` with the email you want order enquiries sent to.
3. Add verified garment measurements and fibre/size information to each product object in `catalog.js`.
4. Adjust any suggested prices you prefer.

## Preview locally
Open `index.html` directly, or from this folder run `python3 -m http.server 8000` and visit `http://localhost:8000`.

## GitHub Pages
Upload the contents of this folder to the root of a GitHub repository, then enable Pages from the repository settings. The site uses only relative paths, so it also works in a project subfolder.

## Pricing note
Prices are suggested listing prices, not formal appraisals. They were set conservatively from the supplied photos and comparable vintage/resale listings available in September 2026.
