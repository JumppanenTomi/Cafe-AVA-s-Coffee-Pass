import { useRouter } from "next/navigation";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import { Form } from "@/components/Inputs/Form";
import NumberInput from "@/components/Inputs/NumberInput";
import AdminAddButton from "@/components/Inputs/buttons/AdminAddButton";
import AdminAddModalButton from "@/components/Inputs/buttons/AdminAddModalButton";
import { Voucher, User, UpdatedVouchers } from "./interface";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "@/utils/ServerActions/user";
import { fetchAllVouchers, getAllPublicVoucherLogs, updatePublicVoucherLogs } from "@/utils/ServerActions/voucher";

export default function RedeemVoucher(props: { user_id: string, voucher_id: string, uses: number, max_uses: number | null }) {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [vouchers, setVouchers] = useState<UpdatedVouchers[]>([]);
  const [pvLogs, setpvLogs] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchUsers(1);
      setUsers(
        response.map((user) => ({
          id: user.id || "",
          email: user.email || "",
        }))
      );
    };

    const getVouchers = async () => {
      const response = await fetchAllVouchers();
      if (response) {
        setVouchers(
          response.map((voucher) => ({
            id: voucher.id || null,
            used: voucher.used ? voucher.used : null,
            active: voucher.active ? voucher.active : null,
            name: voucher.voucher_type ? voucher.voucher_type.name : "",
            uses_per_voucher: voucher.voucher_type ? voucher.voucher_type.uses_per_voucher : null
          }))
        );
      }
    };

    const getpvLogs = async () => {
      const response = await getAllPublicVoucherLogs();
      setpvLogs(response)
    };

    getUsers();
    getVouchers();
    getpvLogs();
  }, []);

  const publicVoucherLog = useMemo(() => {
    if (pvLogs && props.user_id && props.voucher_id && props.uses) {
      return pvLogs.find((log: any) => {
        if (
          (log.public_voucher_id == props.voucher_id) &&
          (log.user_id == props.user_id) &&
          (log.used_per_user == props.uses && log.used_per_user >= 0))
          return true;
      });
    }
  }, [pvLogs])

  const handleSubmit = async (formData: FormData) => {
    const logtest = pvLogs.find((log: any) => {
      if (
        (log.public_voucher_id == formData.get("voucher_id")) &&
        (log.user_id == formData.get("user_id")) &&
        (log.used_per_user == props.uses && log.used_per_user >= 0))
        return true;
    });
    if (logtest && (props.max_uses == null || props.max_uses < logtest.used_per_user)) {
      updatePublicVoucherLogs(logtest.used_per_user + 1, logtest.user_id, logtest.public_voucher_id)
    }

    router.refresh();
    setModal(false);
  };

  const handleChange = () => setModal(!modal);

  return (
    <div>
      <AdminAddButton
        handleChange={() => handleChange()}
        modal={modal}
        title='Redeem voucher'
      />

      <div
        className={`
        ${modal ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full
      `}
      >
        <div className='relative w-full h-full max-w-2xl p-4 md:h-auto'>
          <div className='relative p-4 bg-white rounded-lg shadow sm:p-5'>
            <AdminAddModalButton
              title='Redeem voucher'
              handleChange={() => handleChange()}
            />

            <Form isError={false} error=''>
              <AutoCompleteInput
                inputName='user_id'
                inputLabel='User'
                inputPlaceholder='Select a user'
                defaultValue={props.user_id ? props.user_id : undefined}
                options={users.map((user) => ({
                  id: user.id,
                  label: user.email,
                }))}
              />

              <AutoCompleteInput
                inputName='voucher_id'
                inputLabel='Voucher'
                inputPlaceholder='Select a voucher'
                defaultValue={props.voucher_id ? props.voucher_id : undefined}
                options={vouchers.map((voucher: any) => ({
                  id: voucher.id,
                  label: voucher.name,
                }))}
              />
              <FormSubmitButton
                formAction={handleSubmit}
                pendingText='Adding...'
              >
                Redeem
              </FormSubmitButton>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}