"use client";
import { useState, Suspense } from "react";
import StampsActions from "./actions";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TableBody from "@/components/Table/TableBody";
import TablePagination from "@/components/Table/TablePagination";
import CreateModal from "./modal";

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

export interface Stamp {
  stamp_log_id: number;
  timestamp: string;
  user_id: string;
  is_used: boolean;
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
  const [selected, setSelected] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = stamps.map((n) => n.stamp_log_id);
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
    <div className="container flex-1 w-full flex flex-col gap-8">
      <CreateModal
        show={showAddModal}
        toggleShow={() => setShowAddModal(!showAddModal)}
        users={users}
      />

      <div
        className={`fixed inset-0 z-10 ${
          showAddModal ? "" : "hidden"
        } bg-gray-900/50 dark:bg-gray-900/60`}
        id="sidebarBackdrop"
        onClick={() => setShowAddModal(false)}
      ></div>

      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between">
        <h3 className="text-3xl dark:text-white">Stamps</h3>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          Add stamp
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <StampsActions selected={selected} />
          <Search placeholder="Search for stamps" />
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
            <TableBody
              data={stamps}
              rowKey="stamp_log_id"
              headCells={headCells}
              handleSelectClick={handleSelectClick}
              isSelected={isSelected}
            />
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
