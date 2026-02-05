# API routes

REST endpoints used by the mobile app.

| Path | Methods | Notes |
|------|--------|--------|
| /api/products | GET | Query: category, minPrice, maxPrice, search |
| /api/products/[id] | GET | |
| /api/cart | GET, POST | Header: x-user-id. POST body: productId, quantity |
| /api/orders | GET, POST | Header: x-user-id. POST body: shippingAddress |
| /api/orders/[id] | GET | |
| /api/health | GET | Health check |

Implementation: each route instantiates use cases from `application/use-cases/` and repositories from `infrastructure/repositories/`.
