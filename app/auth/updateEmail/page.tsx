import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {SubmitButton} from "@/components/Inputs/submit-button";
import Link from "next/link";

export default function UpdateEmail({searchParams,}: { searchParams: { message: string }; }) {
	const changeEmail = async (formData: FormData) => {
		"use server";

		const supabase = createClient();
		const newEmail = formData.get("email") as string;
		console.log("new Email", newEmail)

		const {data, error} = await supabase.auth.updateUser({
			email: newEmail
		})

		if (error) {
			console.log("error", error)
			return redirect("/auth/updateEmail?message=Updating email address failed");
		}

		return redirect("/auth/updateEmail?message=Check email for confirmation");
	};

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<Nav />
			<form>
				<div className="flex-1 flex flex-col justify-center">
				<label className="text-md mb-2" htmlFor="email">
					Change email address
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					name="email"
					placeholder={"New email here"}
					required
				/>
				<SubmitButton
					formAction={changeEmail}
					className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
					pendingText="Sending confirmation"
				>
					Confirm
				</SubmitButton>
				{searchParams?.message && (
					<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
						{searchParams.message}
					</p>
				)}
				</div>
			</form>
			<Link href="/client/settings" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Back</Link>
			<Footer />
		</div>
	);
}
