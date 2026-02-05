# Skiu Web App

Next.js application that includes:

- **E-commerce storefront** — Home, sign in, sign up, account (`/`, `/login`, `/signup`, `/account`)
- **Admin panel** — Dashboard, products CRUD, orders (`/admin`, `/admin/login`)
- **REST API** — Products, cart, orders (used by the mobile app and storefront)

## Setup

```bash
# From repo root (with workspaces)
npm install
npm run dev

# Or from this folder
cd apps/web
npm install
npm run dev
```

Set `.env` from `.env.example` (Supabase URL and keys).

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Deploy (Vercel)

Set the project **Root Directory** to `apps/web` in your Vercel project settings.
