'use client'
import { faClock, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import formatDateToFinnish from "./formatDateToFinnish";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

const VoucherListItem = ({ voucher, fetchVoucherUsePerUser }:
    {
        voucher: any, fetchVoucherUsePerUser:
        (voucherId: number) => Promise<number | undefined>
    }) => {

    const [used, setUsed] = useState(0)
    const voucherId = voucher.voucher_id
    const uses = voucher.uses_per_user
    const active = uses !== null && used >= uses

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
                    table: 'vouchers',
                    // filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    console.log(payload);
                    setVariables()
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [])

    // useEffect(() => {
    //     console.log(voucher);
    //     console.log(active);
    //     console.log(used)
    //     console.log(uses);
    //     console.log(voucherId);
    // })

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
const VoucherList = ({ initialVouchers, fetchVoucherUsePerUser }: {
    initialVouchers: any, fetchVoucherUsePerUser:
    (voucherId: number) => Promise<number | undefined>
}) => {
    const [vouchers, setVouchers] = useState(initialVouchers)

    useEffect(() => {
        //  setVouchers(initialVouchers)
    }, [])

    useEffect(() => {
        const subscription = supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'vouchers',
                    // filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    setVouchers([...vouchers, payload.new])
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    })

    console.log(vouchers);

    return (
        <div>
            {vouchers && vouchers.length > 0 ? vouchers.map((voucher: any) => (
                <VoucherListItem key={Math.floor(Math.random() * 1000)} voucher={voucher} fetchVoucherUsePerUser={fetchVoucherUsePerUser} />
            )) : (
                <h1>No active vouchers.</h1>
            )}
        </div >
    );
}

export default VoucherList
