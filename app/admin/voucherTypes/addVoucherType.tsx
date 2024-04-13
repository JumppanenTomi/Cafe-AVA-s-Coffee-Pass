"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/Inputs/Form";
import TextInput from "@/components/Inputs/TextInput";
import NumberInput from "@/components/Inputs/NumberInput";
import DateInput from "@/components/Inputs/DateInput";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import { createVoucherType } from "@/utils/ServerActions/voucher_types";
import AdminAddButton from "@/components/Inputs/buttons/AdminAddButton";
import AdminAddModalButton from "@/components/Inputs/buttons/AdminAddModalButton";

export default function AddVoucherType() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createVoucherType(formData);

    router.refresh();
    setModal(false);
  };

  const handleChange = () => setModal(!modal);

  return (
    <div>
      <AdminAddButton
        handleChange={() => handleChange()}
        modal={modal}
        title="Add voucher type"
      />

      <div
        className={`
        ${modal ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full text-sm
      `}
      >
        <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <AdminAddModalButton 
              title="Add voucher type"
              handleChange={() => handleChange()}
            />

            <Form isError={false} error="">
              <TextInput
                inputName="name"
                inputLabel="Name"
                inputPlaceholder="Enter voucher type name"
              />

              <TextInput
                inputName="description"
                inputLabel="Description"
                inputPlaceholder="Enter voucher type description"
                isRequired={false}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <DateInput
                  inputName="start_date"
                  inputLabel="Start date"
                  inputPlaceholder="Enter start date"
                  isRequired={false}
                />

                <DateInput
                  inputName="end_date"
                  inputLabel="End date"
                  inputPlaceholder="Enter end date"
                  isRequired={false}
                />
              </div>

              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <NumberInput
                  inputName="uses_per_user"
                  inputLabel="Uses per user"
                  inputPlaceholder="Enter uses per user"
                  isRequired={false}
                />

                <NumberInput
                  inputName="stamps_required"
                  inputLabel="Stamps required"
                  inputPlaceholder="Enter stamps required"
                />
              </div>

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
