import { createClient } from "../supabase/server";

export const getStampTimestamps = async () => {
  try {
    ("use server");
    const yearFirst = new Date();
    yearFirst.setUTCMonth(0);
    yearFirst.setUTCDate(1);

    const yearLast = new Date();
    yearLast.setUTCMonth(11);
    yearLast.setUTCDate(31);

    const yearFirstString = yearFirst.toISOString();
    const yearLastString = yearLast.toISOString();

    const supabase = createClient();
    const { data: stamps, error } = await supabase
      .from("stamp_logs")
      .select("timestamp")
      .lt("timestamp", yearLastString)
      .gt("timestamp", yearFirstString);
    if (error) throw error;
    return stamps;
  } catch (error: any) {
    //TODO: add error handling
    console.error(`Failed to get stamp timestamps: ${error.message}`);
    return [];
  }
};

export const getLoginsCount = async () => {
  try {
    ("use server");
    const yearFirst = new Date();
    yearFirst.setUTCMonth(0);
    yearFirst.setUTCDate(1);

    const yearLast = new Date();
    yearLast.setUTCMonth(11);
    yearLast.setUTCDate(31);

    const yearFirstString = yearFirst.toISOString();
    const yearLastString = yearLast.toISOString();

    const supabase = createClient();
    const { data: code, error } = await supabase
      .from("temp_codes")
      .select("created_at")
      .lt("created_at", yearLastString)
      .gt("created_at", yearFirstString);
    if (error) throw error;
    return code;
  } catch (error: any) {
    //TODO: add error handling
    console.error(`Failed to get logins count: ${error.message}`);
    return [];
  }
};
