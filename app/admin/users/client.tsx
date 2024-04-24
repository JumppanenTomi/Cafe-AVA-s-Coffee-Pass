"use client";
import { Suspense } from "react";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TablePagination from "@/components/Table/TablePagination";

const _ = require("lodash");

const handleShowLabel = (row: any, headCell: HeadCell) => {
  const value = _.get(row, headCell.id);
  if (headCell.type == "datetime") return new Date(value).toLocaleString();
  if (headCell.label == "role") return value ? value : "client";
  return value;
};

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

export default function UsersClient({
  users,
  count,
  query,
  sort,
  currentPage,
}: {
  users: any[];
  count: number;
  query: string;
  sort: string;
  currentPage: number;
}) {
  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <h3 className="text-3xl">Users</h3>
      </div>
      <div className="relative bg-white overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <div></div>
          <Search placeholder="Search for users" />
        </div>
        <Suspense
          key={query + sort + currentPage}
          fallback={<div>Loading...</div>}
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <TableHead headCells={headCells} />
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div>
                      <div className="text-base font-semibold">
                        {user.raw_user_meta_data.name ||
                          user.email.split("@")[0]}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  {headCells.map((headCell) => {
                    if (headCell.id == "email") return;
                    return (
                      <td
                        key={headCell.id}
                        className="px-6 py-4"
                        suppressHydrationWarning
                      >
                        {handleShowLabel(user, headCell)}
                      </td>
                    );
                  })}
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
    id: "email",
    type: "string",
    label: "email",
  },
  {
    id: "id",
    type: "string",
    label: "User Id",
  },
  {
    id: "role",
    type: "string",
    label: "role",
  },
  {
    id: "created_at",
    type: "datetime",
    label: "created",
  },
  {
    id: "last_sign_in_at",
    type: "datetime",
    label: "last sign in",
  },
];
