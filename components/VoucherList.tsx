'use client'
import { faClock, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import formatDateToFinnish from "./formatDateToFinnish";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const VoucherListItem = ({ voucher, fetchVoucherUsePerUser }:
    {
        voucher: any, fetchVoucherUsePerUser: (voucherId: number) => Promise<number | undefined>
    }) => {

    const [used, setUsed] = useState(0)
    const voucherId = voucher.voucher_id
    const uses = voucher.uses_per_user
    const active = uses !== null && used >= uses
    const supabase = createClient()

    const setVariables = async () => {
        setUsed(await fetchVoucherUsePerUser(voucherId) || 0)
    }

    useEffect(() => {
        setVariables()
    }, [])

    useEffect(() => {
        const subscription = supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'voucher_logs',
                    // filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    setVariables()
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return (
        <Link href={`/client/vouchers/${voucherId}`} className={`w-full ${(active) && "opacity-50"}`}>
            <div className={'white-container-no-p w-full flex-wrap mb- mb-4'}>
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

const VoucherList = ({ initialVouchers, fetchVoucherUsePerUser, fetchAllVouchers }: {
    initialVouchers: any,
    fetchVoucherUsePerUser: (voucherId: number) => Promise<number | undefined>,
    fetchAllVouchers: () => Promise<[]>
}) => {
    const [vouchers, setVouchers] = useState(initialVouchers)
    const supabase = createClient()


    useEffect(() => {
        const handleChange = async () => {
            try {
                const updatedVouchers = await fetchAllVouchers();
                setVouchers(updatedVouchers);
            } catch (error) {
                console.error('Error updating vouchers:', error); // Log if there's an error updating vouchers
            }
        };

        const subscription = supabase
            .channel('table-db-changes')
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'vouchers',
                },
                (payload) => {
                    handleChange(); // Call handleChange to update vouchers separately
                })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [vouchers, setVouchers, supabase])

    return (
        <div>
            {vouchers && vouchers.length > 0 ? vouchers.map((voucher: any) => (
                <VoucherListItem key={voucher.voucher_id} voucher={voucher} fetchVoucherUsePerUser={fetchVoucherUsePerUser} />
            )) : (
                <h1>No active vouchers.</h1>
            )}
        </div >
    );
}

export default VoucherList
