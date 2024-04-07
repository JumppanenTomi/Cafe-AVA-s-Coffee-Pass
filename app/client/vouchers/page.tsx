import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/Nav";
import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import VoucherList from "@/components/VoucherList";

const getFormattedDate = (date: Date): string => {
	return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
};

const fetchAllVouchers = async () => {

	'use server'
	const supabase = createClient();
	const currentDate = getFormattedDate(new Date());
	const { data: vouchers, error } = await supabase
		.from("vouchers")
		.select("*")
		.filter('start_date', 'lte', currentDate)
		.filter('end_date', 'gte', currentDate);
	return vouchers;

};

const fetchVoucherUsePerUser = async (voucherId: number) => {
	'use server'
	const supabase = createClient();
	const user = await supabase.auth.getUser()
	const { count, error } = await supabase
		.from("voucher_logs")
		.select('*', { head: true, count: "exact" })
		.eq("user_id", user.data.user?.id)
		.eq("voucher_id", voucherId);
	return count ?? 0;
}


export default async function VouchersPage() {
	const initialVouchers = await fetchAllVouchers();
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<Suspense>
			<Nav />
			<VoucherList initialVouchers={initialVouchers} fetchVoucherUsePerUser={fetchVoucherUsePerUser} fetchAllVouchers={fetchAllVouchers} userId={user?.id || ''} />
			<BackButton />
		</Suspense>
	);
};
