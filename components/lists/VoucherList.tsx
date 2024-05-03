'use client'
import { faClock, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import formatDateToFinnish from "@/utils/formatDateToFinnish";
import VoucherQR from "../QrCodes/VoucherQR";
import { fetchAllVouchers } from "@/utils/ServerActions/voucher";
import { getUserId } from "@/utils/ServerActions/user";
import { supabaseTableSubscription } from "@/utils/ServerActions/subscriptions";
import Popup from "@/components/UIOverlays/popup";

const VoucherListItem = ({ voucher }:
    {
        voucher: any
    }) => {
    const used = voucher.used
    const uses = voucher.voucher_type.uses_per_voucher
    const active = uses !== null && used >= uses
    const [showQrCode, setShowQrCode] = useState(false)
    const [userId, setUserId] = useState<any>()

    const showQr = () => {
        if (!active) {
            setShowQrCode(!showQrCode)
        }
    }

    useEffect(() => {
        const userId = async () => {
            const uid = await getUserId()
            setUserId(uid)
        };

        userId();
    }, [])


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
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [userId, setUserId] = useState<any>()
    const supabase = createClient()

    useEffect(() => {
        const userId = async () => {
            const uid = await getUserId()
            setUserId(uid)
        };

        userId();
    }, [])

    /*
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
    */

    useEffect(() => {
        const handleChange = async () => {
            try {
                const updatedVouchers = await fetchAllVouchers();
                setVouchers(updatedVouchers);
            } catch (error) {
                console.error('Error updating vouchers:', error); // Log if there's an error updating vouchers
            }
        };

        const showPopUp = () => {
            setIsPopupVisible(true);
            handleChange();
        };

        const publicVoucherLogsSubscriptions = async () => {
            await supabaseTableSubscription(
                "public_voucher_logs",
                `user_id=eq.${userId}`,
                handleChange,
                showPopUp,
                undefined,
                showPopUp
            );
        }

        publicVoucherLogsSubscriptions()
    }, [userId]);

    return (
        <div>
            {vouchers && vouchers.length > 0 ? vouchers.map((voucher: any) => (
                <div>
                    <VoucherListItem key={voucher.id} voucher={voucher} />
                    <Popup
                        visible={isPopupVisible}
                        onClose={() => setIsPopupVisible(false)}
                        closeAfter={5}
                    >
                        <div
                            className={
                                "text-center flex flex-col justify-center items-center gap-10"
                            }
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-28 h-28'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
                                />
                            </svg>
                            <h1>Voucher redeemed!</h1>
                        </div>
                    </Popup>
                </div>
            )) : (
                <h1>No active vouchers.</h1>
            )}
        </div >
    );
}

export default VoucherList
