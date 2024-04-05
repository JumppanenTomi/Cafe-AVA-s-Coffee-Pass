'use client'
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
interface StampsProps {
    activeStampCount: number;
    stampsRequired: number;
    userId: string;
    getCurrentUserActiveStampCount: () => Promise<number | undefined>;
}

const Stamps = ({ activeStampCount, stampsRequired, userId, getCurrentUserActiveStampCount }: StampsProps) => {
    const [stampCount, setStampCount] = useState(activeStampCount)
    const supabase = createClient()

    // update activeStampCount when database changes
    useEffect(() => {
        const handleChange = async () => {
            const stampCount = await getCurrentUserActiveStampCount();
            setStampCount(stampCount || 0);
        };

        const subscription = supabase
            .channel('table-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'stamp_logs',
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    handleChange()
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [getCurrentUserActiveStampCount, stampCount]);

    return stampCount < stampsRequired ? (
        <div className={`white-container gap-2 grid grid-cols-5 row w-full place-items-center`} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            {Array.from({ length: stampCount }).map((_, index) => (
                <svg key={`activeStamp-${index}`} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -6 24 24" width="30" fill="#000">
                    <path d="M0 0h17a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0zm16 4h1a1 1 0 0 0 0-2h-1v2z"></path>
                </svg>
            ))}
            {Array.from({ length: (stampsRequired - stampCount) }).map((_, index) => (
                <svg key={`activeStamp-${index}`} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -6 24 24" width="30" fill="#000">
                    <path
                        d="M2 4a6 6 0 1 0 12 0V2H2v2zm14-4h1a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0h16zm0 4h1a1 1 0 0 0 0-2h-1v2z"></path>
                </svg>
            ))}
        </div>
    ) : (
        <div className={'white-container text-center rounded-t-none row grid w-full'}>
            <h3 className={'text-xl'}>Congratulations!</h3>
            <p>You've filled your digital coffee pass. Enjoy a free cup of coffee on us. Simply show this message at the counter on your next visit to claim your well-deserved reward.</p>
            <br />
            <p>Thank you for being a loyal customer, and keep brewing happiness with us!</p>
        </div>
    )
}

export default Stamps