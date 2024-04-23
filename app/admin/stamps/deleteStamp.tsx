"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stamp } from "./interface";
import { deleteStamps } from "@/utils/ServerActions/stamp";
import DeleteModal from "@/components/UIOverlays/DeleteModal";

export default function DeleteStamp({
  stamp,
  handleMenu,
}: {
  stamp: Stamp;
  handleMenu: () => void;
}) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsMutating(true);
    await deleteStamps([stamp?.stamp_log_id]);

    setIsMutating(false);
    router.refresh();
    setModal(false);
    handleMenu();
  };

  const handleChange = () => setModal(!modal);

  return (
    <>
      <a
        href='#'
        onClick={handleChange}
        className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-100'
      >
        Delete
      </a>
      <DeleteModal
        modal={modal}
        isMutating={isMutating}
        handleChange={() => handleChange()}
        handleDelete={() => handleDelete()}
        type="stamp"
      />
    </>
  );
}
