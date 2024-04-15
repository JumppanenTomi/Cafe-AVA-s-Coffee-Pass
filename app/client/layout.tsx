import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootLayout({children,}: { children: React.ReactNode; }) {
	const supabase = createClient();
	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center flex-1 w-full max-w-screen-sm gap-5 p-5">
			{children}
		</div>
	);
}
