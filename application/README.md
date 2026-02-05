# Application layer (use cases)

Orchestrates domain and repositories to implement app actions. Depends only on `domain/`.

- **use-cases/** — One file per use case: GetProducts, GetProductById, GetCart, AddToCart, GetOrders, CreateOrder.

API routes in `app/api/` call these use cases and inject repository implementations from `infrastructure/`.
