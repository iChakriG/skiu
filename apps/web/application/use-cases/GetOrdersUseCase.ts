import { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import { Order } from "@/domain/entities/Order";

export class GetOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(userId: string): Promise<Order[]> {
    return this.orderRepository.findByUserId(userId);
  }
}
