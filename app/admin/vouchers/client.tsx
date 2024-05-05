"use client";
import { Suspense } from "react";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TablePagination from "@/components/Table/TablePagination";
import AddVoucher from "./addVoucher";
import MenuVoucher from "./menuVoucher";
import { Voucher } from "./interface";

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

const _ = require("lodash");

const handleShowLabel = (row: any, headCell: HeadCell) => {
  const value = _.get(row, headCell.id);

  if (headCell.type == "datetime") {
    return new Date(value).toLocaleString();
  } else if (headCell.type == "boolean") {
    return value ? "Yes" : "No";
  } else {
    return value;
  }
};

/**
 * Renders a list of vouchers with their respective details.
 * @param {Object} params - The parameters for the VouchersClient.
 * @param {Voucher[]} params.vouchers - The array of vouchers to be displayed.
 * @param {number} params.count - The total count of vouchers.
 * @param {string} params.query - The search query string.
 * @param {string} params.sort - The sort order.
 * @param {number} params.currentPage - The current page number.
 * @returns {JSX.Element} A VouchersClient component with the list of vouchers.
 */
export default function VouchersClient({
  vouchers,
  count,
  query,
  sort,
  currentPage,
}: {
  vouchers: Voucher[];
  count: number;
  query: string;
  sort: string;
  currentPage: number;
}) {
  return (
    <div className="flex flex-col flex-1 w-full gap-8">
      <div className="flex flex-wrap items-center justify-between space-y-4 flex-column sm:flex-row sm:space-y-0">
        <h3 className="text-3xl dark:text-white">Vouchers</h3>
        <AddVoucher />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-wrap items-center justify-between p-4 pb-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900">
          <div></div>
          <Search placeholder="Search for vouchers" />
        </div>
        <Suspense
          key={query + sort + currentPage}
          fallback={<div>Loading...</div>}
        >
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <TableHead
              headCells={headCells}
            />
            <tbody>
              {vouchers.map((voucher, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {headCells.map((headCell) => (
                    <td
                      key={headCell.id}
                      className="px-6 py-4"
                      suppressHydrationWarning
                    >
                      {handleShowLabel(voucher, headCell)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <MenuVoucher voucher={voucher} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination count={count} />
        </Suspense>
      </div>
    </div>
  );
}

 // Defines the headers for the vouchers table.
const headCells: readonly HeadCell[] = [
  {
    id: "id",
    type: "number",
    label: "Voucher Id",
  },
  {
    id: "voucher_type.name",
    type: "string",
    label: "name",
  },
  {
    id: "user_id",
    type: "string",
    label: "User Id",
  },
  {
    id: "created_at",
    type: "datetime",
    label: "Created",
  },
  {
    id: "used",
    type: "number",
    label: "Is Used",
  },
  {
    id: "active",
    type: "boolean",
    label: "Active",
  },
  {
    id: "start",
    type: "datetime",
    label: "Start",
  },
  {
    id: "end",
    type: "datetime",
    label: "End",
  },
];
