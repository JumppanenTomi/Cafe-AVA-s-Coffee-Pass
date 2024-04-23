import { createClient } from "@/utils/supabase/client";

/**
 * Subscribes to changes in a specific table in the database.
 * @param table - The name of the table to subscribe to.
 * @param filter - The filter to apply to the subscription.
 * @param anyCase - A callback function to handle any event type, if not specified.
 * @param onInsert - A callback function to handle INSERT events.
 * @param onDelete - A callback function to handle DELETE events.
 * @param onUpdate - A callback function to handle UPDATE events.
 * @returns A function to unsubscribe from the subscription.
 */
export const supabaseTableSubscription=async (
  table: string,
  filter: string,
  anyCase?: (...args: any[]) => void,
  onInsert?: (...args: any[]) => void,
  onDelete?: (...args: any[]) => void,
  onUpdate?: (...args: any[]) => void
) => {
  const supabase = createClient();
  const subscription = supabase
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: table,
        filter: filter,
      },
      (payload) => {
        if (payload.eventType === "INSERT" && onInsert) {
          onInsert
        } else if (payload.eventType === "DELETE" && onDelete) {
          onDelete
        } else if (payload.eventType === "UPDATE" && onUpdate) {
          onUpdate
        } else {
          anyCase
        }
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};
