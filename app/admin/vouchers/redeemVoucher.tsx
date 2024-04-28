import { useRouter } from "next/navigation";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import { Form } from "@/components/Inputs/Form";
import AdminAddButton from "@/components/Inputs/buttons/AdminAddButton";
import AdminAddModalButton from "@/components/Inputs/buttons/AdminAddModalButton";
import { User, UpdatedVouchers } from "./interface";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/utils/ServerActions/user";
import { fetchAllVouchers, usePublicVoucher, usePrivateVoucher } from "@/utils/ServerActions/voucher";

export default function RedeemVoucher(props:
  {
    redeemed_user_id: string,
    voucher_id: string | number,
    uses: number,
    max_uses: number | null,
    voucher_user_id: string | null,
    user_email: string | null,
    times_used: number | null,
  }) {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [vouchers, setVouchers] = useState<UpdatedVouchers[]>([]);
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
            name: voucher.voucher_type ? voucher.voucher_type.name : "",
          }))
        );
      }
    };

    getUsers();
    getVouchers();
  }, []);


  // Update a private or public voucher based on if the voucher has a userId attached to it
  const handleSubmit = async (formData: FormData) => {
    const userId = formData.get("user_id") as string
    const voucherId = formData.get("voucher_id") as unknown as number
    if (props.max_uses == null || (props.times_used != null && props.times_used < props.max_uses)) {
      console.log("passed the null and used check")
      if (props.voucher_user_id == null) {
        usePublicVoucher(voucherId, userId)
      } else if (props.voucher_user_id != null) {
        usePrivateVoucher(voucherId)
      }
    } else {
      console.log("max uses and times used check failed")
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
                defaultValue={props.redeemed_user_id ? props.redeemed_user_id : undefined}
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