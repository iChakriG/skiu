import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/route-handler";
import { GetAllOrdersUseCase } from "@/application/use-cases/GetAllOrdersUseCase";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient(request);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
