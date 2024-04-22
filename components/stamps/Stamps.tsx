"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Popup from "@/components/UIOverlays/popup";
import { fetchCurrentUserActiveStampCount } from "@/utils/ServerActions/stamp";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import CoffeeCup from "../SVG/CoffeeCup";
import { GiftIcon } from "@heroicons/react/24/outline";

const Stamps = () => {
  const supabase = createClient();
  const [stampsRequired, setStampsRequired] = useState<undefined | number>(0);
  const [stampsCollectedMessage, setStampsCollectedMessage] = useState<
    undefined | string
  >("");

  useEffect(() => {
    const fetchStamps = async () => {
      const result = await fetchSiteSetting("stampsRequired");
      if (result?.value) {
        setStampsRequired(parseInt(result.value));
      }
    };
    const fetchCollectedMessage = async () => {
      const result = await fetchSiteSetting("stampsCollectedText");
      if (result?.value) {
        setStampsCollectedMessage(result.value);
      }
    };
    fetchStamps();
    fetchCollectedMessage();
  }, []);

  const [activeStampCount, setActiveStampCount] = useState(0);
  const [userId, setUserId] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id || "");
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchUserStampsCount = async () => {
      try {
        const stampCount = await fetchCurrentUserActiveStampCount();
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
      const stampCount = await fetchCurrentUserActiveStampCount();
      setActiveStampCount(stampCount || 0);
      setIsPopupVisible(true);
    };

    const subscription = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "stamp_logs",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          handleChange();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);

  return stampsRequired ? (
    <>
      {activeStampCount < stampsRequired ? (
        <div
          className={`white-container gap-2 grid grid-cols-5 row w-full place-items-center`}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          {Array.from({ length: activeStampCount }).map((_, index) => (
            <CoffeeCup
              key={`activeStamp-${index}`}
              filled={true}
              className='w-8 h-8'
            />
          ))}
          {Array.from({ length: stampsRequired - 1 - activeStampCount }).map(
            (_, index) => (
              <CoffeeCup
                key={`inactiveStamp-${index}`}
                filled={false}
                className='w-8 h-8'
              />
            )
          )}
          <GiftIcon className={"w-8 h-8"} />
        </div>
      ) : (
        <div
          className={
            "white-container text-center rounded-t-none row grid w-full"
          }
        >
          <h3 className={"text-xl"}>Congratulations!</h3>
          <p>
            {stampsCollectedMessage ||
              `You have collected ${activeStampCount} stamps!`}
          </p>
        </div>
      )}
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
          <h1>You received new stamp!</h1>
        </div>
      </Popup>
    </>
  ) : (
    <div className={"white-container"}>
      <p>Error while loading your stamps, contact staff if error continues</p>
    </div>
  );
};

export default Stamps;
