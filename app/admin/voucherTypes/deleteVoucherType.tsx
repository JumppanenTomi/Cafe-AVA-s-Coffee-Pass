"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { VoucherType } from "./interface";
import { deleteVoucherTypes } from "@/utils/ServerActions/voucher_types";
import DeleteModal from "@/components/UIOverlays/DeleteModal";

export default function DeleteVoucherType({
  voucherType,
  handleMenu,
}: {
  voucherType: VoucherType;
  handleMenu: () => void;
}) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsMutating(true);
    await deleteVoucherTypes([voucherType?.id]);

    setIsMutating(false);
    router.refresh();
    setModal(false);
    handleMenu();
  };

  const handleChange = () => setModal(!modal);

  return (
    <>
      <a
        href="#"
        onClick={handleChange}
        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Delete
      </a>
      <DeleteModal 
        modal={modal}
        isMutating={isMutating}
        handleChange={() => handleChange()}
        handleDelete={() => handleDelete()}  
        type="voucher type"
      />
    </>
  );
}
