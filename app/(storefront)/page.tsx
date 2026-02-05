import Link from "next/link";
import { GetProductsUseCase } from "@/application/use-cases/GetProductsUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";

export const dynamic = "force-dynamic";

export default async function Home() {
  const productRepository = new ProductRepository();
  const products = await new GetProductsUseCase(productRepository).execute({});

  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Products</h1>
        <p className="mb-8 text-slate-600">
          {products.length === 0
            ? "No products yet."
            : `Browse all ${products.length} products.`}
        </p>

        {products.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            No products available. Sign in to see the latest when they’re added.
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="aspect-square bg-slate-100">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-slate-900 line-clamp-2">
                      {product.name}
                    </h2>
                    {product.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {product.description}
                      </p>
                    )}
                    <p className="mt-2 font-medium text-slate-900">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
