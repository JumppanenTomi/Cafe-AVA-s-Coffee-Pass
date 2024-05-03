"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { User, VoucherType } from "./interface";
import { fetchUsersV2 } from "@/utils/ServerActions/user";
import {
  createVouchers,
  fetchVoucherTypes,
} from "@/utils/ServerActions/voucher";
import AdminAddModalButton from "@/components/Inputs/buttons/AdminAddModalButton";
import AdminAddButton from "@/components/Inputs/buttons/AdminAddButton";
import DateInput from "@/components/Inputs/DateInput";
import NumberInput from "@/components/Inputs/NumberInput";
import ToggleInput from "@/components/Inputs/ToggleInput";

export default function AddVoucher(props?: { user_id?: string }) {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userInput, setUserInput] = useState("");
  const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([]);
  const [voucherTypeInput, setVoucherTypeInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetchUsersV2(userInput, "-id", 1);
      setUsers(response || []);
    };

    getUsers();
  }, [userInput]);

  useEffect(() => {
    const getVoucherTypes = async () => {
      const response = await fetchVoucherTypes(voucherTypeInput);
      setVoucherTypes(response || []);
    };

    getVoucherTypes();
  }, [voucherTypeInput]);

  const handleSubmit = async (formData: FormData) => {
    await createVouchers(formData);

    router.refresh();
    setModal(false);
  };

  const handleChange = () => setModal(!modal);

  return (
    <div>
      <AdminAddButton
        handleChange={() => handleChange()}
        modal={modal}
        title="Add voucher"
      />

      <div
        className={`
        ${modal ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full
      `}
      >
        <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <AdminAddModalButton
              title="Add voucher"
              handleChange={() => handleChange()}
            />

            <Form isError={false} error="">
              <AutoCompleteInput
                inputName="user_id"
                inputLabel="User"
                inputPlaceholder="Select a user"
                defaultValue={props?.user_id || undefined}
                onInputChange={(value) => setUserInput(value)}
                options={users.map((user) => ({
                  id: user.id,
                  label: user.email,
                }))}
              />

              <AutoCompleteInput
                inputName="voucher_type"
                inputLabel="Voucher Type"
                inputPlaceholder="Select a voucher type"
                onInputChange={(value) => setVoucherTypeInput(value)}
                options={voucherTypes.map((type) => ({
                  id: type.id,
                  label: type.name || "",
                }))}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <DateInput
                  inputName="start"
                  inputLabel="Start date"
                  inputPlaceholder="Enter start date"
                />

                <DateInput
                  inputName="end"
                  inputLabel="End date"
                  inputPlaceholder="Enter end date"
                />
              </div>

              <NumberInput
                inputName="used"
                inputLabel="Used"
                inputPlaceholder="Enter used"
              />

              <ToggleInput inputName="active" inputLabel="Is active" />

              <FormSubmitButton
                formAction={handleSubmit}
                pendingText="Adding..."
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
