"use server";
import { redirect } from "next/dist/client/components/navigation";
import { createClient } from "../supabase/server";
import { cache } from "react";
import { Pool } from "pg";
import QrCodeGen from "@/components/QrCodes/QrCodeGen";

// Create a database pool with one connection.
const pool = new Pool({
  ssl: { rejectUnauthorized: false },
  host: "aws-0-eu-central-1.pooler.supabase.com",
  database: "postgres",
  user: "postgres.dmbskonhidnlxxucgcak",
  port: 5432,
  password: "xBKW3Oy2Y5tIEhDH",
});

// Do no export this function, it is suposed to be used only in this file. this function is used to query the database. And if exposed to client componenents it might be used to query the database in a way that is not intended.
const sqlQuery = async (query: string) => {
  try {
    const connection = await pool.connect();

    try {
      const result = await connection.query(query);
      if (result.rows.length === 0) {
        throw new Error("No rows returned from the query.");
      }
      return result.rows;
    } finally {
      connection.release();
    }
  } catch (err: any) {
    console.error(err);
    return [];
  }
};

export const fetchUsers2 = async (
  query: string,
  sort: string,
  currentPage: number
) => {
  const isAscending = sort[0] !== "-";
  let sortField = isAscending ? sort : sort.slice(1);
  if (sortField === "role") sortField = "roles.role";

  return await sqlQuery(
    `
    SELECT users.*, roles.role FROM "auth"."users" users
    LEFT JOIN "public"."user_roles" roles ON users.id = roles.user_id
    WHERE users.email ILIKE '%${query}%' 
    ORDER BY ${sortField} ${isAscending ? "ASC" : "DESC"} LIMIT 25 OFFSET ${currentPage * 25 - 25}
    `
  );
};

export const fetchUsersCount = async (query: string) => {
  const res = await sqlQuery(
    `
    SELECT COUNT(*) FROM "auth"."users" users
    WHERE users.email ILIKE '%${query}%' 
    `
  );
  return parseInt(res[0].count) || 0;
};

/**
 * Retrieves the user ID from the Supabase authentication service.
 * @returns A Promise that resolves to a string representing the user ID, or null if there was an error.
 */
export const getUserId = async (): Promise<string | null> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }

    return data.user?.id;
  } catch (error: any) {
    console.error(`Failed to get user: ${error.message}`);
    return null;
  }
};

/**
 * Fetches users from the server.
 * 
 * @param page - The page number to fetch.
 * @returns An array of user objects.
 */
export const fetchUsers = cache(async (page: number) => {
  try {
    const supabase = createClient(true);
    const { data, error } = await supabase.auth.admin.listUsers({
      page: page,
      perPage: 50,
    });

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data.users;
  } catch (error: any) {
    console.error(`Failed to fetch users: ${error.message}`);
    return [];
  }
});

/**
 * Updates the user's email address.
 * 
 * @param formData - The form data containing the new email address.
 * @returns A redirect to the appropriate page based on the success or failure of the email update.
 */
export const changeEmail = async (formData: FormData) => {
  try {
    const supabase = createClient();
    const newEmail = formData.get("email") as string;
    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error(`Failed to update email: ${error.message}`);
    return redirect(
      "/client/settings/updateEmail?message=Failed to update email&isError=true"
    );
  }
  return redirect(
    "/client/settings/updateEmail?message=Please first verify the link sent to your old email, then proceed to confirm the change by clicking on the link sent to your new email.&isError=false"
  );
};
