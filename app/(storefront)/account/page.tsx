import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AccountSignOut } from "./AccountSignOut";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?returnTo=/account");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Account</h1>
        <dl className="space-y-3">
          <div>
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd className="text-slate-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Account created</dt>
            <dd className="text-slate-900">
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "—"}
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <AccountSignOut />
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
