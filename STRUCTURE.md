# Project structure

Quick map of the repo. Each app is in its own folder under `apps/`.

## Root

| Folder / file      | Purpose |
|--------------------|--------|
| **apps/web/**      | Next.js app: e-commerce storefront, admin panel, REST API |
| **apps/mobile/**   | React Native (Expo) app that consumes the API |
| **package.json**   | Workspace root; scripts run `apps/web` or `apps/mobile` |
| **STRUCTURE.md**   | This file |

## Web app (apps/web)

```
apps/web/
├── app/                  → Next.js routes and API
│   ├── (storefront)/     → E-commerce site: /, /login, /signup, /account
│   ├── admin/            → Admin panel: /admin, /admin/login, products, orders
│   ├── api/              → REST API (products, cart, orders, health)
│   ├── layout.tsx        → Root layout
│   └── globals.css
├── domain/               → Entities and repository interfaces
├── application/          → Use cases
├── infrastructure/       → Supabase client and repositories
├── lib/                  → Auth context, Supabase SSR clients, utils
├── supabase/             → SQL migrations
├── middleware.ts         → Session refresh, admin route protection
├── package.json          → skiu-web
└── README.md
```

**Flow:** `app/api/*` → use cases from `application/` → repositories from `infrastructure/`; use cases depend only on `domain/`.

## Mobile app (apps/mobile)

```
apps/mobile/
├── App.tsx               → Entry: UserProvider + RootNavigator
├── src/
│   ├── api/              → API client (products, cart, orders)
│   ├── context/          → UserContext (userId for x-user-id)
│   ├── navigation/       → Stack navigator
│   ├── screens/          → ProductList, ProductDetail, Cart, Checkout, Orders, etc.
│   └── types/            → Product, Cart, Order
├── assets/
├── package.json          → skiu-mobile
└── README.md
```

**Flow:** Screens → `api/*` and `context/UserContext`; API client uses `EXPO_PUBLIC_API_URL` and sends `x-user-id` where needed.

## Where to find…

| I want to…                    | Look in |
|-------------------------------|--------|
| Change storefront / login     | `apps/web/app/(storefront)/*` |
| Change admin UI               | `apps/web/app/admin/*` |
| Change API response shape     | `apps/web/app/api/*` + `apps/web/application/use-cases/*` |
| Change product/order types    | `apps/web/domain/entities/*` |
| Change DB access              | `apps/web/infrastructure/repositories/*` |
| Add a new API route           | `apps/web/app/api/<name>/route.ts` + use case |
| Change mobile UI              | `apps/mobile/src/screens/*` |
| Change mobile API calls       | `apps/mobile/src/api/*` |
| Run DB migrations             | `apps/web/supabase/migrations/*` |
