import Nav from "@/components/navigation/Nav";
import { Suspense } from "react";
import BackButton from "@/components/Inputs/buttons/BackButton";
import VoucherList from "@/components/lists/VoucherList";
import { fetchActiveVouchers, fetchVoucherUsePerUser } from "@/utils/ServerActions/voucher";
import { getUserId } from "@/utils/ServerActions/user";

export default async function VouchersPage() {
	const initialVouchers = await fetchActiveVouchers();
	const uid = await getUserId()
	return (
		<Suspense>
			<Nav />
			<VoucherList initialVouchers={initialVouchers} fetchVoucherUsePerUser={fetchVoucherUsePerUser} fetchAllVouchers={fetchActiveVouchers} userId={uid || ''} />
			<BackButton />
		</Suspense>
	);
};
