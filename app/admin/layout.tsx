import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  
  //TODO: make role checking here
  const supabase = createClient();
	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}
  return (
    <div className="flex flex-col flex-1 w-full">
      {children}
    </div>
  );
}