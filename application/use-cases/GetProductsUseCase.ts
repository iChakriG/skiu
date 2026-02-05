import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product, ProductFilters } from "@/domain/entities/Product";

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(filters?: ProductFilters): Promise<Product[]> {
    return this.productRepository.findAll(filters);
  }
}
