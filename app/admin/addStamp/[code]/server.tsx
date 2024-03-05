"use server"

import {createClient} from "@/utils/supabase/server";

const supabase = createClient();

export const fetchUserId = async (code: string) => {
	const {data: tempCodes, error: tempCodeError} = await supabase
		.from('temp_codes')
		.select('user_id')
		.eq('code', code)
		.eq('used', false)
		.limit(1);
	if (tempCodeError) return tempCodeError;
	if (tempCodes?.length > 0) return tempCodes[0].user_id;
};

export const markTempCodeAsUsed = async (code: string) => {
	const {data: markData, error: markError} = await supabase
		.from('temp_codes')
		.update({used: true})
		.eq('code', code)
		.select();
	if (markError) throw markError;
	return markData;
};

const addStampLog = async (userId: string) => {
	const {data: stampData, error: stampError} = await supabase
		.from('stamp_logs')
		.insert([{user_id: userId}])
		.select();
	if (stampError) throw stampError;
	return stampData;
};

export const processUserStamp = async (code: string, times: number): Promise<string | boolean> => {
	try {
		const userId = await fetchUserId(code);
		for (let i = 0; i < times; i++) {
			await addStampLog(userId);
		}
		return "virhe"
	} catch (error: any) {
		return error;
	}
};