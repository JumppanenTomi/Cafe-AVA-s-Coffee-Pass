"use client";

import { createStamps } from "./server";

export default function CreateModal({ show, toggleShow, users }) {
  const handleSubmit = async (formData: FormData) => {
    const response = await createStamps(formData);
    if (response.error) {
      console.log(response.error);
    } else {
      window.location.reload();
    }

  }

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
          <form action={handleSubmit}>
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="user_id"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  User
                </label>
                <input
                  list="user_id"
                  name="user_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />

                <datalist id="user_id">
                  {users.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </datalist>
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={1}
                />
                <p
                  id="amount-explanation"
                  className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                >
                  The number of stamps created for this user.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
