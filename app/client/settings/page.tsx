import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Nav from "@/components/Nav";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default async function SettingsPage() {
	const supabase = createClient();

	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<Nav/>
			<p>
				This is a protected page that you can only see as an authenticated
				user
			</p>
			<Link href="/auth/updateEmail" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Update Email</Link>
			<AuthButton/>
		</div>
	);
}
