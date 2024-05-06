"use client";
import { Suspense } from "react";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TablePagination from "@/components/Table/TablePagination";
import AddVoucherType from "./addVoucherType";
import MenuVoucherType from "./menuVoucherType";
import { VoucherType } from "./interface";

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

const _ = require("lodash");

const handleShowLabel = (row: any, headCell: HeadCell) => {
  const value = _.get(row, headCell.id);

  if (headCell.type == "datetime") {
    return new Date(value).toLocaleDateString();
  } else if (headCell.type == "boolean") {
    return value ? "Yes" : "No";
  } else {
    return value;
  }
};

/**
 * Renders a list of voucher types with their respective details.
 * @param {Object} params - The parameters for the VoucherTypesClient.
 * @param {VoucherType[]} params.voucherTypes - The array of voucher types to be displayed.
 * @param {number} params.count - The total count of voucher types.
 * @param {string} params.query - The search query string.
 * @param {string} params.sort - The sort order.
 * @param {number} params.currentPage - The current page number.
 * @returns {JSX.Element} A VoucherTypesClient component with the list of voucher types.
 */
export default function VoucherTypesClient({
  voucherTypes,
  count,
  query,
  sort,
  currentPage,
}: {
  voucherTypes: VoucherType[];
  count: number;
  query: string;
  sort: string;
  currentPage: number;
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <h3 className="text-3xl">Voucher Types</h3>
        <AddVoucherType />
      </div>

      <div className="relative bg-white overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <div></div>
          <Search placeholder="Search for voucher types" />
        </div>
        <Suspense
          key={query + sort + currentPage}
          fallback={<div>Loading...</div>}
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <TableHead headCells={headCells} />
            <tbody>
              {voucherTypes.map((voucherType, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  {headCells.map((headCell) => (
                    <td
                      key={headCell.id}
                      className="px-6 py-4"
                      suppressHydrationWarning
                    >
                      {handleShowLabel(voucherType, headCell)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <MenuVoucherType voucherType={voucherType} />
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

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    type: "number",
    label: "Voucher Type Id",
  },
  {
    id: "name",
    type: "string",
    label: "Name",
  },
  {
    id: "description",
    type: "string",
    label: "Description",
  },
  {
    id: "redeem_message",
    type: "string",
    label: "Redeem message",
  },
  {
    id: "uses_per_voucher",
    type: "number",
    label: "Uses per voucher",
  }
];
