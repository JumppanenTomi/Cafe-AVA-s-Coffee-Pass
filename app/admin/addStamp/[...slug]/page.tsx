import { Form } from "@/components/Inputs/Form";
import NumberInput from "@/components/Inputs/NumberInput";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { redirect } from "next/navigation";
import Link from "next/link";
import { fetchUserIdFromTempCode, markTempCodeAsUsed } from "@/utils/ServerActions/tempCode";
import { addStampLog } from "@/utils/ServerActions/stamp";

export default async function Page({params}: { params: { slug: string[] } }) {
	const processUserStamp = async (formData: FormData) => {
		'use server'
		const code = params.slug[0]
		const times = parseInt(formData.get("number") as string)
		try {
			const userId = await fetchUserIdFromTempCode(code);
			for (let i = 0; i < times; i++) {
				await addStampLog(userId);
			}
			await markTempCodeAsUsed(code)
		} catch (error: any) {
			console.error(error);
			redirect("/admin/addStamp/" + code + "/Failed " + error.message);
		}
		redirect("/admin/success");
	};

	const id = await fetchUserIdFromTempCode(params.slug[0]);
	const message = params.slug[1] && params.slug[1].replaceAll("%20", " ");

	return (
		<div className="flex flex-col items-center justify-center flex-1 w-full gap-5 p-5">
			{(id) ? (
				<>
					<Form isError={true} error={message}>
						<NumberInput inputLabel={"How many stamps is given?"} min={1} max={10}/>
						<FormSubmitButton formAction={processUserStamp} pendingText={"loading..."}>
							Submit
						</FormSubmitButton>
					</Form>
				</>
			) : (
				<>
					<div className={'white-container flex items-center flex-col gap-5'}>
						<h1 className={'font-medium text-xl'}>Invalid code</h1>
						<p>Code is either expired or it doesnt exist.</p>
					</div>
					<Link href={'/admin'} className={'btn-primary'}>Back to admin panel</Link>
				</>
			)
			}
		</div>
	)
}