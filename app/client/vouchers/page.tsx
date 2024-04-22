import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/navigation/Nav";
import { Suspense } from "react";
import BackButton from "@/components/Inputs/buttons/BackButton";
import VoucherList from "@/components/lists/VoucherList";
import {
  fetchActiveVouchers,
  fetchVoucherUsePerUser,
} from "@/utils/ServerActions/voucher";
import FadeIn from "@/components/Animations/Render/FadeIn";

export default async function VouchersPage() {
  const initialVouchers = await fetchActiveVouchers();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <Suspense>
      <Nav />
      <FadeIn duration={1} className='w-full'>
        <VoucherList
          initialVouchers={initialVouchers}
          fetchVoucherUsePerUser={fetchVoucherUsePerUser}
          fetchAllVouchers={fetchActiveVouchers}
          userId={user?.id || ""}
        />
      </FadeIn>
      <BackButton />
    </Suspense>
  );
}
