"use server";
import { createClient } from "../supabase/server";
import { getUserId } from "./user";

export const fetchAllStamps = async () => {
  try {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const userId = getUserId();
    const { count, error } = await supabase
      .from("stamp_logs")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", userId);

    if (error) throw error;
    return count;
  } catch (error: any) {
    console.error("Error fetching all stamps: ", error);
    return error;
  }
};

export const fetchAllUsedStaps = async () => {
  try {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const userId = getUserId();
    const { count, error } = await supabase
      .from("stamp_logs")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", userId)
      .eq("is_used", true);

    if (error) throw error;
    return count;
  } catch (error: any) {
    console.error("Error fetching all used stamps: ", error);
    return error;
  }
};

export const fetchUserActiveStamps = async (userId: string) => {
  try {
    const supabase = createClient();
    const { count, error } = await supabase
      .from("stamp_logs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_used", false);

    if (error) throw error;
    return count;
  } catch (error: any) {
    console.error(`Failed to fetch user active stamps: ${error.message}`);
    return error;
  }
};

export const getRequiredStamps = () => {
  try {
    return parseInt(process.env.STAMPS_REQUIRED || "10");
  } catch (error: any) {
    console.error("Error getting required stamps: ", error);
    return error;
  }
};

export const addStampLog = async (userId: string) => {
  try {
    const supabase = createClient();
    const { data: stampData, error: stampError } = await supabase
      .from("stamp_logs")
      .insert([{ user_id: userId }])
      .select();
    if (stampError) throw stampError;
    return;
  } catch (error: any) {
    console.error("Error adding stamp log: ", error);
    return error;
  }
};

export const fetchStamps = async (
  query: string,
  sort: string,
  currentPage: number
) => {
  try {
    const supabase = createClient(true);
    const isAscending = sort[0] !== "-";
    const sortField = isAscending ? sort : sort.slice(1);

    const { data, error } = await supabase
      .from("stamp_logs")
      .select()
      .range((currentPage - 1) * 25, currentPage * 25 - 1)
      .order(sortField, { ascending: isAscending });

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error fetching stamps: ", error);
    return error;
  }
};

export const fetchStampsCount = async (query: string) => {
  try {
    const supabase = createClient(true);
    const { count, error } = await supabase
      .from("stamp_logs")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count ?? 0;
  } catch (error: any) {
    console.error("Error fetching stamps count: ", error);
    return error;
  }
};

export const deactivateStamps = async (ids: number[]) => {
  try {
    const supabase = createClient(true);
    const { error } = await supabase
      .from("stamp_logs")
      .update({ is_used: true })
      .in("stamp_log_id", ids);

    if (error) throw error;
  } catch (error: any) {
    console.error("Error deactivating stamps: ", error);
    return error;
  }
};

export const deleteStamps = async (ids: number[]) => {
  try {
    const supabase = createClient(true);
    const { error } = await supabase
      .from("stamp_logs")
      .delete()
      .in("stamp_log_id", ids);

    if (error) throw error;
  } catch (error: any) {
    console.error("Error deleting stamps: ", error);
    return error;
  }
};

export const createStamps = async (formData: FormData) => {
  try {
    const supabase = createClient(true);
    const rawFormData = {
      user_id: formData.get("user_id"),
    };

    const times = parseInt(formData.get("amount") as string) || 1;
    const { data, error } = await supabase
      .from("stamp_logs")
      .insert(Array(times).fill(rawFormData))
      .select();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error("Error creating stamps: ", error);
    return error;
  }
};
