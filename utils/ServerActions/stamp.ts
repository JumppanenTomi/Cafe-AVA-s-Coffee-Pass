"use server";
import { TablesUpdate } from "@/types/supabase";
import { createClient } from "../supabase/server";
import { getUserId } from "./user";

/**
 * Fetches all stamps for the current user.
 * @returns {Promise<number | Error>} The count of stamps or an error object.
 */
export const fetchAllStamps = async () => {
  try {
    const supabase = createClient();
    const userId = await getUserId();
    if (!userId) throw new Error("User ID not found");

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

/**
 * Fetches the count of all used stamps for the current user.
 * @returns {Promise<number | Error>} The count of used stamps, or an error if fetching fails.
 */
export const fetchAllUsedStaps = async () => {
  try {
    const supabase = createClient();
    const userId = await getUserId();
    if (!userId) throw new Error("User ID not found");
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

/**
 * Fetches the number of active stamps for a given user.
 * 
 * @param userId - The ID of the user.
 * @returns The number of active stamps for the user.
 */
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
    return 0;
  }
};

/**
 * Fetches the count of active stamps for the current user.
 * @returns {Promise<number>} A promise that resolves to the count of active stamps.
 */
export const fetchCurrentUserActiveStampCount = async () => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("User ID not found");
    return fetchUserActiveStamps(userId);
  } catch (error: any) {
    console.error("Error fetching current user active stamp count: ", error);
    return 0;
  }
};

/**
 * Retrieves the number of required stamps from the environment variable.
 * If the environment variable is not set or cannot be parsed as an integer, it returns a default value of 10.
 * @returns The number of required stamps.
 */
export const getRequiredStamps = () => {
  try {
    return parseInt(process.env.STAMPS_REQUIRED || "10");
  } catch (error: any) {
    console.error("Error getting required stamps: ", error);
    return error;
  }
};

/**
 * Adds a stamp log for the specified user.
 * @param userId - The ID of the user.
 * @returns A Promise that resolves with no value if the stamp log is added successfully,
 * or rejects with an error if there was an issue adding the stamp log.
 */
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

/**
 * Fetches stamps from the server based on the provided query, sort, and currentPage.
 *
 * @param query - The search query for filtering the stamps.
 * @param sort - The field to sort the stamps by. Prefix with "-" for descending order.
 * @param currentPage - The current page number for pagination.
 * @returns A Promise that resolves to the fetched stamps data or an error object.
 */
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

/**
 * Fetches the count of stamps from the "stamp_logs" table.
 * 
 * @param query - The query string.
 * @returns A promise that resolves to the count of stamps, or an error if fetching fails.
 */
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

/**
 * Deactivates stamps by updating the `is_used` field in the stamp_logs table.
 * @param ids - An array of stamp log IDs to deactivate.
 * @returns If an error occurs during deactivation, the error object is returned. Otherwise, undefined is returned.
 */
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

/**
 * Deletes stamps from the "stamp_logs" table based on the provided IDs.
 * @param ids - An array of numbers representing the IDs of the stamps to be deleted.
 * @returns If an error occurs during the deletion process, the error object is returned. Otherwise, undefined is returned.
 */
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

/**
 * Creates stamps based on the provided form data.
 * @param formData - The form data containing the necessary information to create stamps.
 * @returns A promise that resolves to the created stamps data or an error object.
 */
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

/**
 * Updates a stamp in the database.
 * @param {number} id - The id of the stamp to update.
 * @param {FormData} formData - The form data for the updated stamp.
 * @returns {Promise} A promise that resolves when the update is complete.
 * @throws Will throw an error if the update operation fails.
 */
export const updateStamp = async (id: number, formData: FormData) => {
  try {
    const supabase = createClient(true);
    const rawFormData: TablesUpdate<"stamp_logs"> = {
      user_id: formData.get('user_id') as string,
      is_used: formData.get('is_used') === 'on' ? true : false,
    };

    const { error } = await supabase
      .from("stamp_logs")
      .update(rawFormData)
      .eq('stamp_log_id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating stamp:', error);
    throw error;
  }
}