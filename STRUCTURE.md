# Project structure

Quick map of the repo. Start here when looking for code.

## Root

| Folder / file      | Purpose |
|--------------------|--------|
| **app/**           | Next.js app: pages, layout, API routes |
| **application/**   | Use cases (application logic); depends only on domain |
| **domain/**        | Entities and repository interfaces; no framework code |
| **infrastructure/**| Supabase client and repository implementations |
| **lib/**           | Shared utilities |
| **mobile/**       | React Native (Expo) app that consumes the API |
| **supabase/**      | SQL migrations for the database |
| **STRUCTURE.md**   | This file |

## Backend (Next.js)

```
app/
├── api/                 → REST API (used by mobile app)
│   ├── products/        GET list, GET by id
│   ├── cart/            GET cart, POST add item (x-user-id)
│   ├── orders/          GET list, POST create (x-user-id)
│   └── health/          Health check
├── layout.tsx           Root layout
├── page.tsx             Home page
└── globals.css          Global styles

domain/
├── entities/            Product, Order, Cart, User (types + interfaces)
└── repositories/        IProductRepository, ICartRepository, IOrderRepository

application/
└── use-cases/           GetProducts, GetProductById, GetCart, AddToCart, GetOrders, CreateOrder

infrastructure/
├── database/            supabase.ts (client)
└── repositories/        ProductRepository, CartRepository, OrderRepository (implement domain interfaces)
```

**Flow:** `app/api/*` → use cases from `application/` → repositories from `infrastructure/`; use cases depend only on `domain/`.

## Mobile app

```
mobile/
├── App.tsx              Entry: UserProvider + RootNavigator
├── src/
│   ├── api/             API client (products, cart, orders) + base URL
│   ├── context/         UserContext (userId for x-user-id)
│   ├── navigation/      Stack navigator + screens registration
│   ├── screens/         ProductList, ProductDetail, Cart, Checkout, Orders, OrderDetail, Settings
│   └── types/           Product, Cart, Order (mirror backend entities)
├── assets/              App icon, splash (see assets/README.md)
└── README.md            Setup and scripts
```

**Flow:** Screens → `api/*` and `context/UserContext`; API client uses `EXPO_PUBLIC_API_URL` and sends `x-user-id` where needed.

## Config at root

- `package.json` / `next.config.js` / `tsconfig.json` / `tailwind.config.ts` / `vercel.json` — Next.js app
- `mobile/package.json` / `mobile/app.json` / `mobile/tsconfig.json` — Expo app
- `.env.example` — backend env vars; `mobile/.env.example` — mobile API URL

## Where to find…

| I want to…                    | Look in |
|-------------------------------|--------|
| Change API response shape     | `app/api/*` + `application/use-cases/*` |
| Change product/order types    | `domain/entities/*` |
| Change DB access              | `infrastructure/repositories/*` and `infrastructure/database/*` |
| Add a new API route           | `app/api/<name>/route.ts` + use case in `application/use-cases/` |
| Change mobile UI              | `mobile/src/screens/*` |
| Change mobile API calls       | `mobile/src/api/*` |
| Run DB migrations            | `supabase/migrations/*` |
