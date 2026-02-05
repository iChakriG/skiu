import Link from "next/link";
import { GetAllOrdersUseCase } from "@/application/use-cases/GetAllOrdersUseCase";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";
import { OrderStatus } from "@/domain/entities/Order";

export default async function AdminOrdersPage() {
  const orderRepository = new OrderRepository();
  const orders = await new GetAllOrdersUseCase(orderRepository).execute();

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">Orders</h1>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Order
              </th>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                User
              </th>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Total
              </th>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Status
              </th>
              <th className="bg-slate-50 px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {order.id.slice(0, 8)}…
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-sm">
                    {order.userId.slice(0, 16)}…
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    ${Number(order.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === OrderStatus.DELIVERED
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === OrderStatus.CANCELLED
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
