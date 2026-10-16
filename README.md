# Sundae Club — Responsive Static E-commerce Website

A responsive storefront using plain HTML, CSS and JavaScript. No Node.js, framework, build step or database is needed to open the site.

## Open the website

1. Download and extract the ZIP.
2. Open `index.html` in Chrome or another modern browser.
3. Browse the products, add items to the bag, edit quantities and complete the Cash on Delivery checkout flow.

## What changed in the campaign banners

The five supplied campaign sections have been rebuilt as responsive HTML/CSS layouts rather than each being one flattened banner image. The headline text, product descriptions, calls to action, navigation, benefits and offer prices are now separate editable elements. Supplied photo scenes are used as separate high-quality image layers and retain the original colour palette, styling direction and product imagery. Original product image files were re-exported at higher WebP quality to reduce extra softness from compression.

### Adjust section sizes visually

1. Open `index.html?customize=1` in your browser. When opening from a local folder, append `?customize=1` to the file URL.
2. Use the design panel to adjust each section's **width**, **text and visual scale**, and **spacing** independently.
3. Preview changes immediately. Settings save in that browser.
4. To make selected settings the website defaults for all visitors, click **Copy CSS settings**, then paste the generated rules at the end of `styles.css`.

The campaign copy and buttons can be edited in `index.html`; product listing names, descriptions, prices and images are in the `products` array near the top of `script.js`. The visual editor changes section sizing, scaling and spacing; it does not drag individual elements around the canvas.

## Catalogue and prices

- Coconut + Lime — ₹999
- Berry Milkshake — ₹999
- Chocolate Vanilla — ₹999
- Mango Sorbet — ₹999
- Whipping Cream body butter — ₹999
- Sweet Duo — ₹1,699 (two scrubs; saving ₹299 against ₹1,998)

Shipping is ₹99 under ₹1,499 and free at ₹1,499 or more. Payment mode is Cash on Delivery.

## Orders: setup required before real launch

The COD checkout is interactive, but with no server orders are saved only in the customer's browser. **The store does not automatically receive order notifications in this static version.**

To enable a WhatsApp order handoff, open `script.js` and set the empty `STORE_WHATSAPP` value near the top to the store's number in international digits, without `+`, spaces or dashes. After checkout, the customer can open WhatsApp with the order details prefilled and must press Send. For central order management and automatic notifications, connect an order API or e-commerce backend.

## Main files

- `index.html` — rebuilt homepage, product details, cart drawer and COD checkout markup
- `styles.css` — responsive layouts, styling and visual editor styles
- `script.js` — product catalogue, search, filters, bag/cart, checkout and order flow
- `banner-editor.js` — visual sizing controls for the five campaign sections
- `assets/` — supplied logo, product images and high-quality crops from the supplied banner artwork
