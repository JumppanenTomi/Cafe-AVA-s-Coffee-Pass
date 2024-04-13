import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/ServerActions/user";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  
  //TODO: make role checking here
  const user = await getUser()

	if (!user) {
		return redirect("/auth/login");
	}
  return (
    <div className="flex flex-col flex-1 w-full">
      {children}
    </div>
  );
}