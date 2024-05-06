"use client";
import { motion } from "framer-motion";
import { AnimationProps } from "../AnimationProps";


/**
 * Renders a child-component with an overzoom-in animation.
 *
 * @param props - The animation props.
 * @returns The animated component.
 */
export default function OverZoomIn(props: AnimationProps) {
  return (
    <motion.div
      className={props.className}
      initial={{ scale: 0 }}
      animate={{ scale: props.scale || [1, 1.1, 1] }}
      transition={{
        delay: props.delay || 0,
        duration: props.duration,
        times: props.times || [0, 0.4, 1],
      }}
    >
      {props.children}
    </motion.div>
  );
}
