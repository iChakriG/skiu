import { Cart, CartItem } from "../entities/Cart";

export interface ICartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  create(cart: Omit<Cart, "id" | "createdAt" | "updatedAt">): Promise<Cart>;
  update(cartId: string, items: CartItem[]): Promise<Cart>;
  clear(cartId: string): Promise<void>;
  delete(cartId: string): Promise<void>;
}
