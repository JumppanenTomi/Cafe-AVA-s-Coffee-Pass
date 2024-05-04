"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Voucher } from "./interface";
import { deleteVouchers } from "@/utils/ServerActions/voucher";
import DeleteModal from "@/components/UIOverlays/DeleteModal";

export default function DeleteVoucher({
  voucher,
  handleMenu,
}: {
  voucher: Voucher;
  handleMenu: () => void;
}) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsMutating(true);
    await deleteVouchers([voucher?.id]);

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
        type="voucher"
      />
    </>
  );
}
