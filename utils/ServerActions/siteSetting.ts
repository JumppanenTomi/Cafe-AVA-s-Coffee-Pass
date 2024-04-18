"use server";
import { createClient } from "../supabase/server";

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
