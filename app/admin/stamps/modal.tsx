"use client";

import NumberInput from "@/components/Inputs/NumberInput";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import { createStamps } from "./server";
import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";

export default function CreateModal({
  show,
  toggleShow,
  users,
}: {
  show: boolean;
  toggleShow: () => void;
  users: any[];
}) {
  const handleSubmit = async (formData: FormData) => {
    await createStamps(formData);
    window.location.reload();
  };

  return (
    <div
      className={`
        ${show ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full
      `}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900">Add Stamp</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleShow}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <Form isError={false} error="">
            <AutoCompleteInput
              inputName="user_id"
              inputLabel="User"
              inputPlaceholder="Select a user"
              options={users.map((user) => ({
                id: user.id,
                label: user.email,
              }))}
            />

            <NumberInput
              inputName="amount"
              inputLabel="Amount"
              inputPlaceholder="Number of stamps"
              min={1}
              helperText="The number of stamps created for this user."
            />
            <FormSubmitButton formAction={handleSubmit} pendingText="Adding...">
              Save
            </FormSubmitButton>
          </Form>
        </div>
      </div>
    </div>
  );
}
