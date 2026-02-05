import { NextRequest, NextResponse } from "next/server";
import { CreateOrderUseCase } from "@/application/use-cases/CreateOrderUseCase";
import { GetOrdersUseCase } from "@/application/use-cases/GetOrdersUseCase";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";
import { CartRepository } from "@/infrastructure/repositories/CartRepository";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import { Address } from "@/domain/entities/Order";

// Helper to get userId from request
function getUserId(request: NextRequest): string {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    throw new Error("User ID is required");
  }
  return userId;
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);

    const orderRepository = new OrderRepository();
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
    const orders = await getOrdersUseCase.execute(userId);

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: error.message?.includes("required") ? 401 : 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const body = await request.json();
    const { shippingAddress } = body;

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "shippingAddress is required" },
        { status: 400 }
      );
    }

    // Validate address structure
    const address: Address = {
      street: shippingAddress.street,
      city: shippingAddress.city,
      state: shippingAddress.state,
      zipCode: shippingAddress.zipCode,
      country: shippingAddress.country,
    };

    if (!address.street || !address.city || !address.state || !address.zipCode || !address.country) {
      return NextResponse.json(
        { error: "Invalid shipping address" },
        { status: 400 }
      );
    }

    const orderRepository = new OrderRepository();
    const cartRepository = new CartRepository();
    const productRepository = new ProductRepository();
    const createOrderUseCase = new CreateOrderUseCase(
      orderRepository,
      cartRepository,
      productRepository
    );

    const order = await createOrderUseCase.execute(userId, address);

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: error.message?.includes("required") ? 401 : 400 }
    );
  }
}
