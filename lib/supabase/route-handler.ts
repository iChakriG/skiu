import { createServerClient } from "@supabase/ssr";
import { type NextRequest } from "next/server";

/**
 * Create a Supabase client for use in Route Handlers (API routes).
 * Use this to get the current user from the request cookies.
 */
export async function createClient(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env vars");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      // Route Handlers can't set cookies on the response from here when only reading auth
      setAll() {},
    },
  });
}
