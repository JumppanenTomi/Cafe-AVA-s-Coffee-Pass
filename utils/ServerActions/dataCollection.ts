"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Retrieves collected data for a user.
 * @returns An object containing the user's email, user ID, stamp logs, voucher logs and full name from social login.
 * @throws an error if something went wrong while retrieving data
 */
export async function collectedData() {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Failed to get user for collected data");
    }

    let stampLogs, privateVoucherLogs, publicVoucherLogs;

    try {
      const { data, error } = await supabase
        .from("stamp_logs")
        .select("timestamp, stamp_log_id")
        .eq("user_id", user.id);
      if (error) throw error;
      stampLogs = data;
    } catch (error) {
      console.error("Error fetching stamp logs for collected data:", error);
      throw error;
    }

    try {
      const { data, error } = await supabase
        .from("all_vouchers")
        .select("created_at, id")
        .eq("user_id", user.id);
      if (error) throw error;
      privateVoucherLogs = data;
    } catch (error) {
      console.error("Error fetching voucher logs for collected data:", error);
      throw error;
    }

    try {
      const { data, error } = await supabase
        .from("public_voucher_logs")
        .select("created_at, id") 
        .eq("user_id", user.id)
      if (error) throw error;
      publicVoucherLogs = data;
    } catch (error) {
      console.error("Error fetching public voucher logs for collected data:", error)
      throw error;
    }

    return {
      email: user.email,
      userId: user.id,
      stampLogs: stampLogs?.[0]
        ? stampLogs
        : [{ timestamp: "", stamp_log_id: 0 }],
      privateVoucherLogs: privateVoucherLogs?.[0]
        ? privateVoucherLogs
        : [{ created_at: "", id: "" }],
        publicVoucherLogs: publicVoucherLogs?.[0]
        ? publicVoucherLogs
        : [{ created_at: "", id: 0 }],
      fullName: user.user_metadata.full_name ? user.user_metadata.full_name : ""
    };
  } catch (error) {
    console.error("Error in collectedData function:", error);
    return;
  }
}
