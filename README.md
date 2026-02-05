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

Each app lives in its own folder under `apps/`:

| Folder | Purpose |
|--------|--------|
| **apps/web/** | Next.js app: **e-commerce storefront** (/, /login, /signup, /account), **admin panel** (/admin), and **REST API** (products, cart, orders). See [apps/web/README.md](apps/web/README.md). |
| **apps/mobile/** | React Native (Expo) app — [apps/mobile/README.md](apps/mobile/README.md) |

Inside `apps/web/`: `app/` (routes + API), `domain/`, `application/`, `infrastructure/`, `lib/`, `supabase/`.

Full map: **[STRUCTURE.md](STRUCTURE.md)**.

## Setup

### Prerequisites

- **Node.js 18+** and npm
- **Supabase** account and project (for the API)

### Web app (storefront + admin + API)

1. **Clone and install**
   ```bash
   git clone https://github.com/iChakriG/skiu.git
   cd skiu
   npm install
   ```

2. **Environment variables**
   ```bash
   cp apps/web/.env.example apps/web/.env
   ```
   Set in `apps/web/.env`:
   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key  
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (if needed)

3. **Database**
   - In the [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor, run:
   - `apps/web/supabase/migrations/001_initial_schema.sql`

4. **Run the web app**
   ```bash
   npm run dev
   ```
   (Runs the app in `apps/web`.) Site: [http://localhost:3000](http://localhost:3000)

### Admin tool

The admin UI at **[/admin](http://localhost:3000/admin)** is protected by **Supabase Auth**. To sign in:

1. In the [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Users, create a user (email + password) or enable Email sign-in.
2. Open [http://localhost:3000/admin](http://localhost:3000/admin); you’ll be redirected to `/admin/login`.
3. Sign in with that user. Only authenticated users can access admin pages and admin API routes (product create/update/delete, all orders, order status update).

### Storefront login

The e-commerce website supports **customer sign-in** with the same Supabase Auth:

- **[/login](http://localhost:3000/login)** — Sign in (email/password). Use `?returnTo=...` to redirect after login.
- **[/signup](http://localhost:3000/signup)** — Create an account; Supabase can send a confirmation email depending on your project settings.
- **[/account](http://localhost:3000/account)** — Account page (email, sign out); requires sign-in (redirects to login if not authenticated).

The storefront header shows **Sign in** / **Sign up** when logged out, and **Account** / **Sign out** when logged in.

### Mobile app (optional)

The app in `apps/mobile/` uses the API for products, cart, and orders.

```bash
npm run mobile
# Or: cd apps/mobile && npm install && cp .env.example .env && npm start
```

Set `EXPO_PUBLIC_API_URL` in `apps/mobile/.env` (e.g. `http://localhost:3000` or your deployed web API URL). Details: [apps/mobile/README.md](apps/mobile/README.md).

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
2. In the Vercel project, set **Root Directory** to `apps/web`.
3. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
4. Deploy. The web app uses `apps/web/vercel.json`.

## Authentication

The API currently uses an **`x-user-id`** header to identify the user (for cart and orders). For production, consider:

- Supabase Auth or JWT
- Resolving the user from the token in API routes (see `getUserId` in `apps/web/app/api/cart/route.ts` and `apps/web/app/api/orders/route.ts`)

## Database schema

Main tables: **products**, **carts**, **orders**. Full schema: [apps/web/supabase/migrations/001_initial_schema.sql](apps/web/supabase/migrations/001_initial_schema.sql).

## Development

From repo root (uses npm workspaces):

```bash
npm run dev        # Start web app (apps/web)
npm run build      # Build web app
npm start          # Run web app production server
npm run lint       # Lint web app
npm run mobile     # Start Expo (apps/mobile)
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

See [LICENSE](LICENSE).
