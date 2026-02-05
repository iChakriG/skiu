import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/route-handler";
import { UpdateOrderStatusUseCase } from "@/application/use-cases/UpdateOrderStatusUseCase";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";
import { OrderStatus } from "@/domain/entities/Order";

const VALID_STATUSES: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
];

export async function PATCH(
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
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Valid status is required (pending, processing, shipped, delivered, cancelled)" },
        { status: 400 }
      );
    }

    const orderRepository = new OrderRepository();
    const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);
    const order = await updateOrderStatusUseCase.execute(params.id, status);

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}
