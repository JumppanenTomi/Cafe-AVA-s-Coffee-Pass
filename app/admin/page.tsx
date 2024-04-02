import {createClient} from "@/utils/supabase/server";
import React from "react";
import {Form} from "@/components/Inputs/Form";
import DateInput from "@/components/Inputs/DateInput";
import {FormSubmitButton} from "@/components/Inputs/FormSubmitButton";
import {LineChart} from "@/components/Charts/LineChart";

const getStampTimestamps = async () => {
	'use server'
	const yearFirst = new Date();
	yearFirst.setUTCMonth(0);
	yearFirst.setUTCDate(1);

	const yearLast = new Date()
	yearLast.setUTCMonth(11)
	yearLast.setUTCDate(31)

	const yearFirstString = yearFirst.toISOString();
	const yearLastString = yearLast.toISOString();

	const supabase = createClient()
	const {data: stamps, error} = await supabase
		.from("stamp_logs")
		.select("timestamp")
		.lt("timestamp", yearLastString)
		.gt("timestamp", yearFirstString)
	if (error) console.log(error)
	console.log(stamps)
	return stamps;
}

const getLoginsCount = async () => {
	'use server'
	const yearFirst = new Date();
	yearFirst.setUTCMonth(0);
	yearFirst.setUTCDate(1);

	const yearLast = new Date()
	yearLast.setUTCMonth(11)
	yearLast.setUTCDate(31)

	const yearFirstString = yearFirst.toISOString();
	const yearLastString = yearLast.toISOString();

	const supabase = createClient()
	const {data: code, error} = await supabase
		.from("temp_codes")
		.select("created_at")
		.lt("created_at", yearLastString)
		.gt("created_at", yearFirstString)
	if (error) console.log(error)
	console.log(code)
	return code;
}

export default async function Admin() {
	const timeStamps = await getStampTimestamps()
	const temps = await getLoginsCount()

	return (
		<div>
			<Form isError={false} error={""}>
				<DateInput/>
				<FormSubmitButton formAction={getLoginsCount} pendingText={"Loading..."}>
					Refresh
				</FormSubmitButton>
			</Form>
			<div className={'grid xl:grid-cols-2 gap-5'}>
				<div className={'white-container'}>
					<LineChart name={"Stamps Given Each Month"} dataset={timeStamps} dateCol={"timestamp"}/>
				</div>
				<div className={'white-container'}>
					<LineChart name={"Temp codes generated (user sessions)"} dataset={temps} dateCol={"created_at"}/>
				</div>
			</div>
		</div>
	)
}