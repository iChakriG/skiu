import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product } from "@/domain/entities/Product";

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    product: Omit<Product, "id" | "createdAt" | "updatedAt">
  ): Promise<Product> {
    return this.productRepository.create(product);
  }
}
