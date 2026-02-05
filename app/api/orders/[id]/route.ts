import { NextRequest, NextResponse } from "next/server";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";
import { Order } from "@/domain/entities/Order";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderRepository = new OrderRepository();
    const order = await orderRepository.findById(params.id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
