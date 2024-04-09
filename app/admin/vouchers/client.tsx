"use client";
import { useState, Suspense } from "react";
import StampsActions from "./actions";
import Search from "@/components/Table/Search";
import TableHead from "@/components/Table/TableHead";
import TableBody from "@/components/Table/TableBody";
import TablePagination from "@/components/Table/TablePagination";
import CreateModal from "./modal";
import { Voucher } from "@/types/Types";

export interface HeadCell {
  id: string;
  label: string;
  type: string;
}

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
  const [showAddModal, setShowAddModal] = useState(false);

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
    <div className="flex flex-col flex-1 w-full gap-8">
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

      <div className="flex flex-wrap items-center justify-between space-y-4 flex-column sm:flex-row sm:space-y-0">
        <h3 className="text-3xl dark:text-white">Vouchers</h3>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          Add voucher
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-wrap items-center justify-between p-4 pb-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900">
          <StampsActions selected={selected} />
          <Search placeholder="Search for vouchers" />
        </div>
        <Suspense
          key={query + sort + currentPage}
          fallback={<div>Loading...</div>}
        >
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <TableHead
              headCells={headCells}
              handleSelectAllClick={handleSelectAllClick}
            />
            <TableBody
              data={vouchers}
              rowKey="voucher_log_id"
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
