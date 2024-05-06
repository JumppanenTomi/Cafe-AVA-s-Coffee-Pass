import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client instance.
 * @returns The Supabase client instance.
 */
export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
