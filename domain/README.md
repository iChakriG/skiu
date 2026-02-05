# Domain layer

Core business types and contracts. No framework or infrastructure code.

- **entities/** — Product, Order, Cart, User (and related types like CartItem, Address).
- **repositories/** — Interfaces only (IProductRepository, ICartRepository, IOrderRepository). Implementations live in `infrastructure/repositories/`.

Everything else in the app depends on this layer; this layer depends on nothing.
