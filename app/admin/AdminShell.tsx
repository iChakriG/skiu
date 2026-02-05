"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogoutButton } from "./AdminLogoutButton";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 z-10 h-full w-56 border-r border-slate-200 bg-slate-900 text-white">
        <div className="flex h-14 items-center border-b border-slate-700 px-4">
          <Link href="/admin" className="font-semibold text-slate-100">
            Skiu Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          <Link
            href="/admin"
            className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Orders
          </Link>
          <div className="mt-4 border-t border-slate-700 pt-3">
            <AdminLogoutButton />
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-md px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          >
            ← Storefront
          </a>
        </nav>
      </aside>
      <main className="pl-56">{children}</main>
    </div>
  );
}
