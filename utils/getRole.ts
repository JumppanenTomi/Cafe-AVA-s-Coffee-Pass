'use server'
import {createClient} from "@/utils/supabase/server";
import {jwtDecode} from "jwt-decode";

export default async function getRole(): Promise<string | null>{
	const supabase = createClient();
	const session = await supabase.auth.getSession()
	const access_token = session.data.session?.access_token
	if (access_token) {
		const jwt: any = jwtDecode(access_token as string)
		console.log(jwt.user_role)
		return jwt.user_role as string
	} else return null
}