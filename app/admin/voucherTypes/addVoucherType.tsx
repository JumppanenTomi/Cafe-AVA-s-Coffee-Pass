"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/Inputs/Form";
import TextInput from "@/components/Inputs/TextInput";
import NumberInput from "@/components/Inputs/NumberInput";
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
              />

              <TextInput
                inputName="redeem_message"
                inputLabel="Redeem message"
                inputPlaceholder="Enter redeem message"
                isRequired={false}
              />

              <NumberInput
                inputName="uses_per_voucher"
                inputLabel="Uses per voucher"
                inputPlaceholder="Enter uses per voucher"
                isRequired={false}
              />

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
