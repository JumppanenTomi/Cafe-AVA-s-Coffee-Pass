"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { User, VoucherType } from "./interface";
import {
  createVouchers,
  fetchVoucherTypes,
} from "@/utils/ServerActions/voucher";
import { fetchUserActiveStamps, useMultipleStamps } from "@/utils/ServerActions/stamp";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";
import { findUser } from "@/utils/ServerActions/user";
import AdminAddModalButton from "@/components/Inputs/buttons/AdminAddModalButton";
import AdminAddButton from "@/components/Inputs/buttons/AdminAddButton";
import ToggleInput from "@/components/Inputs/ToggleInput";
import DateInput from "@/components/Inputs/DateInput";
import NumberInput from "@/components/Inputs/NumberInput";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";

export default function AddVoucher(props?: { user_id?: string }) {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState("");
  const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([]);
  const [voucherTypeInput, setVoucherTypeInput] = useState("");
  const [stampsRequired, setStampsRequired] = useState<undefined | number>(0);
  const router = useRouter();

  const now = new Date();
  const offset = now.getTimezoneOffset();
  const adjustedNow = new Date(now.getTime() - offset * 60000); // Adjust for timezone offset
  const formattedDateTime = adjustedNow.toISOString().slice(0, 16);

  useEffect(() => {
    const getUsers = async () => {
      const response = await findUser("-id", userInput);
      setUsers(
        response.users?.map((user) => ({ ...user, email: user.email || "" })) ||
          []
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
  }, [userInput]);

  useEffect(() => {
    const getVoucherTypes = async () => {
      const response = await fetchVoucherTypes(voucherTypeInput);
      setVoucherTypes(response || []);
    };

    getVoucherTypes();
  }, [voucherTypeInput]);

  const handleSubmit = async (formData: FormData) => {
    const response = await fetchUserActiveStamps(formData.get("user_id") as string)
    const freeVoucher = formData.get("free_voucher")

    if (!freeVoucher) {
      if (stampsRequired && response && response >= stampsRequired) {
        await createVouchers(formData);
        useMultipleStamps(undefined, formData.get("user_id") as string, stampsRequired)
        console.log("stamps consumed")
      } else {
        console.log("User has less stamps than required amount")
        alert(`User has less than ${stampsRequired} stamps, if you wanted to give a free voucher toggle "Give voucher without using stamps" on.`)
      }
    } else {
      await createVouchers(formData);
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
                onInputChange={(value) => setUserInput(value)}
                options={users.map((user) => ({
                  id: user.id,
                  label: user.email,
                }))}
              />

              <AutoCompleteInput
                inputName='voucher_type'
                inputLabel='Voucher Type'
                inputPlaceholder='Select a voucher type'
                onInputChange={(value) => setVoucherTypeInput(value)}
                options={voucherTypes.map((type) => ({
                  id: type.id,
                  label: type.name || "",
                }))}
              />

              <div className='grid gap-4 sm:grid-cols-2'>
                <DateInput
                  inputName='start'
                  inputLabel='Start date'
                  inputPlaceholder='Enter start date'
                  defaultValue={formattedDateTime}
                />

                <DateInput
                  inputName='end'
                  inputLabel='End date'
                  inputPlaceholder='Enter end date'
                />
              </div>

              <NumberInput
                inputName='used'
                inputLabel='Used'
                inputPlaceholder='Enter used'
              />

              <ToggleInput inputName='active' inputLabel='Is active' defaultValue={true} />

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
