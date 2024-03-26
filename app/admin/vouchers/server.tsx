"use server";
import { createClient } from "@/utils/supabase/server";

export interface Voucher {
  voucher_log_id: number;
  timestamp: string;
  user_id: string;
  voucher_id: string;
  vouchers: {
    name: string;
    description: string;
  };
}

export const fetchVouchers = async (
  query: string,
  sort: string,
  currentPage: number
) => {
  const supabase = createClient(true);
  const isAscending = sort[0] !== "-";
  let sortField = isAscending ? sort : sort.slice(1);
  if (sortField === 'vouchers.name') sortField = 'vouchers(name)';

  const { data, error } = await supabase
    .from("voucher_logs")
    .select(`*, vouchers!inner(name)`)
    .ilike('vouchers.name', `%${query}%`)
    .range((currentPage - 1) * 25, currentPage * 25 - 1)
    .order(sortField, { ascending: isAscending });

  if (error) throw error;
  return data;
};

export const fetchVouchersCount = async (query: string) => {
  const supabase = createClient(true);
  const { count, error } = await supabase
    .from("voucher_logs")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count ?? 0;
};

export const deleteVouchers = async (ids: number[]) => {
  const supabase = createClient(true);
  const { error } = await supabase
    .from("voucher_logs")
    .delete()
    .in("voucher_log_id", ids);

  if (error) throw error;
};
