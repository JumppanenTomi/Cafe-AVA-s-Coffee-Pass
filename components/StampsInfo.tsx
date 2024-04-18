"use client";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import Popup from "./popup";
import { useEffect, useState } from "react";
import { fetchSiteSetting } from "@/utils/ServerActions/siteSetting";

export default function StampsInfo() {
  const [visible, setVisible] = useState(false);
  const [rules, setRules] = useState<any>();

  useEffect(() => {
    fetchSiteSetting("stampRules").then((data) => {
      if (data) setRules(data.value);
    });
  }, []);

  return (
    <>
      <div
        className={
          "flex items-center bg-foreground rounded-full w-fit text-background py-1 px-2 gap-2 cursor-pointer"
        }
        onClick={() => setVisible(true)}
      >
        <label>Info</label>
        <InformationCircleIcon className={"h-7 w-7"} />
      </div>
      <Popup visible={visible} onClose={() => setVisible(false)}>
        <h1>Rules</h1>
        <p>{rules}</p>
      </Popup>
    </>
  );
}
