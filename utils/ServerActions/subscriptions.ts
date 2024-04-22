import { createClient } from "@/utils/supabase/client";

/**
 * Server side function that subscribes to every change in stamp_logs table.
 * @param userId - The ID of the user whose QR code was scanned.
 * @param handleChange - A function that fetches user's active stamps and save the stamp amount to a variable
 * @returns Unsubscribe from stamp_logs
 */
export const stampLogsSubscription = async (userId: number, handleChange: () => void) => {
  const supabase = createClient();
  const subscription = supabase
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "stamp_logs",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        handleChange();
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  }
}