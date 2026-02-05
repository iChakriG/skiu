import Link from "next/link";
import Image from "next/image";
import { GetProductsUseCase } from "@/application/use-cases/GetProductsUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import { ProductDeleteButton } from "./ProductDeleteButton";

export default async function AdminProductsPage() {
  const productRepository = new ProductRepository();
  const products = await new GetProductsUseCase(productRepository).execute({});

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Add product
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Product
              </th>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Category
              </th>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Price
              </th>
              <th className="bg-slate-50 px-4 py-3 text-left text-xs font-medium uppercase text-slate-500">
                Stock
              </th>
              <th className="bg-slate-50 px-4 py-3 text-right text-xs font-medium uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                  No products.{" "}
                  <Link href="/admin/products/new" className="text-slate-900 underline">
                    Add one
                  </Link>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-slate-100">
                          <Image
                            src={product.imageUrl}
                            alt=""
                            width={40}
                            height={40}
                            className="object-cover"
                            unoptimized
                          />
                        </span>
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-slate-200 text-xs text-slate-500">
                          No img
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="font-medium text-slate-900 hover:underline"
                        >
                          {product.name}
                        </Link>
                        {product.description && (
                          <p className="max-w-xs truncate text-sm text-slate-500">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{product.category || "—"}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{product.stock}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                      >
                        Edit
                      </Link>
                      <ProductDeleteButton productId={product.id} productName={product.name} />
                    </div>
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
