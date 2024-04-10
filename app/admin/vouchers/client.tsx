"use client";
import { useState, Suspense } from "react";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TablePagination from "@/components/Table/TablePagination";
import { Voucher } from "./server";
import AddVoucher from "./addVoucher";
import MenuVoucher from "./menuVoucher";

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

export default function VouchersClient({
  vouchers,
  count,
  users,
  query,
  sort,
  currentPage,
}: {
  vouchers: Voucher[];
  count: number;
  users: any[];
  query: string;
  sort: string;
  currentPage: number;
}) {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = vouchers.map((n) => n.voucher_log_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (event: React.ChangeEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <h3 className="text-3xl dark:text-white">Vouchers</h3>
        <AddVoucher />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div></div>
          <Search placeholder="Search for vouchers" />
        </div>
        <Suspense
          key={query + sort + currentPage}
          fallback={<div>Loading...</div>}
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <TableHead
              headCells={headCells}
              handleSelectAllClick={handleSelectAllClick}
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

const headCells: readonly HeadCell[] = [
  {
    id: "voucher_log_id",
    type: "number",
    label: "Voucher Id",
  },
  {
    id: "vouchers.name",
    type: "string",
    label: "name",
  },
  {
    id: "timestamp",
    type: "datetime",
    label: "Timestamp",
  },
  {
    id: "user_id",
    type: "string",
    label: "User Id",
  },
];
