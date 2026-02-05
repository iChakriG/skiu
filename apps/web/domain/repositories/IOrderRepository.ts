import { Order } from "../entities/Order";

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  findByUserId(userId: string): Promise<Order[]>;
  create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order>;
  updateStatus(id: string, status: Order["status"]): Promise<Order>;
}
