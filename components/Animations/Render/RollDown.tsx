"use client";
import { motion } from "framer-motion";
import { RollDownProps } from "../AnimationProps";

/**
 * Renders a component with an overzoom-in animation.
 *
 * @param props - The animation props.
 * @returns The animated component.
 */
export default function RollDown(props: RollDownProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      className={props.className}
      animate={{
        opacity: [0, 1, 1],
        position: "relative",
        top: props.animateTop,
      }}
      transition={{
        delay: props.delay || 0,
        duration: props.duration,
        times: props.times || [0, 0.01, 1],
      }}
    >
      {props.children}
    </motion.div>
  );
}
