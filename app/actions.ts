"use server";

import { createClient } from "@/utils/supabase/server";

const supabase = createClient()

export async function collectedData() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const stampLogs = await supabase
  .from("stamp_logs")
  .select("timestamp")
  .eq("user_id", user?.id)

  const voucherLogs = await supabase
  .from("voucher_logs")
  .select("timestamp")
  .eq("user_id", user?.id)

  console.log("email:", user?.email, "userID:", user?.id, "stamp logs:", stampLogs, "voucher logs:", voucherLogs)
}