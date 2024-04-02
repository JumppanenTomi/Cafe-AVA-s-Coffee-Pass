"use server";

import { createClient } from "@/utils/supabase/server";

export async function collectedData() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const stampLogs = await supabase
    .from("stamp_logs")
    .select("timestamp, stamp_log_id")
    .eq("user_id", user?.id)

  const voucherLogs = await supabase
    .from("voucher_logs")
    .select("timestamp, voucher_log_id")
    .eq("user_id", user?.id)

  console.log("email:", user?.email, "userID:", user?.id, "stamp logs:", stampLogs, "voucher logs:", voucherLogs.data)

  return {
    email: user?.email ? user.email : "",
    userId: user?.id ? user.id : "",
    stampLogs: stampLogs.data?.[0] ? stampLogs.data : [{ timestamp: "", stamp_log_id: 0 }],
    voucherLogs: voucherLogs.data?.[0] ? voucherLogs.data : [{ timestamp: "", voucher_log_id: 0 }]
  };
}