import Nav from "@/components/Nav";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();
	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}
  return (
    <div className="flex-1 w-full flex flex-col">
      {children}
    </div>
  );
}