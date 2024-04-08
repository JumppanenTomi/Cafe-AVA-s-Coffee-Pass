"use server";
import { getFormattedDate } from "../getFormattedDate";
import { createClient } from "../supabase/server";
import { getUserId } from "./user";

export const fetchActiveVouchers = async () => {
  const supabase = createClient();
  const currentDate = getFormattedDate(new Date());

  try {
    const { data: vouchers, error } = await supabase
      .from("vouchers")
      .select("*")
      .filter("start_date", "lte", currentDate)
      .filter("end_date", "gte", currentDate);

    if (error) {
      throw new Error(error.message);
    }

    return vouchers;
  } catch (error: any) {
    console.error(`Failed to fetch active vouchers: ${error.message}`);
    return;
  }
};

export const fetchVoucherUsePerUser = async (voucherId: number) => {
  const supabase = createClient();
  const userId = await getUserId();

  try {
    if (!userId) {
      throw new Error("User not found");
    }
    const { count, error } = await supabase
      .from("voucher_logs")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", userId)
      .eq("voucher_id", voucherId);

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  } catch (error: any) {
    console.error(`Failed to fetch voucher use per user: ${error.message}`);
    return;
  }
};

export const fetchVouchers = async (
  query: string,
  sort: string,
  currentPage: number
) => {
  const supabase = createClient(true);
  const isAscending = sort[0] !== "-";
  let sortField = isAscending ? sort : sort.slice(1);
  if (sortField === "vouchers.name") sortField = "vouchers(name)";

  try {
    const { data, error } = await supabase
      .from("voucher_logs")
      .select(`*, vouchers!inner(name)`)
      .ilike("vouchers.name", `%${query}%`)
      .range((currentPage - 1) * 25, currentPage * 25 - 1)
      .order(sortField, { ascending: isAscending });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(`Failed to fetch vouchers: ${error.message}`);
    return;
  }
};

export const fetchVouchersCount = async (query: string) => {
  const supabase = createClient(true);

  try {
    const { count, error } = await supabase
      .from("voucher_logs")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw new Error(error.message);
    }

    return count ?? 0;
  } catch (error: any) {
    console.error(`Failed to fetch vouchers count: ${error.message}`);
    return;
  }
};

export const deleteVouchers = async (ids: number[]) => {
  const supabase = createClient(true);

  try {
    const { error } = await supabase
      .from("voucher_logs")
      .delete()
      .in("voucher_log_id", ids);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error(`Failed to delete vouchers: ${error.message}`);
  }
};

export const createVouchers = async (formData: FormData) => {
  const supabase = createClient(true);
  const rawFormData = {
    user_id: formData.get("user_id"),
    voucher_id: formData.get("voucher_id"),
  };

  try {
    const { data, error } = await supabase
      .from("voucher_logs")
      .insert([rawFormData])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(`Failed to create vouchers: ${error.message}`);
    return;
  }
};

export const fetchVoucherTypes = async (query: string) => {
  const supabase = createClient(true);

  try {
    const { data, error } = await supabase
      .from("vouchers")
      .select()
      .ilike("name", `%${query}%`)
      .range(0, 10);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    console.error(`Failed to fetch voucher types: ${error.message}`);
    return;
  }
};
