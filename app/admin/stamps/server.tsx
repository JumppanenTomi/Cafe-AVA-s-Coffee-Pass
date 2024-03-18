"use server"
import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export interface Data {
  stamp_log_id: string;
  timestamp: string;
  user_id: string;
}

export const fetchStamps = cache(async (page: number, order: string, orderBy: string) => {
  const supabase = createClient(true);
  const { data, error } = await supabase.from('stamp_logs').select().range(page - 1, page + 49).order(orderBy, { ascending: order === 'asc' });
  if (error) throw error;
  return data;
});