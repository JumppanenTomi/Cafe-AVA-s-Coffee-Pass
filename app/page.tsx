import Image from "next/image";
import logo from "@/public/logo.png"
import AuthButton from "@/components/AuthButton";
import {redirect} from "next/navigation";
import getRole from "@/utils/getRole";

export default async function Index() {
	const userRole = await getRole()
	if (userRole === 'client' || userRole === null) {
		return redirect('/client')
	}
	if (userRole === 'owner' || userRole === 'barista') {
		return redirect('/admin')
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
