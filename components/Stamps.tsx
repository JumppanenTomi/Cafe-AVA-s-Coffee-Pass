import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {SupabaseClient} from "@supabase/supabase-js";

const LOGIN_ROUTE = '/auth/login';
const STAMP_LOGS_TABLE = 'stamp_logs';

const validateUser = async (supabase: SupabaseClient<any, "public", any>) => {
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        return redirect(LOGIN_ROUTE);
    }
    return user;
}

const fetchUserStamps = async (supabase: SupabaseClient<any, "public", any>, userId: string) => {
    const {count, error} = await supabase
        .from(STAMP_LOGS_TABLE)
        .select('*', {count: 'exact', head: true}) // exact, planned, or executed
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

//TODO: add fancy UI
const Stamps = async () => {
    const activeStampCount = await getCurrentUserActiveStampCount() || 0;
    const stampsRequired = parseInt(process.env.STAMPS_REQUIRED || "0")
    return (
        <div className={'bg-white gap-2 p-5 grid grid-cols-5 rounded-b-md shadow row'}>
            {Array.from({length: activeStampCount}).map((_, index) => (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                    <path fillRule="evenodd"
                          d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"/>
                </svg>
            ))}
            {Array.from({length: (stampsRequired - activeStampCount)}).map((_, index) => (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"/>
                </svg>
            ))}
        </div>
    );
}

export default Stamps;