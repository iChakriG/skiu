import { ICartRepository } from "@/domain/repositories/ICartRepository";
import { Cart, CartItem } from "@/domain/entities/Cart";
import { getSupabaseAdmin } from "../database/supabase";

export class CartRepository implements ICartRepository {
  private getClient() {
    return getSupabaseAdmin();
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const { data, error } = await this.getClient()
      .from("carts")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;

    return this.mapToCart(data);
  }

  async create(cart: Omit<Cart, "id" | "createdAt" | "updatedAt">): Promise<Cart> {
    const { data, error } = await this.getClient()
      .from("carts")
      .insert({
        user_id: cart.userId,
        items: cart.items,
        total: cart.total,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to create cart: ${error?.message}`);
    }

    return this.mapToCart(data);
  }

  async update(cartId: string, items: CartItem[]): Promise<Cart> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { data, error } = await this.getClient()
      .from("carts")
      .update({
        items,
        total,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cartId)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to update cart: ${error?.message}`);
    }

    return this.mapToCart(data);
  }

  async clear(cartId: string): Promise<void> {
    const { error } = await this.getClient()
      .from("carts")
      .update({
        items: [],
        total: 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", cartId);

    if (error) {
      throw new Error(`Failed to clear cart: ${error.message}`);
    }
  }

  async delete(cartId: string): Promise<void> {
    const { error } = await this.getClient().from("carts").delete().eq("id", cartId);

    if (error) {
      throw new Error(`Failed to delete cart: ${error.message}`);
    }
  }

  private mapToCart(data: any): Cart {
    return {
      id: data.id,
      userId: data.user_id,
      items: data.items || [],
      total: data.total || 0,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
