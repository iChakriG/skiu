import { NextRequest, NextResponse } from "next/server";
import { GetProductsUseCase } from "@/application/use-cases/GetProductsUseCase";
import { CreateProductUseCase } from "@/application/use-cases/CreateProductUseCase";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, category, stock } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: "name and price are required" },
        { status: 400 }
      );
    }

    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const product = await createProductUseCase.execute({
      name: String(name),
      description: description != null ? String(description) : "",
      price: Number(price),
      imageUrl: imageUrl != null ? String(imageUrl) : "",
      category: category != null ? String(category) : "",
      stock: stock != null ? Number(stock) : 0,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
