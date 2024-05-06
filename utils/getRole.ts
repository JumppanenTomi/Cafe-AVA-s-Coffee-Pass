'use server'
import { createClient } from "@/utils/supabase/server";
import { jwtDecode } from "jwt-decode";

/**
 * Retrieves the role of the currently authenticated user.
 * @returns A Promise that resolves to a string representing the user's role, or null if the user is not authenticated.
 */
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