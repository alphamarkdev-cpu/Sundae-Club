# Sundae Club Body Rituals — E-commerce Starter

A functional Next.js e-commerce storefront for a Gen-Z body scrub & body care brand.

## Included
- Responsive storefront with original layout inspired by the supplied brand direction
- Same Sundae Club logo asset supplied by the client
- 6 starter products: 4 body scrubs + 2 whipping creams
- Flat price: ₹999 each
- Product detail pages
- Cart with quantity controls and localStorage persistence
- COD checkout flow
- Order confirmation page
- `/api/orders` demo endpoint
- PostgreSQL/Prisma schema prepared for production order persistence
- Dynamic CSS marquee, floating product art and responsive UI

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Vercel

Import the folder/repository as a Next.js project. No Shopify or Wix is required.

The current checkout is intentionally demo-friendly and keeps the cart in the browser. Before a real launch, set a PostgreSQL `DATABASE_URL` and update `app/api/orders/route.ts` to persist orders via Prisma/Supabase.

## Asset notes

Original client assets are kept under `public/assets/brand` and cropped dummy product images are under `public/assets/products`.
