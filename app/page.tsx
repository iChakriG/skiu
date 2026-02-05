import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Skiu E-commerce
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your modern e-commerce platform
        </p>
        <p className="text-center">
          <Link
            href="/admin"
            className="text-slate-600 underline hover:text-slate-900"
          >
            Open admin →
          </Link>
        </p>
      </div>
    </main>
  );
}
