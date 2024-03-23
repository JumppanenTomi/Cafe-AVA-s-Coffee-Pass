"use client";
import { useState } from "react";
import { deactivateStamps } from "./server";

export default function StampsActions({ selected }: { selected: number[] }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleDeactiviate = async () => {
    if (window.confirm('Are you sure you want to deactivate the selected stamps?')) {
      try {
        await deactivateStamps(selected);
      } catch (error) {
        console.error('Error deactivating stamps', error);
      } finally {
        window.location.reload();
      }
    }
  }

  return (
    <div>
      <button id="dropdownActionButton"
        onClick={toggleDropdown}
        data-dropdown-toggle="dropdownAction"
        className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button">
        <span className="sr-only">Action button</span>
        Action
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="m1 1 4 4 4-4" />
        </svg>
      </button>

      <div id="dropdownAction" style={{ display: showDropdown ? 'block' : 'none' }}
        className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
          <li>
            <a
              onClick={handleDeactiviate}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Deactivate</a>
          </li>
        </ul>
        <div className="py-1">
          <a href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
        </div>
      </div>
    </div>
  );
}