# API routes

REST API endpoints (products, cart, orders, health).

| Path | Methods | Notes |
|------|--------|--------|
| /api/products | GET | Query: category, minPrice, maxPrice, search |
| /api/products/[id] | GET | |
| /api/cart | GET, POST | Header: x-user-id. POST body: productId, quantity |
| /api/orders | GET, POST | Header: x-user-id. POST body: shippingAddress |
| /api/orders/[id] | GET | |
| /api/health | GET | Health check |

Implementation: each route instantiates use cases from `application/use-cases/` and repositories from `infrastructure/repositories/`.
