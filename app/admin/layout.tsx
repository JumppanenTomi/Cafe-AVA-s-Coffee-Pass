import getRole from "@/utils/getRole";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Provides an admin layout for the application.
 * @param {React.ReactNode} children - The child components to be rendered within the admin layout.
 * @returns {JSX.Element} A component that provides an admin layout if the user is authenticated and has the correct role, otherwise redirects to the appropriate page.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  //get the current user and if not found redirect to the login page
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = await getRole();

  if (!user) {
    return redirect("/auth/login");
  }

  //if the user is not an owner or barista, redirect to the client page
  if (
    role !== "owner" &&
    role !== "barista" &&
    process.env.NEXT_PUBLIC_VERCEL_URL !== "http://localhost:3000"
  ) {
    console.log(role);
    return redirect("/client");
  }

  return <div className='flex flex-col flex-1 w-full'>{children}</div>;
}
