import { Product, ProductFilters } from "../entities/Product";

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(filters?: ProductFilters): Promise<Product[]>;
  create(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
}
