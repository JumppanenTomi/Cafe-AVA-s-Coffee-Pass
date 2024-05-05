import { useState } from "react";
import UpdateVoucher from "./updateVoucher";
import DeleteVoucher from "./deleteVoucher";
import { Voucher } from "./interface";

/**
 * Renders a menu for a specific voucher with options to update and delete the voucher.
 * @param {Object} voucher - The voucher object.
 * @returns {JSX.Element} A MenuVoucher component for the given voucher.
 */
export default function MenuVoucher({ voucher }: { voucher: Voucher }) {
  const [menu, setMenu] = useState(false);

  // Function to handle modal visibility change
  const handleChange = () => setMenu(!menu);

  return (
    <div>
      <button
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
        onClick={handleChange}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 z-10 ${menu ? "" : "hidden"}`}
        id="sidebarBackdrop"
        onClick={handleChange}
      ></div>

      <div
        className={`
            ${menu ? "block" : "hidden"} 
            z-10 absolute right-6 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-left
        `}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <UpdateVoucher voucher={voucher} handleMenu={handleChange} />
        </ul>
        <div className="py-2">
          <DeleteVoucher voucher={voucher} handleMenu={handleChange} />
        </div>
      </div>
    </div>
  );
}
