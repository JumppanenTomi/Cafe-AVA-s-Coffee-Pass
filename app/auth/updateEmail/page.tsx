import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FormSubmitButton } from "@/components/Inputs/FormSubmitButton";
import Link from "next/link";
import { Form } from "@/components/Inputs/Form";
import EmailInput from "@/components/Inputs/EmailInput";

let errors = "";
export default function UpdateEmail({ searchParams, }: { searchParams: { message: string }; }) {
	const changeEmail = async (formData: FormData) => {
		"use server";

		const supabase = createClient();
		const newEmail = formData.get("email") as string;
		console.log("new Email", newEmail)

		const { data, error } = await supabase.auth.updateUser({
			email: newEmail
		})

		if (error) {
			console.log("error", error)
			errors = `${error}`
		} else {
			return redirect("/auth/updateEmail?message=Check email for confirmation");
		}
	};

	return (
		<div className="flex-1 w-full flex flex-col items-center">
			<Nav />
			<Form error={errors}>
				<div className="flex-1 flex flex-col items-center h-auto">
					<EmailInput />
					<FormSubmitButton
						formAction={changeEmail}
					>
						Confirm
					</FormSubmitButton>
				</div>
			</Form>
			<Link href="/client/settings" className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">Back</Link>
			<Footer />
		</div>
	);
}
