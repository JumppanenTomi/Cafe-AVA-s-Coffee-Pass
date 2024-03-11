import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Nav from "@/components/Nav";
import QrCode from "@/components/QrCode";
import Stamps from "@/components/Stamps";
import {Statistics} from "@/components/Statistics";

export default async function ProtectedPage() {
	const supabase = createClient();

	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<div className="flex-1 w-full flex flex-col items-center">
			<Nav />
			<div className="flex flex-col items-center justify-center gap-5 flex-grow">
				<Statistics/>
				<div className={'flex flex-col items-center justify-center'}>
					<div className={'white-container z-50'}>
						<QrCode/>
					</div>
					<div className={'w-11/12'}>
						<Stamps/>
					</div>
				</div>
			</div>
		</div>
	);
}
