import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/Nav";
import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import VoucherList from "@/components/VoucherList";
import { fetchActiveVouchers, fetchVoucherUsePerUser } from "@/utils/ServerActions/voucher";

export default async function VouchersPage() {
	const initialVouchers = await fetchActiveVouchers();
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<Suspense>
			<Nav />
			<VoucherList initialVouchers={initialVouchers} fetchVoucherUsePerUser={fetchVoucherUsePerUser} fetchAllVouchers={fetchActiveVouchers} userId={user?.id || ''} />
			<BackButton />
		</Suspense>
	);
};
