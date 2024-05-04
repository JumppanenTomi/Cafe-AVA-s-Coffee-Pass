import getRole from "@/utils/getRole";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = await getRole();

  if (!user) {
    return redirect("/auth/login");
  }
  
  if (
    role !== "admin" &&
    role !== "barista" &&
    process.env.NEXT_PUBLIC_VERCEL_URL !== "http://localhost:3000"
  ) {
    console.log(role);
    return redirect("/client");
  }
  
  return <div className='flex flex-col flex-1 w-full'>{children}</div>;
}
