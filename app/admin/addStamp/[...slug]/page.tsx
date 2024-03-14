import {Form} from "@/components/Inputs/Form";
import NumberInput from "@/components/Inputs/NumberInput";
import {FormSubmitButton} from "@/components/Inputs/FormSubmitButton";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function Page({params}: { params: { slug: string[] } }) {
	const fetchUserId = async (code: string) => {
		'use server'
		const supabase = createClient();
		const {data: tempCodes, error: tempCodeError} = await supabase
			.from('temp_codes')
			.select('user_id')
			.eq('code', code)
			.eq('used', false)
			.limit(1);
		if (tempCodeError) throw new Error(tempCodeError.toString());
		if (tempCodes?.length == 0) return null;
		if (tempCodes?.length > 0) return tempCodes[0].user_id;
		else throw new Error("Unknown error");
	};

	const markTempCodeAsUsed = async (code: string) => {
		'use server'
		const supabase = createClient();
		const {data: markData, error: markError} = await supabase
			.from('temp_codes')
			.update({used: true})
			.eq('code', code)
			.select();
		if (markError) throw new Error(markError.toString());
		return
	};

	const addStampLog = async (userId: string) => {
		'use server'
		const supabase = createClient();
		const {data: stampData, error: stampError} = await supabase
			.from('stamp_logs')
			.insert([{user_id: userId}])
			.select();
		if (stampError) throw new Error(stampError.toString());
		return
	};

	const processUserStamp = async (formData: FormData) => {
		'use server'
		const code = params.slug[0]
		const times = parseInt(formData.get("number") as string)
		try {
			const userId = await fetchUserId(code);
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

	const id = await fetchUserId(params.slug[0]);
	const message = params.slug[1] && params.slug[1].replaceAll("%20", " ");

	return (
		<div className="flex-1 w-full flex flex-col items-center justify-center gap-5 p-5">
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