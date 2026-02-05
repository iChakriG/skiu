import { IProductRepository } from "@/domain/repositories/IProductRepository";
import { Product } from "@/domain/entities/Product";

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string, product: Partial<Product>): Promise<Product> {
    return this.productRepository.update(id, product);
  }
}
