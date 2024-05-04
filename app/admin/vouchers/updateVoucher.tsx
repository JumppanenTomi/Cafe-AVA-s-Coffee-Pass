"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import NumberInput from "@/components/Inputs/NumberInput";
import DateInput from "@/components/Inputs/DateInput";
import ToggleInput from "@/components/Inputs/ToggleInput";
import { Voucher, User, VoucherType } from "./interface";
import { fetchUsersV2 } from "@/utils/ServerActions/user";
import {
  fetchVoucherTypes,
  updateVoucher,
} from "@/utils/ServerActions/voucher";

export default function UpdateVoucher({
  voucher,
  handleMenu,
}: {
  voucher: Voucher;
  handleMenu: () => void;
}) {
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

  const handleUpdate = async (formData: FormData) => {
    await updateVoucher(voucher?.id, formData);

    router.refresh();
    setModal(false);
    handleMenu();
  };

  const handleChange = () => setModal(!modal);

  return (
    <>
      <li>
        <a
          href="#"
          onClick={handleChange}
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Edit Voucher
        </a>
      </li>

      <div
        className={`fixed inset-0 z-10 ${
          modal ? "" : "hidden"
        } bg-gray-900/50 dark:bg-gray-900/60`}
        id="sidebarBackdrop"
        onClick={handleChange}
      ></div>

      <div
        className={`
        ${modal ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full
      `}
      >
        <div className="relative w-full h-full max-w-2xl p-4 md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <div className="flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Voucher
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleChange}
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
                defaultValue={voucher?.user_id}
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
                defaultValue={voucher?.voucher_type.id}
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
                  isRequired={false}
                  defaultValue={voucher?.start}
                />

                <DateInput
                  inputName="end"
                  inputLabel="End date"
                  inputPlaceholder="Enter end date"
                  isRequired={false}
                  defaultValue={voucher?.end}
                />
              </div>

              <NumberInput
                inputName="used"
                inputLabel="Used"
                inputPlaceholder="Enter used"
                defaultValue={voucher?.used}
              />

              <ToggleInput
                inputName="active"
                inputLabel="Is active"
                defaultValue={voucher?.active}
              />

              <FormSubmitButton
                formAction={handleUpdate}
                pendingText="Updating..."
              >
                Save
              </FormSubmitButton>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
