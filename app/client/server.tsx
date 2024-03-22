"use server"

import { createClient } from "@/utils/supabase/server";

const getUserId = async () => {
    const supabase = createClient();

    const user = await supabase.auth.getUser()
    const userId = user.data.user?.id
    return userId
}

export const addNewTempCode = async (code: string) => {
    const supabase = createClient();
    const userId = await getUserId()

    const { data: codeData, error: codeError } = await supabase
        .from('temp_codes')
        .insert([{ user_id: userId, code: code, used: false }])
    if (codeError) throw codeError

    return codeData
};