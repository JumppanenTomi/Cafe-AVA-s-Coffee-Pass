import { redirect } from "next/dist/client/components/navigation";
import { createClient } from "../supabase/server";
import { cache } from "react";

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

    return redirect(
      "/auth/updateEmail?message=Check email for confirmation&isError=false"
    );
  } catch (error: any) {
    console.error(`Failed to update email: ${error.message}`);
    return error;
  }
};