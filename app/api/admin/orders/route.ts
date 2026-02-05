import { NextResponse } from "next/server";
import { GetAllOrdersUseCase } from "@/application/use-cases/GetAllOrdersUseCase";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";

export async function GET() {
  try {
    const orderRepository = new OrderRepository();
    const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
    const orders = await getAllOrdersUseCase.execute();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
