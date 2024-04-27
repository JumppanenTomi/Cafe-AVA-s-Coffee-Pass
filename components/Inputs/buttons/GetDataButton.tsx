"use client";

import { useState } from "react";
import GetDataModal from "../../UIOverlays/GetDataModal";

export default function GetDataButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <a onClick={() => setShowModal(true)}>
        Download collected user information
      </a>
      <GetDataModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}