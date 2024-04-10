"use server";
import { createClient } from "@/utils/supabase/server";
import { start } from "repl";

export const fetchVoucherTypes = async (
  query: string,
  sort: string,
  currentPage: number
) => {
  const supabase = createClient(true);
  const isAscending = sort[0] !== "-";
  let sortField = isAscending ? sort : sort.slice(1);

  const { data, error } = await supabase
    .from("vouchers")
    .select()
    .ilike('name', `%${query}%`)
    .range((currentPage - 1) * 25, currentPage * 25 - 1)
    .order(sortField, { ascending: isAscending });

  if (error) throw error;
  return data;
};

export const fetchVoucherTypesCount = async (query: string) => {
  const supabase = createClient(true);
  const { count, error } = await supabase
    .from("vouchers")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count ?? 0;
};

export const deleteVoucherTypes = async (ids: number[]) => {
  const supabase = createClient(true);
  const { error } = await supabase
    .from("vouchers")
    .delete()
    .in("voucher_id", ids);

  if (error) throw error;
};

export const createVoucherType = async (formData: FormData) => {
  const supabase = createClient(true);
  const rawFormData = {
    name: formData.get('name'),
    description: formData.get('description') || null,
    start_date: formData.get('start_date') || null,
    end_date: formData.get('end_date') || null,
    uses_per_user: formData.get('uses_per_user') || null,
    stamps_required: formData.get('stamps_required'),
  };

  const { data, error } = await supabase
    .from("vouchers")
    .insert([rawFormData])
    .select();

  if (error) throw error;
  return data;
}

export const updateVoucherType = async (id: number, formData: FormData) => {
  const supabase = createClient(true);
  const rawFormData = {
    name: formData.get('name'),
    description: formData.get('description') || null,
    start_date: formData.get('start_date') || null,
    end_date: formData.get('end_date') || null,
    uses_per_user: formData.get('uses_per_user') || null,
    stamps_required: formData.get('stamps_required'),
  };

  const { error } = await supabase
    .from("vouchers")
    .update(rawFormData)
    .eq('voucher_id', id);

  if (error) throw error;
}