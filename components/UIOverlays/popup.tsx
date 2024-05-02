import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  closeAfter?: number;
  visible: boolean;
  onClose: () => void;
}

const Popup: React.FC<Props> = ({
  visible,
  onClose,
  children,
  closeAfter = 0,
}) => {
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (closeAfter > 0) {
      timer = setTimeout(() => onClose(), closeAfter * 1000);
    }
    return () => clearTimeout(timer);
  }, [closeAfter, visible]);

  return (
    visible && (
      <div
        className={
          "fixed z-50 top-0 bottom-0 left-0 right-0 bg-[#00000080] flex items-center justify-center"
        }
      >
        <div
          className={
            "white-container-no-p flex max-w-screen-sm flex-col p-5 items-end m-5"
          }
        >
          <button onClick={onClose}>
            <XMarkIcon className={"w-8 h-8"} />
          </button>
          <div className={"p-5"}>{children}</div>
        </div>
      </div>
    )
  );
};

export default Popup;
