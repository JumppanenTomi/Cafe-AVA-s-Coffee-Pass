'use client'
import { faClock, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import VoucherUses from "@/types/VoucherUses";
import formatDateToFinnish from "@/utils/formatDateToFinnish";
import VoucherQR from "./VoucherQR";

const VoucherListItem = ({ voucher, used }:
    {
        voucher: any, used: number
    }) => {

    const voucherId = voucher.voucher_id
    const uses = voucher.uses_per_user
    const active = uses !== null && used >= uses
    const [showQrCode, setShowQrCode] = useState(false)
    const showQr = () => {
        console.log('boom');
        setShowQrCode(true)
    }
    return (
        <>
            {showQrCode && <VoucherQR />}

            <div onClick={() => showQr()} className={`w-full ${(active) && "opacity-50"}`}>
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
            </div>
        </>
    );
};

const VoucherList = ({ initialVouchers, fetchVoucherUsePerUser, fetchAllVouchers, userId }: {
    initialVouchers: any,
    fetchVoucherUsePerUser: (voucherId: number) => Promise<number | undefined>,
    fetchAllVouchers: () => Promise<any[] | undefined>,
    userId: string
}) => {
    const [vouchers, setVouchers] = useState(initialVouchers)
    const supabase = createClient()
    const [used, setUsed] = useState<VoucherUses[]>([])

    const fetchUses = async () => {
        // Map over vouchers array and fetch uses for each voucher
        const updatedUsed = await Promise.all(
            vouchers.map(async (voucher: { voucher_id: number; }) => {
                const usePerVoucher = await fetchVoucherUsePerUser(voucher.voucher_id);
                // Return an object containing voucher_id and fetched uses
                return { voucher_id: voucher.voucher_id, uses: usePerVoucher };
            })
        );
        // Update the state with the new array containing voucher_id and fetched uses
        setUsed(updatedUsed);
    };
    const getUsedforVoucher = (voucherId: number) => {
        return used.find(entry => entry.voucher_id === voucherId)?.uses || 0
    }

    useEffect(() => {
        fetchUses();
    }, []);

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
                    handleChange()
                })
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'voucher_logs',
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    fetchUses()
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [vouchers, setVouchers, supabase])

    return (
        <div>
            {vouchers && vouchers.length > 0 ? vouchers.map((voucher: any) => (
                <VoucherListItem key={voucher.voucher_id} voucher={voucher} used={getUsedforVoucher(voucher.voucher_id)} />
            )) : (
                <h1>No active vouchers.</h1>
            )}
        </div >
    );
}

export default VoucherList
