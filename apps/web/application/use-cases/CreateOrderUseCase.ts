import { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import { ICartRepository } from "@/domain/repositories/ICartRepository";
import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Order, OrderStatus, Address } from "@/domain/entities/Order";

export class CreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private cartRepository: ICartRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(userId: string, shippingAddress: Address): Promise<Order> {
    // Get cart
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Validate stock and get product details
    const orderItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productRepository.findById(item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: product.name,
        };
      })
    );

    // Create order
    const order = await this.orderRepository.create({
      userId,
      items: orderItems,
      total: cart.total,
      status: OrderStatus.PENDING,
      shippingAddress,
    });

    // Clear cart
    await this.cartRepository.clear(cart.id);

    // Update product stock (in a real app, you'd want to do this in a transaction)
    for (const item of cart.items) {
      const product = await this.productRepository.findById(item.productId);
      if (product) {
        await this.productRepository.update(item.productId, {
          stock: product.stock - item.quantity,
        });
      }
    }

    return order;
  }
}
