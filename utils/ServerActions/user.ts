"use server";
import { redirect } from "next/dist/client/components/navigation";
import { createClient } from "../supabase/server";
import { cache } from "react";

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

export const getUser = async () => {
  try {
    const supabase = createClient();
    const { 
      data: { user }, error
    } = await supabase.auth.getUser();

    if (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }

    return user;
  } catch (error: any) {
    console.error(error.message);
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
      "/auth/updateEmail?message=Failed to update email&isError=true"
    );
  }
  return redirect(
    "/auth/updateEmail?message=Please first verify the link sent to your old email, then proceed to confirm the change by clicking on the link sent to your new email.&isError=false"
  );
};
