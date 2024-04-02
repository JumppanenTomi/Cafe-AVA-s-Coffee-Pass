import {createClient} from "@/utils/supabase/server";
import Nav from "@/components/Nav";
import {faClock, faInfinity} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Suspense} from "react";
import Link from "next/link";
import formatDateToFinnish from "@/components/formatDateToFinnish";
import BackButton from "@/components/BackButton";

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
};

const VoucherListItem = async ({ voucher }: { voucher: any }) => {
	'use server'
	const voucherId = voucher.voucher_id;
	const uses = voucher.uses_per_user;
	const used = await fetchVoucherUsePerUser(voucherId);
	const active = uses !== null && used >= uses;

	return (
		<Link href={`/client/vouchers/${voucherId}`} className={`w-full ${(active) && "opacity-50"}`}>
			<div className={'white-container-no-p w-full flex-wrap'}>
				<div className={'bg-[url(/coffee.jpg)] bg-cover bg-top h-40 rounded-t-md'}></div>
				<div className={'p-5 flex flex-wrap gap-5 justify-end'}>
					<h2 className={'w-full'}>{voucher.name}</h2>
					<p className={'w-full'}>{voucher.description}</p>
					<p>Voucher used {used}/
						{uses !== null ? uses : <FontAwesomeIcon icon={faInfinity} />} times</p>
					<p>{formatDateToFinnish(voucher.end_date)} <FontAwesomeIcon icon={faClock} /></p>
				</div>
			</div>
		</Link>
	);
};

export default async function VouchersPage() {
	const vouchers = await fetchAllVouchers();
	return (
		<Suspense>
			<Nav/>
				{(vouchers && vouchers?.length > 0) ? vouchers?.map(voucher => (
					<VoucherListItem voucher={voucher} />
				)) : (
					<h1>No active vouchers.</h1>
				)}
			<BackButton/>
		</Suspense>
	);
};
