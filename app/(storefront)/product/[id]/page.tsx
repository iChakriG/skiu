import Link from "next/link";
import { notFound } from "next/navigation";
import { GetProductByIdUseCase } from "@/application/use-cases/GetProductByIdUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productRepository = new ProductRepository();
  const product = await new GetProductByIdUseCase(productRepository).execute(id);

  if (!product) notFound();

  return (
    <main className="min-h-[calc(100vh-3.5rem)] px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to products
        </Link>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:flex">
          <div className="relative aspect-square w-full bg-slate-100 md:max-w-md">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                No image
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
            {product.category && (
              <p className="mt-1 text-sm text-slate-500">{product.category}</p>
            )}
            <p className="mt-4 text-3xl font-semibold text-slate-900">
              ${Number(product.price).toFixed(2)}
            </p>
            {product.description && (
              <p className="mt-4 text-slate-600">{product.description}</p>
            )}
            <p className="mt-4 text-sm text-slate-500">
              Stock: {product.stock} available
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
