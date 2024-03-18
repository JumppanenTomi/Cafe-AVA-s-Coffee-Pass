import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";
import ToggleButton from "@/components/Inputs/ToggleButton";
import LinkButton from "@/components/Inputs/LinkButton";
import GetDataButton from "@/components/GetDataButton";

export default async function SettingsPage() {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<div className="flex flex-col items-start md:items-center md:justify-center">
			<div className="flex flex-col gap-3">
				<div>
					<LinkButton link="/auth/updateEmail" buttonText="Update Email address" />
					<p className="text-sm text-gray-500">Currently logged in as {user.email}</p>
				</div>
				<div className="flex flex-row">
					<p className="font-bold pr-2">Receive Emails</p>
					<ToggleButton />
				</div>
				<div className="w-full">
					<GetDataButton />
				</div>
				<div>
					<AuthButton />
				</div>
			</div>
		</div>
	);
}
