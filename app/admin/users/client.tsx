"use client";
import { Suspense } from "react";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TablePagination from "@/components/Table/TablePagination";
import MenuUser from "./menuUser";
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
    <div className='flex flex-col flex-1 w-full gap-8'>
      <div className='flex flex-wrap items-center justify-between space-y-4 flex-column sm:flex-row sm:space-y-0'>
        <h3 className='text-3xl'>Users</h3>
      </div>
      <div className='relative overflow-x-auto bg-white shadow-md sm:rounded-lg'>
        <div className='flex flex-wrap items-center justify-between p-4 pb-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0'>
          <div></div>
          <Search placeholder='Search for users' />
        </div>
        <Suspense
          key={query + sort + currentPage}
          fallback={<div>Loading...</div>}
        >
          <table className='w-full text-sm text-left text-gray-500 rtl:text-right'>
            <TableHead headCells={headCells} />
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className='bg-white border-b hover:bg-gray-50'>
                  <th
                    scope='row'
                    className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    <div>
                      <div className='text-base font-semibold'>
                        {user.name || user.email.split("@")[0]}
                      </div>
                      <div className="font-normal text-gray-500 lowercase">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  {headCells.map((headCell) => {
                    if (headCell.id == "email") return;
                    return (
                      <td
                        key={headCell.id}
                        className='px-6 py-4'
                        suppressHydrationWarning
                      >
                        {handleShowLabel(user, headCell)}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-right">
                    <MenuUser user={user} />
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
