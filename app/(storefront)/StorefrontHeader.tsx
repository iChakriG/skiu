"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

export function StorefrontHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  const isAuthPage =
    pathname === "/login" || pathname === "/signup";
  const isStorefront = !pathname.startsWith("/admin");

  if (!isStorefront) return null;

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-semibold text-slate-900 transition hover:text-slate-600"
        >
          Skiu
        </Link>
        <nav className="flex items-center gap-4">
          {loading ? (
            <span className="text-sm text-slate-400">…</span>
          ) : user ? (
            <>
              <Link
                href="/account"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={async () => {
                  await signOut();
                  router.push("/");
                  router.refresh();
                }}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Sign out
              </button>
            </>
          ) : !isAuthPage ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                Sign up
              </Link>
            </>
          ) : null}
          <Link
            href="/admin"
            className="text-sm text-slate-400 hover:text-slate-600"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
