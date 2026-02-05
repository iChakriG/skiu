# Repository interfaces (ports)

Abstractions for persistence. Implementations are in `infrastructure/repositories/`.

- **IProductRepository.ts**
- **ICartRepository.ts**
- **IOrderRepository.ts**

Use cases depend on these interfaces, not on concrete repositories.
