"use server"
import { redirect } from 'next/dist/client/components/navigation';
import { createClient } from "../supabase/server";

/**
 * Signs out the user.
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 */
export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

/**
 * Signs in a user with the provided form data.
 * @param formData - The form data containing the user's email.
 * @returns A Promise that resolves to a redirect URL indicating the result of the sign-in process.
 */
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
  } catch (error) {
    //TODO: Add logging
    return redirect(
      "/auth/login?isError=true&message=Could not authenticate user"
    );
  }
  return redirect(
    "/auth/login?isError=false&message=Check email to continue sign in process"
  );
};

export const authenticateWithGoodle = async () => {
  const supabase=createClient();
  let url
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `https://coffee-pass-sfug-git-feature-bre-b9ecd9-jumppanentomis-projects.vercel.app/auth/callback`,
      },
    });
    console.log(data)
    if (error) { throw new Error(error.message) }
    data && (url = data.url)
  } catch (error: any) {
    console.error(error.message);
    return redirect("/auth/login?isError=true&message=Could not authenticate user");
  }
  if (!url) { return redirect("/auth/login?isError=true&message=Could not authenticate user") }
  return redirect(url)
};

/**
 * Signs up a user with the provided form data.
 * @param formData - The form data containing the user's email.
 * @returns A Promise that resolves to a redirect URL indicating the result of the sign-up process.
 */
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
  } catch (error) {
    //TODO: Add logging
    return redirect(
      "/auth/register?isError=true&message=Could not authenticate user"
    );
  }
  return redirect(
    "/auth/register?isError=false&message=Check email to continue sign in process"
  );
};
