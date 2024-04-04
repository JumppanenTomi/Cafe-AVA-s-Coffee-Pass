import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";
import Stamps from "./Stamps";
const LOGIN_ROUTE = '/auth/login';
const STAMP_LOGS_TABLE = 'stamp_logs';

const validateUser = async (supabase: SupabaseClient<any, "public", any>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return redirect(LOGIN_ROUTE);
    }
    return user;
}

const fetchUserStamps = async (supabase: SupabaseClient<any, "public", any>, userId: string) => {
    const { count, error } = await supabase
        .from(STAMP_LOGS_TABLE)
        .select('*', { count: 'exact', head: true }) // exact, planned, or executed
        .eq("user_id", userId)
        .eq("is_used", false);
    if (error) {
        //TODO: add better error handling
        console.log(error);
    }
    return count;
}

const getCurrentUserActiveStampCount = async () => {
    'use server'
    const supabase = createClient();
    const user = await validateUser(supabase);
    if (!user) {
        return;
    }
    const count = await fetchUserStamps(supabase, user.id);
    return count ? parseInt(String(count)) : undefined;
}

const StampCard = async () => {
    const activeStampCount = await getCurrentUserActiveStampCount() || 0;
    const stampsRequired = parseInt(process.env.STAMPS_REQUIRED || "0")
    const supabase = createClient();

    const userId = (await validateUser(supabase)).id
    return (
        <>
            <Stamps activeStampCount={activeStampCount}
                stampsRequired={stampsRequired}
                userId={userId}
                getCurrentUserActiveStampCount={getCurrentUserActiveStampCount} />
        </>
    )
}
export default StampCard;