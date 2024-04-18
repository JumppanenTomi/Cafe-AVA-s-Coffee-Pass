"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "@/utils/ServerActions/user";
import { fetchUserIdFromTempCode } from "@/utils/ServerActions/tempCode";
import { fetchUserActiveStamps } from "@/utils/ServerActions/stamp";
import AddVoucher from "../../vouchers/addVoucher";
import AddStamp from "../../stamps/addStamp";
import BulkRemoveStamps from "../../stamps/bulkRemoveStamps";

export default function Page({ params }: { params: { slug: string[] } }) {
  const [users, setUsers] = useState<any>();
  const [id, setId] = useState<any>();
  const [stamps, setStamps] = useState<any>();

  useEffect(() => {
    fetchUsers(1).then((data) => setUsers(data));
    fetchUserIdFromTempCode(params.slug[0]).then((data) => setId(data));
  }, [params.slug[0]]);

  useEffect(() => {
    if (id) {
      fetchUserActiveStamps(id).then((data) => setStamps(data));
    }
  }, [id]);

  const user = useMemo(() => {
    if (users && id) {
      return users.find((user: any) => user.id === id);
    }
  }, [users]);

  return stamps && id && users && user ? (
    <div className='flex flex-col items-center justify-center flex-1 w-full gap-5 p-5'>
      <div className={"flex gap-5 flex-col items-center md:flex-row"}>
        <AddStamp user_id={id} />
        <AddVoucher user_id={id} />
        <BulkRemoveStamps user_id={id} currentAmount={stamps} />
      </div>
      <h2>{user.email}</h2>
      <h2>User currently has {stamps} stamps</h2>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center flex-1 w-full gap-5 p-5'>
      <p>Loading...</p>
    </div>
  );
}
