import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {FormSubmitButton} from "@/components/Inputs/FormSubmitButton";
import EmailInput from "@/components/Inputs/EmailInput";
import {Form} from "@/components/Inputs/Form";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Login({searchParams}: { searchParams: { isError: string, message: string }; }) {

	const signIn = async (formData: FormData) => {
		"use server";

		const email = formData.get("email") as string;
		const supabase = createClient();

		console.log("email", email, "formdata", formData)
		const { data, error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: false,
				// Add http://localhost:3000/auth/callback at the end of magiclink's redirect portion so that the route.ts can handle logging in the user.
				emailRedirectTo: "http://localhost:3000/auth/callback"
			  },
		});

		if (error) {
			console.log("error:", error)
			return redirect("/auth/login?isError=true&message=Could not authenticate user");
		}

		return redirect("/auth/login?isError=false&message=Check email to continue sign in process");
	};

	return (
		<div className="flex-1 w-full flex flex-col items-center">
			<div
				className="flex flex-col items-center justify-center gap-5 p-5 w-full flex-grow bg-[url('/coffee.jpg')] bg-cover bg-top">
				<Image src={logo} alt={"ava logo"} width={100}/>
			</div>
			<div className="flex flex-col items-center justify-center gap-5 py-16 w-full max-w-screen-sm p-5">
				<h1 className={'font-bold text-3xl'}>Login</h1>
				<p className={'text-center font-medium max-w-screen-sm'}>Once you have submitted your email, a sign-in link will be sent directly to your inbox. Using this link, you can securely access website.</p>
				<Form isError={searchParams.isError == "true"} error={searchParams.message}>
					<EmailInput/>
					<div className={"flex items-center w-full gap-4 mt-5"}>
						<Link href={"/"} className={'btn-secondary w-full'}>Back</Link>
						<FormSubmitButton
							formAction={signIn}
							pendingText="Signing In..."
						>
							Sign In
						</FormSubmitButton>
					</div>
				</Form>
			</div>
		</div>
	);
}
