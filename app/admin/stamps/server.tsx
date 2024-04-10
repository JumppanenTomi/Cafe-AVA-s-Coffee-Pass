"use server"
import { createClient } from "@/utils/supabase/server";

export interface Data {
  stamp_log_id?: string;
  timestamp: string;
  user_id: string;
}

export const fetchStamps = async (query: string, sort: string, currentPage: number) => {
  const supabase = createClient(true);
  const isAscending = sort[0] !== "-";
  const sortField = isAscending ? sort : sort.slice(1);

  const { data, error } = await supabase
    .from('stamp_logs')
    .select()
    .range((currentPage - 1) * 25, currentPage * 25 - 1)
    .order(sortField, { ascending: isAscending });

  if (error) throw error;
  return data;
};

export const fetchStampsCount = async (query: string) => {
  const supabase = createClient(true);
  const { count, error } = await supabase
    .from('stamp_logs')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count ?? 0;
}

export const deactivateStamps = async(ids: number[]) => {
  const supabase = createClient(true);
  const { error } = await supabase
    .from('stamp_logs')
    .update({ is_used: true })
    .in('stamp_log_id', ids);

  if (error) throw error;
}

export const deleteStamps = async (ids: number[]) => {
  const supabase = createClient(true);
  const { error } = await supabase
    .from("stamp_logs")
    .delete()
    .in("stamp_log_id", ids);

  if (error) throw error;
};

export const createStamps = async (formData: FormData) => {
  const supabase = createClient(true);
  const rawFormData = {
    user_id: formData.get('user_id'),
  };

  const times = parseInt(formData.get('amount') as string) || 1;
  const { data, error } = await supabase
    .from("stamp_logs")
    .insert(Array(times).fill(rawFormData))
    .select();

  if (error) throw error;
  return data;
}

export const updateStamp = async (id: number, formData: FormData) => {
  const supabase = createClient(true);
  const rawFormData = {
    user_id: formData.get('user_id'),
    is_used: formData.get('is_used') === 'on' ? true : false,
  };
  const { error } = await supabase
    .from("stamp_logs")
    .update(rawFormData)
    .eq('stamp_log_id', id);

  if (error) throw error;
}