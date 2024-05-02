'use client'
import { faClock, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import formatDateToFinnish from "@/utils/formatDateToFinnish";
import VoucherQR from "../QrCodes/VoucherQR";
import { fetchAllVouchers } from "@/utils/ServerActions/voucher";

const VoucherListItem = ({ voucher }:
    {
        voucher: any
    }) => {
    const used = voucher.used
    const uses = voucher.voucher_type.uses_per_voucher
    const active = uses !== null && used >= uses
    const [showQrCode, setShowQrCode] = useState(false)

    const showQr = () => {
        if (!active) {
            setShowQrCode(!showQrCode)
        }
    }

    return (
        <>
            {showQrCode && <VoucherQR name={voucher.voucher_type.name}
                setShowQrCode={setShowQrCode}
                active={active}
                voucherId={voucher.id}
                used={used}
                redeemMessage={voucher.voucher_type.redeem_message}
            />}
            <div onClick={() => showQr()} className={`w-full ${(active) && "opacity-50"}`}>
                <div className={'white-container-no-p w-full flex-wrap mb- mb-4'}>
                    <div className={'bg-[url(/coffee.jpg)] bg-cover bg-top h-40 rounded-t-md'}></div>
                    <div className={'p-5 flex flex-wrap gap-5 justify-end'}>
                        <h2 className={'w-full'}>{voucher.voucher_type.name}</h2>
                        <p className={'w-full'}>{voucher.voucher_type.description}</p>
                        <p>Voucher used {used}/
                            {uses !== null ? uses : <FontAwesomeIcon icon={faInfinity} />} times</p>
                        <p>{formatDateToFinnish(voucher.end)} <FontAwesomeIcon icon={faClock} /></p>
                    </div>
                </div>
            </div>
        </>
    );
};

const VoucherList = ({ initialVouchers }: {
    initialVouchers: any,
    userId: string
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
                    table: 'all_vouchers',
                },
                (payload) => {
                    handleChange()
                })
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'voucher_type',
                },
                (payload) => {
                    handleChange()
                }
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'public_vouchers',
                },
                (payload) => {
                    handleChange()
                }
            ).on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'public_voucher_logs',
                },
                (payload) => {
                    handleChange()
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
                <VoucherListItem key={voucher.id} voucher={voucher} />
            )) : (
                <h1>No active vouchers.</h1>
            )}
        </div >
    );
}

export default VoucherList
