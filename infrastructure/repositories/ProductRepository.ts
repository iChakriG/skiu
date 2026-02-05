import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product, ProductFilters } from "@/domain/entities/Product";
import { getSupabaseAdmin } from "../database/supabase";

export class ProductRepository implements IProductRepository {
  private getClient() {
    return getSupabaseAdmin();
  }

  async findById(id: string): Promise<Product | null> {
    const { data, error } = await this.getClient()
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;

    return this.mapToProduct(data);
  }

  async findAll(filters?: ProductFilters): Promise<Product[]> {
    let query = this.getClient().from("products").select("*");

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.minPrice) {
      query = query.gte("price", filters.minPrice);
    }

    if (filters?.maxPrice) {
      query = query.lte("price", filters.maxPrice);
    }

    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((item) => this.mapToProduct(item));
  }

  async create(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const { data, error } = await this.getClient()
      .from("products")
      .insert({
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.imageUrl,
        category: product.category,
        stock: product.stock,
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to create product: ${error?.message}`);
    }

    return this.mapToProduct(data);
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const updateData: any = {};

    if (product.name !== undefined) updateData.name = product.name;
    if (product.description !== undefined) updateData.description = product.description;
    if (product.price !== undefined) updateData.price = product.price;
    if (product.imageUrl !== undefined) updateData.image_url = product.imageUrl;
    if (product.category !== undefined) updateData.category = product.category;
    if (product.stock !== undefined) updateData.stock = product.stock;

    const { data, error } = await this.getClient()
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to update product: ${error?.message}`);
    }

    return this.mapToProduct(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.getClient().from("products").delete().eq("id", id);

    if (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  private mapToProduct(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.image_url,
      category: data.category,
      stock: data.stock,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
