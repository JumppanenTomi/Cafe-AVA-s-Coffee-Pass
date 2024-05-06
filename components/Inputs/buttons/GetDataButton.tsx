"use client";

import { useState } from "react";
import GetDataModal from "../../UIOverlays/GetDataModal";

/**
 * Button component for downloading collected user information.
 */
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