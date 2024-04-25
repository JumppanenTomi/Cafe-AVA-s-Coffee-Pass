"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "@/utils/ServerActions/user";
import { fetchAllVouchers } from "@/utils/ServerActions/voucher";
import RedeemVoucher from "../../vouchers/redeemVoucher";

export default function Page({ params }: { params: { slug: string[] } }) {
  const [users, setUsers] = useState<any>();
  const [vouchers, setVouchers] = useState<any>();
  const [userId, setUserId] = useState<any>();
  const [voucherId, setVoucherId] = useState<any>();

  useEffect(() => {
    const getAndSet = async () => {
      setVoucherId(params.slug[0])
      setUserId(params.slug[1])
      await fetchUsers(1).then((data) => setUsers(data))
      await fetchAllVouchers().then((data) => setVouchers(data))
    }

    getAndSet();
  }, [params.slug[0], params.slug[1]])

  const user = useMemo(() => {
    if (users && userId) {
      return users.find((user: any) => user.id === userId);
    }
  }, [users])

  const voucher = useMemo(() => {
    if (vouchers && voucherId) {
      return vouchers.find((voucher: any) => voucher.id == voucherId);
    }
  }, [vouchers])

  return user && voucher ? (
    <div className='flex flex-col items-center justify-center flex-1 w-full gap-5 p-5'>
      <h2>{user.email}</h2>
      <h2>User has redeemed a {voucher.voucher_type.name} voucher</h2>
      <div className={"flex gap-5 flex-col items-center md:flex-row"}>
        <RedeemVoucher user_id={userId} voucher_id={voucherId} uses={voucher.used} max_uses={voucher.voucher_type ? voucher.voucher_type.uses_per_voucher : null}/>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center flex-1 w-full gap-5 p-5'>
      <p>Loading...</p>
    </div>
  );
}