# Repository implementations

Concrete implementations of the interfaces in `domain/repositories/`:

- **ProductRepository.ts** — IProductRepository (Supabase)
- **CartRepository.ts** — ICartRepository (Supabase)
- **OrderRepository.ts** — IOrderRepository (Supabase)

Used only from `app/api/*` when constructing use cases.
