"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductDeleteButton({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
        setConfirming(false);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete");
      }
    } finally {
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Delete &quot;{productName}&quot;?</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          {loading ? "…" : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={loading}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          No
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-sm font-medium text-red-600 hover:text-red-700"
    >
      Delete
    </button>
  );
}
