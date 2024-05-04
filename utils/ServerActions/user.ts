"use server";;
import { redirect } from "next/dist/client/components/navigation";
import { createClient } from "../supabase/server";
import { cache } from "react";
import { User } from "@supabase/supabase-js";


/**
 * Changes the role of a user.
 * @param id - The ID of the user.
 * @param formData - The form data containing the new role.
 * @returns A Promise that resolves when the role is successfully changed.
 * @throws If there is an error updating the user's role.
 */
export const changeRole = async (id: string, formData: FormData) => {
  try {
    const supabase=createClient();
    const role = (formData.get('role') as string).toLowerCase();
    if (!role) return

    const { data, error } = await supabase
      .from("user_roles")
      .update({role: role as "owner" | "barista" | "client" | undefined})
      .eq("user_id", id)
      .select();

    if (error) {
      throw new Error(`Failed to update user_roles ${error.message}`)
    }
  } catch (error) {
    console.error('Error changing role:', error);
    throw error;
  }
}

/**
 * Retrieves the user ID from the Supabase authentication service.
 * @returns A Promise that resolves to a string representing the user ID, or null if there was an error.
 */
export const getUserId=async (): Promise<string|null> => {
  try {
    const supabase=createClient();
    const { data, error }=await supabase.auth.getUser();

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
 * Fetches users in pages from the server.
 * @param currentPage - The current page number.
 * @param perPage - The number of users per page.
 * @param sort - The field to sort the users by.
 * @returns An object containing the sorted users and the total count of users.
 */
export const fetchUsersInPages=async (
  currentPage: number,
  perPage: number,
  sort: string
) => {
  const isAscending = sort[0] !== "-";
  let sortField = isAscending ? sort : sort.slice(1);
  if (sortField === "role") sortField = "roles.role";
  try {
    const supabase=createClient(true);
    const { data, error }=await supabase.auth.admin.listUsers({
      page: currentPage,
      perPage: perPage,
    });

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    let sortedData: User[];
    if (isAscending) {
      sortedData=data.users.sort((a: any, b: any) => {
        if (a[sortField]<b[sortField]) return -1;
        if (a[sortField]>b[sortField]) return 1;
        return 0;
      });
    } else {
      sortedData=data.users.sort((a: any, b: any) => {
        if (a[sortField]<b[sortField]) return 1;
        if (a[sortField]>b[sortField]) return -1;
        return 0;
      });
    }

    sortedData=await Promise.all(
      sortedData.map(async (user: User) => {
        user.role=await getRole(user.id);
        return user;
      })
    );

    return {
      users: sortedData,
      count: data.total,
    };
  } catch (error: any) {
    console.error(`Failed to fetch users: ${error.message}`);
    return {
      users: [],
      count: 0,
    };
  }
};

/**
 * Finds users based on the provided sort and query parameters.
 * @param sort - The sort parameter to determine the sorting order of the users.
 * @param query - The query parameter to filter the users based on email.
 * @returns An object containing the sorted users and the count of users.
 */
export const findUser=async (sort: string, query: string) => {
  const isAscending=sort[0]!=="-";
  let sortField=isAscending? sort:sort.slice(1);
  if (sortField==="role") sortField="roles.role";
  try {
    const supabase=createClient(true);
    const { data, error }=await supabase.auth.admin.listUsers();

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    let sortedData: User[];
    sortedData=data.users.filter((user: any) => {
      return user.email.includes(query);
    });

    if (isAscending) {
      sortedData=sortedData.sort((a: any, b: any) => {
        if (a[sortField]<b[sortField]) return -1;
        if (a[sortField]>b[sortField]) return 1;
        return 0;
      });
    } else {
      sortedData=sortedData.sort((a: any, b: any) => {
        if (a[sortField]<b[sortField]) return 1;
        if (a[sortField]>b[sortField]) return -1;
        return 0;
      });
    }

    return {
      users: sortedData,
      count: sortedData.length,
    };
  } catch (error: any) {
    console.error(`Failed to fetch users: ${error.message}`);
    return {
      users: [],
      count: 0,
    };
  }
};

/**
 * Retrieves the role of a user based on their ID.
 * @param id - The ID of the user.
 * @returns A Promise that resolves to the role of the user, or "client" if the role is not found.
 */
export const getRole=async (id: string) => {
  try {
    const supabase=createClient();
    const { data, error }=await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", id)
      .single();

    if (error) {
      throw new Error(`Failed to get role: ${error.message}`);
    }
    return data? data.role:"client";
  } catch (error: any) {
    return "couldn't get role";
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

    return data.users as User[];
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
