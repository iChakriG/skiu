import { ICartRepository } from "@/domain/repositories/ICartRepository";
import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Cart, CartItem } from "@/domain/entities/Cart";

export class AddToCartUseCase {
  constructor(
    private cartRepository: ICartRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(userId: string, productId: string, quantity: number): Promise<Cart> {
    // Get product to validate and get price
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    // Get or create cart
    let cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      cart = await this.cartRepository.create({
        userId,
        items: [],
        total: 0,
      });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    let updatedItems: CartItem[];

    if (existingItemIndex >= 0) {
      // Update quantity
      updatedItems = [...cart.items];
      updatedItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      updatedItems = [
        ...cart.items,
        {
          productId,
          quantity,
          price: product.price,
        },
      ];
    }

    return this.cartRepository.update(cart.id, updatedItems);
  }
}
