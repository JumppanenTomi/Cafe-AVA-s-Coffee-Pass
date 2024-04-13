"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/Inputs/Form";
import { FormSubmitButton } from "@/components/Inputs/buttons/FormSubmitButton";
import AutoCompleteInput from "@/components/Inputs/AutoCompleteInput";
import { Voucher, User, VoucherType } from "./interface";
import { fetchUsers } from "@/utils/ServerActions/user";
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
  const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([]);
  const [voucherTypeInput, setVoucherTypeInput] = useState("");
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

    getUsers();
  }, []);

  useEffect(() => {
    const getVoucherTypes = async () => {
      const response = await fetchVoucherTypes(voucherTypeInput);
      setVoucherTypes(response?.map((type) => ({
        voucher_id: Number(type.voucher_id) || 0,
        name: type.name || "",
        description: type.description || "",
      })) ?? []);
    };

    getVoucherTypes();
  }, [voucherTypeInput]);

  const handleUpdate = async (formData: FormData) => {
    await updateVoucher(voucher?.voucher_log_id, formData);

    router.refresh();
    setModal(false);
    handleMenu();
  };

  const handleChange = () => setModal(!modal);

  return (
    <>
      <li>
        <a
          href='#'
          onClick={handleChange}
          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
        >
          Edit Voucher
        </a>
      </li>

      <div
        className={`fixed inset-0 z-10 ${
          modal ? "" : "hidden"
        } bg-gray-900/50 dark:bg-gray-900/60`}
        id='sidebarBackdrop'
        onClick={handleChange}
      ></div>

      <div
        className={`
        ${modal ? "" : "hidden"} 
        flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full
      `}
      >
        <div className='relative w-full h-full max-w-2xl p-4 md:h-auto'>
          <div className='relative p-4 bg-white rounded-lg shadow sm:p-5'>
            <div className='flex items-center justify-between pb-4 mb-4 border-b rounded-t sm:mb-5'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Edit Voucher
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                onClick={handleChange}
              >
                <svg
                  aria-hidden='true'
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <Form isError={false} error=''>
              <AutoCompleteInput
                inputName='user_id'
                inputLabel='User'
                inputPlaceholder='Select a user'
                defaultValue={voucher?.user_id}
                options={users.map((user) => ({
                  id: user.id,
                  label: user.email,
                }))}
              />

              <AutoCompleteInput
                inputName='voucher_id'
                inputLabel='Voucher Type'
                inputPlaceholder='Select a voucher type'
                defaultValue={voucher?.voucher_id}
                onInputChange={(value) => setVoucherTypeInput(value)}
                options={voucherTypes.map((type) => ({
                  id: type.voucher_id,
                  label: type.name,
                }))}
              />

              <FormSubmitButton
                formAction={handleUpdate}
                pendingText='Updating...'
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
