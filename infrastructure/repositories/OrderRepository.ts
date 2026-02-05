import { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import { Order } from "@/domain/entities/Order";
import { getSupabaseAdmin } from "../database/supabase";

export class OrderRepository implements IOrderRepository {
  private getClient() {
    return getSupabaseAdmin();
  }

  async findById(id: string): Promise<Order | null> {
    const { data, error } = await this.getClient()
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return this.mapToOrder(data);
  }

  async findAll(): Promise<Order[]> {
    const { data, error } = await this.getClient()
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((item) => this.mapToOrder(item));
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const { data, error } = await this.getClient()
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((item) => this.mapToOrder(item));
  }

  async create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    const { data, error } = await this.getClient()
      .from("orders")
      .insert({
        user_id: order.userId,
        items: order.items,
        total: order.total,
        status: order.status,
        shipping_address: order.shippingAddress,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to create order: ${error?.message}`);
    }

    return this.mapToOrder(data);
  }

  async updateStatus(id: string, status: Order["status"]): Promise<Order> {
    const { data, error } = await this.getClient()
      .from("orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to update order status: ${error?.message}`);
    }

    return this.mapToOrder(data);
  }

  private mapToOrder(data: any): Order {
    return {
      id: data.id,
      userId: data.user_id,
      items: data.items || [],
      total: data.total || 0,
      status: data.status,
      shippingAddress: data.shipping_address,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
