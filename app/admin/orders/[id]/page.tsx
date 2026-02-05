import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderRepository } from "@/infrastructure/repositories/OrderRepository";
import { OrderStatus } from "@/domain/entities/Order";
import { OrderStatusSelect } from "./OrderStatusSelect";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const orderRepository = new OrderRepository();
  const order = await orderRepository.findById(params.id);

  if (!order) notFound();

  const address = order.shippingAddress;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="text-slate-500 hover:text-slate-900"
        >
          ← Orders
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          Order {order.id.slice(0, 8)}…
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Details</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-slate-500">Order ID</dt>
              <dd className="font-mono text-slate-900">{order.id}</dd>
            </div>
            <div>
              <dt className="text-slate-500">User ID</dt>
              <dd className="font-mono text-slate-900">{order.userId}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Total</dt>
              <dd className="font-semibold text-slate-900">
                ${Number(order.total).toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Status</dt>
              <dd>
                <OrderStatusSelect
                  orderId={order.id}
                  currentStatus={order.status}
                />
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Created</dt>
              <dd className="text-slate-900">
                {new Date(order.createdAt).toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Updated</dt>
              <dd className="text-slate-900">
                {new Date(order.updatedAt).toLocaleString()}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Shipping address
          </h2>
          <address className="not-italic text-sm text-slate-700">
            {address.street}
            <br />
            {address.city}, {address.state} {address.zipCode}
            <br />
            {address.country}
          </address>
        </section>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Items</h2>
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="bg-slate-50 px-4 py-2 text-left text-xs font-medium uppercase text-slate-500">
                Product
              </th>
              <th className="bg-slate-50 px-4 py-2 text-right text-xs font-medium uppercase text-slate-500">
                Qty
              </th>
              <th className="bg-slate-50 px-4 py-2 text-right text-xs font-medium uppercase text-slate-500">
                Price
              </th>
              <th className="bg-slate-50 px-4 py-2 text-right text-xs font-medium uppercase text-slate-500">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {order.items.map((item, i) => (
              <tr key={i}>
                <td className="px-4 py-3 font-medium text-slate-900">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-right text-slate-600">
                  {item.quantity}
                </td>
                <td className="px-4 py-3 text-right text-slate-600">
                  ${Number(item.price).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right font-medium text-slate-900">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
