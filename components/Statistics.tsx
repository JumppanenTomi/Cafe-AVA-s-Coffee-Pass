import {createClient} from "@/utils/supabase/server";

const getAllStaps = async () => {
	'use server'
	const supabase = createClient()
	const user = await supabase.auth.getUser()
	const userId = user.data.user?.id
	const {count, error} = await supabase
		.from("stamp_logs")
		.select('*', {count: 'exact', head: true}) // exact, planned, or executed
		.eq("user_id", userId)

	if (error) console.log(error)
	return count
}

export async function Statistics() {
	const stamps = await getAllStaps()
	return (
		<div className={'white-container w-full flex flex-wrap justify-between text-center'}>
			<div>
				<h4><b>Days Visited</b></h4>
				<h4>--</h4>
			</div>
			<div>
				<h4><b>Total Stamps</b></h4>
				<h4>{stamps}</h4>
			</div>
		</div>
	)
}