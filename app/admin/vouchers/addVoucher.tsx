"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { User, VoucherType } from "./interface";
import { fetchUsers } from "@/utils/ServerActions/user";
import {
  createVouchers,
  fetchVoucherTypes,
} from "@/utils/ServerActions/voucher";
import { fetchUserActiveStamps, useMultipleStamps } from "@/utils/ServerActions/stamp";
import AdminAddModalButton from "@/components/Inputs/buttons/AdminAddModalButton";
import AdminAddButton from "@/components/Inputs/buttons/AdminAddButton";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import ToggleInput from "@/components/Inputs/ToggleInput";

export default function AddVoucher(props?: { user_id?: string }) {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([]);
  const [voucherTypeInput, setVoucherTypeInput] = useState("");
  const [stampsRequired, setStampsRequired] = useState<undefined | number>(0);
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

    const getStampsRequired = async () => {
      const result = await fetchSiteSetting("stampsRequired");
      if (result?.value) {
        setStampsRequired(parseInt(result.value));
      }
    };

    getUsers();
    getStampsRequired();
  }, []);

  useEffect(() => {
    const getVoucherTypes = async () => {
      const response = await fetchVoucherTypes(voucherTypeInput);
      setVoucherTypes(
        response?.map((type) => ({
          voucher_id: Number(type.voucher_id) || 0,
          name: type.name || "",
          description: type.description || "",
        })) ?? []
      );
    };

    getVoucherTypes();
  }, [voucherTypeInput]);

  const handleSubmit = async (formData: FormData) => {
    await createVouchers(formData);
    const response = await fetchUserActiveStamps(formData.get("user_id") as string)
    const freeVoucher = formData.get("free_voucher")

    if (!freeVoucher) {
      if (stampsRequired && response && response >= stampsRequired) {
        useMultipleStamps(undefined, formData.get("user_id") as string, stampsRequired)
        console.log("stamps consumed")
      } else {
        console.log("User has less stamps than required amount")
      }
    } else {
      alert("Free voucher has been added to the user")
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
        title='Add voucher'
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
              title='Add voucher'
              handleChange={() => handleChange()}
            />

            <Form isError={false} error=''>
              <AutoCompleteInput
                inputName='user_id'
                inputLabel='User'
                inputPlaceholder='Select a user'
                defaultValue={props?.user_id || undefined}
                options={users.map((user) => ({
                  id: user.id,
                  label: user.email,
                }))}
              />

              <AutoCompleteInput
                inputName='voucher_id'
                inputLabel='Voucher Type'
                inputPlaceholder='Select a voucher type'
                onInputChange={(value) => setVoucherTypeInput(value)}
                options={voucherTypes.map((type) => ({
                  id: type.voucher_id,
                  label: type.name,
                }))}
              />
              <ToggleInput
                inputName="free_voucher"
                inputLabel="Give voucher without using stamps"
                defaultValue={false}
              />
              <FormSubmitButton
                formAction={handleSubmit}
                pendingText='Adding...'
              >
                Save
              </FormSubmitButton>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
