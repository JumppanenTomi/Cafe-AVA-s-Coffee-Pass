"use client";

import { useState } from "react";
import GetDataModal from "./GetDataModal";

export default function GetDataButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="font-bold" onClick={() => setShowModal(true)}>
        Download collected user information
      </button>
      <GetDataModal isVisible={showModal} onClose={() => setShowModal(false)}/>
    </div>
  )
}