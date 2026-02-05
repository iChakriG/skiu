import { NextRequest, NextResponse } from "next/server";
import { GetCartUseCase } from "@/application/use-cases/GetCartUseCase";
import { AddToCartUseCase } from "@/application/use-cases/AddToCartUseCase";
import { CartRepository } from "@/infrastructure/repositories/CartRepository";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";

export const dynamic = "force-dynamic";

// Helper to get userId from request (in a real app, extract from JWT token)
function getUserId(request: NextRequest): string {
  // For now, using a header. In production, extract from auth token
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    throw new Error("User ID is required");
  }
  return userId;
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);

    const cartRepository = new CartRepository();
    const getCartUseCase = new GetCartUseCase(cartRepository);
    const cart = await getCartUseCase.execute(userId);

    if (!cart) {
      return NextResponse.json({ cart: null }, { status: 200 });
    }

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch cart" },
      { status: error.message?.includes("required") ? 401 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "productId and quantity are required" },
        { status: 400 }
      );
    }

    const cartRepository = new CartRepository();
    const productRepository = new ProductRepository();
    const addToCartUseCase = new AddToCartUseCase(
      cartRepository,
      productRepository
    );

    const cart = await addToCartUseCase.execute(userId, productId, quantity);

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error: any) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add to cart" },
      { status: error.message?.includes("required") ? 401 : 400 }
    );
  }
}
