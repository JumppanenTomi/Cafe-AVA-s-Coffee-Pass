import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function RootLayout({children,}: { children: React.ReactNode; }) {
	const supabase = createClient();
	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}
	return (
		<div className="flex-1 w-full flex flex-col items-center max-w-screen-sm p-5 gap-5">
			{children}
		</div>
	);
}
