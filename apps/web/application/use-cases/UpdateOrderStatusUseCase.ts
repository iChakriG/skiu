import { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import { Order } from "@/domain/entities/Order";

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderId: string, status: Order["status"]): Promise<Order> {
    return this.orderRepository.updateStatus(orderId, status);
  }
}
