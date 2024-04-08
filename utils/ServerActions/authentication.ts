"use server";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL!}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return redirect(
      "/auth/login?isError=false&message=Check email to continue sign in process"
    );
  } catch (error) {
    //TODO: Add logging
    return redirect(
      "/auth/login?isError=true&message=Could not authenticate user"
    );
  }
};

export const signUp = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL!}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return redirect(
      "/auth/register?isError=false&message=Check email to continue sign in process"
    );
  } catch (error) {
    //TODO: Add logging
    return redirect(
      "/auth/register?isError=true&message=Could not authenticate user"
    );
  }
};
