"use server";
import { createClient } from "../supabase/server";

/**
 * Fetches the site setting with the specified key from the database.
 * @param key - The key of the site setting to fetch.
 * @returns The site setting object if found, or null if not found or an error occurred.
 */
export const fetchSiteSetting = async (key: string) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", key)
      .limit(1);
    if (error) throw new Error(error.message);
    return data[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Fetches all site settings from the database.
 * 
 * @returns {Promise<any[] | null>} A promise that resolves to an array of site settings or null if an error occurs.
 */
export const fetchAllSiteSettings = async () => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("site_settings").select("*").order("id");
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Updates a site setting in the database.
 * @param formData - The form data containing the key and value of the setting to be updated.
 * @returns The updated site setting data if successful, otherwise null.
 */
export const updateSiteSetting = async (formData: FormData) => {
  const key = formData.get("key") as string;
  const value = formData.get("settingInput") as string;
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .update({ value: value })
      .eq("key", key)
      .select();
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
