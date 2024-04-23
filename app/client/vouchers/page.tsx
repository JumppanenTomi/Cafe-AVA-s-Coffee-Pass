import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/Nav";
import { Suspense } from "react";
import BackButton from "@/components/BackButton";
import VoucherList from "@/components/lists/VoucherList";
import { fetchActiveVouchers, fetchAllVouchers, fetchVoucherUsePerUser } from "@/utils/ServerActions/voucher";

export default async function VouchersPage() {
	const initialVouchers = await fetchAllVouchers();
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<Suspense>
			<Nav />
			<VoucherList initialVouchers={initialVouchers} userId={user?.id || ''} />
			<BackButton />
		</Suspense>
	);
};
