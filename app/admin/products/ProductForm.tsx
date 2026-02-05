"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  stock: string;
};

const defaultValues: ProductFormData = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
  stock: "0",
};

export function ProductForm({
  productId,
  initial,
}: {
  productId?: string;
  initial?: Partial<ProductFormData>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);
  const [form, setForm] = useState<ProductFormData>({
    ...defaultValues,
    ...initial,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: form.price ? Number(form.price) : 0,
      imageUrl: form.imageUrl.trim() || undefined,
      category: form.category.trim() || undefined,
      stock: form.stock ? Number(form.stock) : 0,
    };

    if (!payload.name) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    try {
      const url = productId ? `/api/products/${productId}` : "/api/products";
      const method = productId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-slate-700">
            Price *
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <div>
          <label htmlFor="stock" className="mb-1 block text-sm font-medium text-slate-700">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="mb-1 block text-sm font-medium text-slate-700">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={(e) => {
            setForm((f) => ({ ...f, imageUrl: e.target.value }));
            setPreviewError(false);
          }}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
        {form.imageUrl.trim() ? (
          <>
            <p className="mt-1 text-xs text-slate-500">Preview:</p>
            <div className="mt-1 flex h-24 w-24 items-center justify-center overflow-hidden rounded border border-slate-200 bg-slate-50">
              {previewError ? (
                <span className="text-xs text-slate-400">Could not load</span>
              ) : (
                <img
                  src={form.imageUrl.trim()}
                  alt="Preview"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setPreviewError(true)}
                  onLoad={() => setPreviewError(false)}
                />
              )}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Saving…" : productId ? "Update product" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
