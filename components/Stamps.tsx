'use client'
import { getCurrentUserActiveStampCount } from "@/app/client/actions";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const Stamps = () => {
    const supabase = createClient();
    const stampsRequired = parseInt(process.env.STAMPS_REQUIRED || "10") //hardcoded 10 for now
    const [activeStampCount, setActiveStampCount] = useState(0);
    const [userId, setUserId] = useState('')


    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            console.log(typeof (user?.id));
            setUserId(user?.id || '')
        }
        getUser()
    }, [])

    useEffect(() => {
        const fetchUserStampsCount = async () => {
            try {
                const stampCount = await getCurrentUserActiveStampCount();
                setActiveStampCount(stampCount || 0);
            } catch (error) {
                console.error("Error fetching active stamp count:", error);
            }
        };

        fetchUserStampsCount();
    }, [activeStampCount]);


    // update activeStampCount when database changes
    useEffect(() => {
        const handleChange = async () => {
            const stampCount = await getCurrentUserActiveStampCount();
            setActiveStampCount(stampCount || 0);
            console.log('boom');

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
                    console.log(payload);

                    handleChange()
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [userId]);

    return activeStampCount < stampsRequired ? (
        <div className={`white-container gap-2 grid grid-cols-5 row w-full place-items-center`} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            {Array.from({ length: activeStampCount }).map((_, index) => (
                <svg key={`activeStamp-${index}`} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -6 24 24" width="30" fill="#000">
                    <path d="M0 0h17a3 3 0 0 1 0 6h-1.252A8 8 0 0 1 0 4V0zm16 4h1a1 1 0 0 0 0-2h-1v2z"></path>
                </svg>
            ))}
            {Array.from({ length: (stampsRequired - activeStampCount) }).map((_, index) => (
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

export default Stamps;