import Link from "next/link";
import { notFound } from "next/navigation";
import { GetProductByIdUseCase } from "@/application/use-cases/GetProductByIdUseCase";
import { ProductRepository } from "@/infrastructure/repositories/ProductRepository";
import { ProductForm } from "../../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productRepository = new ProductRepository();
  const product = await new GetProductByIdUseCase(productRepository).execute(
    params.id
  );

  if (!product) notFound();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-slate-500 hover:text-slate-900"
        >
          ← Products
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Edit product</h1>
      </div>

      <div className="max-w-xl">
        <ProductForm
          productId={product.id}
          initial={{
            name: product.name,
            description: product.description,
            price: String(product.price),
            imageUrl: product.imageUrl || "",
            category: product.category || "",
            stock: String(product.stock),
          }}
        />
      </div>
    </div>
  );
}
