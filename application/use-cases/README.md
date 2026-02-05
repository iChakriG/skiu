# Use cases

| File | Purpose |
|------|--------|
| GetProductsUseCase.ts | List/filter products |
| GetProductByIdUseCase.ts | Single product by id |
| GetCartUseCase.ts | Get cart for user |
| AddToCartUseCase.ts | Add product to cart |
| GetOrdersUseCase.ts | List orders for user |
| CreateOrderUseCase.ts | Create order from cart + shipping address |

Each use case receives repository interfaces (from `domain/repositories`) and is invoked from `app/api/*`.
