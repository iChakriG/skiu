import Link from "next/link";
import { GetProductsUseCase } from "@/application/use-cases/GetProductsUseCase";
import { GetAllOrdersUseCase } from "@/application/use-cases/GetAllOrdersUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";
import { OrderStatus } from "@/domain/entities/Order";

export default async function AdminDashboardPage() {
  const productRepository = new ProductRepository();
  const orderRepository = new OrderRepository();
  const [products, orders] = await Promise.all([
    new GetProductsUseCase(productRepository).execute({}),
    new GetAllOrdersUseCase(orderRepository).execute(),
  ]);

  const pendingCount = orders.filter((o) => o.status === OrderStatus.PENDING).length;
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-slate-900">Dashboard</h1>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/products"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow"
        >
          <p className="text-sm font-medium text-slate-500">Total products</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">
            {products.length}
          </p>
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow"
        >
          <p className="text-sm font-medium text-slate-500">Total orders</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900">
            {orders.length}
          </p>
        </Link>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pending orders</p>
          <p className="mt-1 text-3xl font-semibold text-amber-600">
            {pendingCount}
          </p>
        </div>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            View all →
          </Link>
        </div>
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
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-slate-900 hover:underline"
                      >
                        {order.id.slice(0, 8)}…
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {order.userId.slice(0, 12)}…
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
      </section>
    </div>
  );
}
