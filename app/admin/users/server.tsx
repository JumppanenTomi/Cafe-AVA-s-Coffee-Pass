"use server"
import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export const fetchUsers = cache(async (page: number) => {
  const supabase = createClient(true);
  const { data, error } = await supabase.auth.admin.listUsers({
    page: page,
    perPage: 50
  })
  if (error) throw error;
  return data.users;
});