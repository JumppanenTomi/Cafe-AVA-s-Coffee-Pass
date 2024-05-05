"use client";
import { useEffect, useState } from "react";
import { fetchUser } from "@/utils/ServerActions/user";
import { fetchUserIdFromTempCode } from "@/utils/ServerActions/tempCode";
import { fetchUserActiveStamps } from "@/utils/ServerActions/stamp";
import { supabaseTableSubscription } from "@/utils/ServerActions/subscriptions";
import AddVoucher from "../../vouchers/addVoucher";
import AddStamp from "../../stamps/addStamp";
import BulkRemoveStamps from "../../stamps/bulkRemoveStamps";
import { User } from "@supabase/supabase-js";
import formatDateToFinnish from "@/utils/formatDateToFinnish";

/**
 * Fetches and displays user and stamp data based on a provided slug.
 * @param {Object} params - The parameters passed to the component.
 * @param {string[]} params.slug - The slug used to fetch user and stamp data.
 * @returns {JSX.Element} A component that displays user and stamp data.
 */
export default function Page({ params }: { params: { slug: string[] } }) {
  const [userId, setUserId] = useState<string | null>();
  const [user, setUser] = useState<User | null>();
  const [stamps, setStamps] = useState<number | null>();

  useEffect(() => {
    fetchUserIdFromTempCode(params.slug[0]).then((data) => setUserId(data));
  }, [params.slug[0]]);

  useEffect(() => {
    if (!userId) return;
    fetchUser(userId).then((data) => setUser(data));
    fetchUserActiveStamps(userId).then((data) => setStamps(data));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const handleChange = async () => {
      const stampCount = await fetchUserActiveStamps(userId);
      setStamps(stampCount || 0);
    };

    supabaseTableSubscription(
      "stamp_logs",
      `user_id=eq.${userId}`,
      handleChange
    );
  }, [userId]);

  return (
    <div>
      <div className={"flex gap-5 flex-row"}>
        <AddStamp user_id={userId || undefined} />
        <AddVoucher user_id={userId || undefined} />
        <BulkRemoveStamps
          user_id={userId || undefined}
          currentAmount={stamps || undefined}
        />
      </div>
      {user ? (
        <ul>
          {user && (
            <ul>
              <li style={{ textTransform: "none" }}>Email: {user.email}</li>
              <li style={{ textTransform: "none" }}>ID: {user.id}</li>
              <li style={{ textTransform: "none" }}>
                Signed in With: {user.app_metadata.provider}
              </li>
              <li style={{ textTransform: "none" }}>
                created_at: {formatDateToFinnish(user.created_at)}
              </li>
            </ul>
          )}
        </ul>
      ) : user === undefined ? (
        <h2>Loading User Details</h2>
      ) : (
        <h2>Couldn't find user</h2>
      )}
      {stamps ? (
        <ul>
          <li>{stamps} stamps</li>
        </ul>
      ) : stamps === undefined ? (
        <h2>Loading Stamps...</h2>
      ) : (
        <p>Couldn't find amount of stamps for the user</p>
      )}
    </div>
  );
}
