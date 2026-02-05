# Infrastructure layer

Implementations for database and repositories. Depends on `domain/` (entities and repository interfaces).

- **database/** — Supabase client (supabase.ts).
- **repositories/** — ProductRepository, CartRepository, OrderRepository implementing the interfaces in `domain/repositories/`.

API routes instantiate these and pass them into use cases.
