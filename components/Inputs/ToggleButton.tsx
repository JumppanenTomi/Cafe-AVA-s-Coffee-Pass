"use client";

import { motion } from "framer-motion"
import { useState } from "react"

export default function ToggleButton() {
  const [toggle, setToggle] = useState<boolean>(false);
  console.log("toggle on", toggle)
  return (
    <div className="flex justify-center items-center p-5">
      <div
        onClick={() => setToggle(!toggle)}
        className={`flex h-5 w-10 cursor-pointer rounded-full border border-black ${toggle ? "justify-end bg-black " : "justify-start bg-white"} p-[1px]`}
      >
        <motion.div className={`h-4 w-4 rounded-full ${toggle ? "bg-white" : "bg-black"}`} layout transition={{ type: "spring", stiffness: 500, damping: 30 }} />
      </div>
    </div>
  )
}