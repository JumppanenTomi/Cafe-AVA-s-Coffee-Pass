'use server'
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = (hasService: Boolean = false) => {
  const cookieStore = cookies();
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PRIVATE_SERVICE_ROLE_KEY } = process.env;

  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL!,
    hasService
      ? NEXT_PRIVATE_SERVICE_ROLE_KEY!
      : NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};