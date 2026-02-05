import { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import { Order } from "@/domain/entities/Order";

export class GetAllOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
