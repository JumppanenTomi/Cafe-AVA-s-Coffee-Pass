"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Retrieves collected data for a user.
 * @returns An object containing the user's email, user ID, stamp logs, and voucher logs.
 * @throws If there is an error retrieving the data.
 */
export async function collectedData() {
  try {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Failed to get user");
    }

    let stampLogs, voucherLogs;

    try {
      const { data, error } = await supabase
        .from("stamp_logs")
        .select("timestamp, stamp_log_id")
        .eq("user_id", user.id);
      if (error) throw error;
      stampLogs = data;
    } catch (error) {
      console.error("Error fetching stamp logs:", error);
      throw error;
    }

    try {
      const { data, error } = await supabase
        .from("voucher_logs")
        .select("timestamp, voucher_log_id")
        .eq("user_id", user.id);
      if (error) throw error;
      voucherLogs = data;
    } catch (error) {
      console.error("Error fetching voucher logs:", error);
      throw error;
    }

    return {
      email: user.email,
      userId: user.id,
      stampLogs: stampLogs?.[0]
        ? stampLogs
        : [{ timestamp: "", stamp_log_id: 0 }],
      voucherLogs: voucherLogs?.[0]
        ? voucherLogs
        : [{ timestamp: "", voucher_log_id: 0 }],
    };
  } catch (error) {
    console.error("Error in collectedData function:", error);
    return;
  }
}
