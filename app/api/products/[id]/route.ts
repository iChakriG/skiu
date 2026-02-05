import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/route-handler";
import { GetProductByIdUseCase } from "@/application/use-cases/GetProductByIdUseCase";
import { UpdateProductUseCase } from "@/application/use-cases/UpdateProductUseCase";
import { DeleteProductUseCase } from "@/application/use-cases/DeleteProductUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import { Product } from "@/domain/entities/Product";

export const dynamic = "force-dynamic";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient(request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updateData: Partial<Product> = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.stock !== undefined) updateData.stock = body.stock;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "At least one field to update is required" },
        { status: 400 }
      );
    }

    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const product = await updateProductUseCase.execute(params.id, updateData);

    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient(request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const productRepository = new ProductRepository();
    const deleteProductUseCase = new DeleteProductUseCase(productRepository);
    await deleteProductUseCase.execute(params.id);

    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
