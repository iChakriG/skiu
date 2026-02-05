import Link from "next/link";
import { ProductForm } from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-slate-500 hover:text-slate-900"
        >
          ← Products
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">New product</h1>
      </div>

      <div className="max-w-xl">
        <ProductForm />
      </div>
    </div>
  );
}
