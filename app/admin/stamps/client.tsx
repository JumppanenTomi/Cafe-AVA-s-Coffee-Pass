"use client";
import { Suspense } from "react";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TablePagination from "@/components/Table/TablePagination";
import AddStamp from "./addStamp";
import MenuStamp from "./menuStamp";
import { Stamp } from "./interface";

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

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

export default function StampsClient({
  stamps,
  count,
  users,
  query,
  sort,
  currentPage,
}: {
  stamps: Stamp[];
  count: number;
  users: any[];
  query: string;
  sort: string;
  currentPage: number;
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <h3 className="text-3xl">Stamps</h3>
        <AddStamp />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <div></div>
          <Search placeholder="Search for stamps" />
        </div>
        <Suspense
          key={query + sort + currentPage}
          fallback={<div>Loading...</div>}
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <TableHead
              headCells={headCells}
            />
            <tbody>
              {stamps.map((stamp, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  {headCells.map((headCell) => (
                    <td
                      key={headCell.id}
                      className="px-6 py-4"
                      suppressHydrationWarning
                    >
                      {handleShowLabel(stamp, headCell)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <MenuStamp stamp={stamp} />
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
    id: "stamp_log_id",
    type: "number",
    label: "Stamp Id",
  },
  {
    id: "timestamp",
    type: "datetime",
    label: "Timestamp",
  },
  {
    id: "user_id",
    type: "string",
    label: "User",
  },
  {
    id: "is_used",
    type: "boolean",
    label: "Is used",
  },
];
