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


const Stamps = async () => {
    const activeStampCount = await getCurrentUserActiveStampCount() || 0;
    const stampsRequired = parseInt(process.env.STAMPS_REQUIRED || "0")

    return activeStampCount < stampsRequired ? (
        <div className={`white-container gap-2 grid grid-cols-5 row w-full place-items-center`} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
            {Array.from({length: activeStampCount}).map((_, index) => (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -6 24 24" width="30" fill="#000">
                    <path d="M0 0h17a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0zm16 4h1a1 1 0 0 0 0-2h-1v2z"></path>
                </svg>
            ))}
            {Array.from({length: (stampsRequired - activeStampCount)}).map((_, index) => (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -6 24 24" width="30" fill="#000">
                    <path
                        d="M2 4a6 6 0 1 0 12 0V2H2v2zm14-4h1a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0h16zm0 4h1a1 1 0 0 0 0-2h-1v2z"></path>
                </svg>
            ))}
        </div>
    ):(
        <div className={'white-container text-center row grid w-full'} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
            <h3>Congratulations!</h3>
            <p>You've filled your digital coffee pass. Enjoy a free cup of coffee on us. Simply show this message at the counter on your next visit to claim your well-deserved reward.</p>
            <br/>
            <p>Thank you for being a loyal customer, and keep brewing happiness with us!</p>
        </div>
    )
}

export default Stamps;