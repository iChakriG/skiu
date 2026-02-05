# Seeds

Product seed data for development and demo. Product images live in **`public/product-images/`** so Next.js serves them as static assets from the root ([Assets · Next.js](https://nextjs.org/learn/pages-router/assets-metadata-css-assets)).

- **`products.json`** – List of products (id, shortId, name, description, price, category, stock). The seed script uses `shortId` to match assets under `public/product-images/` (e.g. `product-101.png`).

Run from project root:

```bash
node scripts/seed.mjs
```

This uploads images from `public/product-images/` to Supabase Storage and upserts the products from this folder into the database.
