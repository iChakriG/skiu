# Project structure

Flat layout: everything lives at the repo root for easy navigation.

## Root layout

```
skiu/
├── app/                  → Next.js routes and UI
│   ├── (storefront)/     → E-commerce: /, /login, /signup, /account
│   ├── admin/            → Admin panel: /admin, products, orders
│   ├── api/              → REST API (products, cart, orders, health)
│   ├── layout.tsx
│   └── globals.css
├── application/          → Use cases (orchestrate domain + infrastructure)
│   └── use-cases/
├── domain/               → Entities and repository interfaces
│   ├── entities/
│   └── repositories/
├── infrastructure/       → Supabase client and repository implementations
│   ├── database/
│   └── repositories/
├── lib/                  → Auth context, Supabase SSR, utils
│   ├── auth/
│   └── supabase/
├── supabase/             → SQL migrations
│   └── migrations/
├── middleware.ts         → Session refresh, admin protection
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

**Flow:** `app/api/*` → use cases in `application/` → repositories in `infrastructure/`; use cases depend only on `domain/`.

## Where to find…

| I want to…                    | Look in |
|-------------------------------|--------|
| Storefront / login / signup   | `app/(storefront)/` |
| Admin UI                      | `app/admin/` |
| API routes                    | `app/api/` |
| API / business logic          | `application/use-cases/` |
| Product, order, cart types    | `domain/entities/` |
| Database access               | `infrastructure/repositories/` |
| Add a new API route           | `app/api/<name>/route.ts` + use case |
| DB migrations                 | `supabase/migrations/` |
