import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12">
          <p className="text-slate-500">Loading…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
