import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default async function ProtectedPage() {
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
			<div className={"flex gap-4"}>
				<Link href="/client/settings" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Settings</Link>
				<Link href="/client/vouchers" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Vouchers</Link>
			</div>
			<p>
				This is home page after login
			</p>
			<Footer/>
		</div>
	);
}
