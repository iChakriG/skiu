import { NextRequest, NextResponse } from "next/server";
import { GetProductByIdUseCase } from "@/application/use-cases/GetProductByIdUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productRepository = new ProductRepository();
    const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    const product = await getProductByIdUseCase.execute(params.id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
