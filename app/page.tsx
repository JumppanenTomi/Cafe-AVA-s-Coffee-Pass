import Image from "next/image";
import logo from "@/public/logo.png"
import AuthButton from "@/components/AuthButton";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {jwtDecode} from 'jwt-decode'

export default async function Index() {
	const supabase = createClient();
	const session = await supabase.auth.getSession()
	const access_token = session.data.session?.access_token
	if (access_token) {
		const jwt = jwtDecode(access_token as string)
		const user_role = jwt.user_role // owner, barista, client or null

		console.log(user_role);

		// TODO: simplify logic
		if (user_role === 'client' || user_role === null) {
		return redirect('/client')
		}
		if (user_role === 'owner' || user_role === 'barista') {
			return redirect('/admin')
		}
	}


	return (
		<div className="flex-1 w-full flex flex-col items-center">
			<div className="flex flex-col items-center justify-center gap-5 p-5 w-full flex-grow bg-[url('/coffee.jpg')] bg-cover bg-top">
				<Image src={logo} alt={"ava logo"} width={100} />
			</div>
			<div className="flex flex-col items-center justify-center gap-5 py-16 w-full max-w-screen-sm p-5">
				<h1 className={'font-bold text-3xl'}>Welcome!</h1>
				<p className={'text-center font-medium max-w-screen-sm'}>Welcome to our Digital Coffee Pass! Start your digital coffee journey with us today!</p>
				<AuthButton />
			</div>
		</div>
	);
}
