# Skiu E-commerce Platform

A full-stack e-commerce platform with a **Next.js API** and a **React Native (Expo) mobile app**. Built with TypeScript, Tailwind CSS, and Supabase PostgreSQL, using clean architecture.

## Contents

- [Features](#-features)
- [Project structure](#-project-structure)
- [Setup](#-setup)
- [API endpoints](#-api-endpoints)
- [Architecture](#-architecture)
- [Deployment](#-deployment-to-vercel)
- [Development](#-development)

## Features

- **Clean architecture** — Domain, application, infrastructure, and presentation layers
- **TypeScript** — End-to-end type safety
- **RESTful API** — Products, cart, and orders; consumed by the mobile app
- **React Native (Expo)** — Cross-platform mobile app in `mobile/`
- **Supabase** — PostgreSQL database and auth for admin
- **Admin tool** — Dashboard, products CRUD, orders; protected by Supabase Auth (email/password)
- **Vercel-ready** — Configured for one-click deploy

## Project structure

| Folder | Purpose |
|--------|--------|
| **app/** | Next.js app: pages, layout, **API routes** (products, cart, orders) |
| **domain/** | Entities (Product, Order, Cart, User) and repository **interfaces** |
| **application/** | **Use cases** (GetProducts, AddToCart, CreateOrder, etc.) |
| **infrastructure/** | Supabase client and repository **implementations** |
| **lib/** | Shared utilities |
| **mobile/** | React Native (Expo) app — [mobile/README.md](mobile/README.md) |
| **supabase/** | SQL migrations |

Full map and “where to find…” guide: **[STRUCTURE.md](STRUCTURE.md)**.

## Setup

### Prerequisites

- **Node.js 18+** and npm
- **Supabase** account and project (for the API)

### Backend (Next.js API)

1. **Clone and install**
   ```bash
   git clone https://github.com/iChakriG/skiu.git
   cd skiu
   npm install
   ```

2. **Environment variables**
   ```bash
   cp .env.example .env
   ```
   Set in `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key  
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (if needed)

3. **Database**
   - In the [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor, run:
   - `supabase/migrations/001_initial_schema.sql`

4. **Run the API**
   ```bash
   npm run dev
   ```
   API: [http://localhost:3000](http://localhost:3000)

### Admin tool

The admin UI at **[/admin](http://localhost:3000/admin)** is protected by **Supabase Auth**. To sign in:

1. In the [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Users, create a user (email + password) or enable Email sign-in.
2. Open [http://localhost:3000/admin](http://localhost:3000/admin); you’ll be redirected to `/admin/login`.
3. Sign in with that user. Only authenticated users can access admin pages and admin API routes (product create/update/delete, all orders, order status update).

### Mobile app (optional)

The app in `mobile/` uses the API for products, cart, and orders.

```bash
cd mobile
npm install
cp .env.example .env
# Set EXPO_PUBLIC_API_URL (e.g. http://localhost:3000 or your machine IP for a physical device)
npm start
```

Details: [mobile/README.md](mobile/README.md) (User ID for cart/orders, scripts).

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products. Query: `category`, `minPrice`, `maxPrice`, `search` |
| GET | `/api/products/[id]` | Product by ID |
| GET | `/api/cart` | Get cart. Header: `x-user-id` |
| POST | `/api/cart` | Add to cart. Header: `x-user-id`. Body: `{ "productId", "quantity" }` |
| GET | `/api/orders` | List orders. Header: `x-user-id` |
| POST | `/api/orders` | Create order. Header: `x-user-id`. Body: `{ "shippingAddress": { "street", "city", "state", "zipCode", "country" } }` |
| GET | `/api/orders/[id]` | Order by ID |
| GET | `/api/health` | Health check |

## Architecture

Clean architecture layers:

1. **Domain** — Entities and repository interfaces (no framework code)
2. **Application** — Use cases that depend only on domain
3. **Infrastructure** — Supabase client and repository implementations
4. **Presentation** — Next.js `app/` (API routes and pages)

Benefits: testability, clear dependencies, and the ability to swap infrastructure (e.g. database) without changing business logic.

## Deployment to Vercel

1. Push the repo to GitHub and import it in [Vercel](https://vercel.com).
2. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
3. Deploy. The project is configured via `vercel.json`.

## Authentication

The API currently uses an **`x-user-id`** header to identify the user (for cart and orders). For production, consider:

- Supabase Auth or JWT
- Resolving the user from the token in API routes (see `getUserId` in `app/api/cart/route.ts` and `app/api/orders/route.ts`)

## Database schema

Main tables: **products**, **carts**, **orders**. Full schema: [supabase/migrations/001_initial_schema.sql](supabase/migrations/001_initial_schema.sql).

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm start        # Run production server
npm run lint     # Lint
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](LICENSE).
