"use server";
import { createClient } from "../supabase/server";
import { getUserId } from "./user";

/**
 * Adds a new temporary code to the database.
 * 
 * @param code - The code to be added.
 * @returns A promise that resolves to the inserted code data, or an error if the insertion fails.
 */
export const addNewTempCode = async (code: string) => {
  try {
    const supabase = createClient();
    const userId = await getUserId();

    if (!userId) {
      throw new Error("Failed to get user");
    }

    const { data: codeData, error } = await supabase
      .from("temp_codes")
      .insert([{ user_id: userId, code: code, used: false }]);

    if (error) {
      throw new Error(error.message);
    }

    return codeData;
  } catch (error: any) {
    //Todo: Add logging
    console.error(`Failed to insert new temp code: ${error.message}`);
    return error;
  }
};

/**
 * Fetches the user ID associated with a given temporary code.
 * @param code - The temporary code to fetch the user ID for.
 * @returns The user ID if found, or null if not found.
 * @throws If there is an error while fetching the user ID.
 */
export const fetchUserIdFromTempCode = async (code: string) => {
  try {
    const supabase = createClient();
    const { data: tempCodes, error } = await supabase
      .from("temp_codes")
      .select("user_id")
      .eq("code", code)
      .eq("used", false)
      .limit(1);

    if (error) {
      throw new Error(error.toString());
    }

    if (tempCodes?.length == 0) return null;
    if (tempCodes?.length > 0) return tempCodes[0].user_id;
    else throw new Error("Unknown error");
  } catch (error: any) {
    //Todo: Add logging
    console.error(`Failed to fetch user ID from temp code: ${error.message}`);
    return null;
  }
};

/**
 * Marks a temporary code as used in the database.
 * @param code - The temporary code to mark as used.
 * @returns A promise that resolves with an error if the operation fails, otherwise undefined.
 */
export const markTempCodeAsUsed = async (code: string) => {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("temp_codes")
      .update({ used: true })
      .eq("code", code);

    if (error) {
      throw new Error(error.toString());
    }
  } catch (error: any) {
    //Todo: Add logging
    console.error(`Failed to mark temp code as used: ${error.message}`);
    return error;
  }
};