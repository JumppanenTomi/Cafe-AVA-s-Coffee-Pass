import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import BackButton from "@/components/Inputs/buttons/BackButton";
import VoucherList from "@/components/lists/VoucherList";
import { fetchAllVouchers } from "@/utils/ServerActions/voucher";
import FadeIn from "@/components/Animations/Render/FadeIn";
import { getUserId } from "@/utils/ServerActions/user";

export default async function VouchersPage() {
  const initialVouchers = await fetchAllVouchers();
  const userId = await getUserId()
  return (
    <div className='flex flex-col flex-grow gap-5'>
      <Suspense fallback={"Loading..."}>
        <FadeIn duration={1} className='flex-grow w-full '>
          <VoucherList
            initialVouchers={initialVouchers}
            userId={userId || ""}
          />
        </FadeIn>
      </Suspense>
      <BackButton />
    </div>
  );
}
