import { NextRequest, NextResponse } from "next/server";
import { GetProductsUseCase } from "@/application/use-cases/GetProductsUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import { ProductFilters } from "@/domain/entities/Product";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters: ProductFilters = {};

    if (searchParams.get("category")) {
      filters.category = searchParams.get("category")!;
    }

    if (searchParams.get("minPrice")) {
      filters.minPrice = parseFloat(searchParams.get("minPrice")!);
    }

    if (searchParams.get("maxPrice")) {
      filters.maxPrice = parseFloat(searchParams.get("maxPrice")!);
    }

    if (searchParams.get("search")) {
      filters.search = searchParams.get("search")!;
    }

    const productRepository = new ProductRepository();
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const products = await getProductsUseCase.execute(filters);

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
