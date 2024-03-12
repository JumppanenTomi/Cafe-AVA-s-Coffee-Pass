import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import ToggleButton from "@/components/Inputs/ToggleButton";

export default async function SettingsPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<div className="flex-1 w-full flex flex-col items-start">
			<Nav title="Settings" />
			<div className="w-full p-5 flex flex-col">
				<p>Currently logged in as {user.email}</p>
				<Link href="/auth/updateEmail" className="rounded-md no-underline bg-btn-background hover:bg-btn-background-hover font-bold">Update Email address</Link>
			</div>
			<div className="flex flex-row p-5 items-center">
				<p>Receive Emails</p>
				<ToggleButton />
			</div>
			<AuthButton />
		</div>
	);
}
