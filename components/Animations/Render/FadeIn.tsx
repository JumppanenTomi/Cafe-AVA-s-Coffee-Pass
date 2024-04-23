"use client";
import { motion } from "framer-motion";
import { AnimationProps } from "../AnimationProps";

/**
 * Renders a component with an overzoom-in animation.
 *
 * @param props - The animation props.
 * @returns The animated component.
 */
export default function FadeIn(props: AnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      className={props.className}
      animate={{ opacity: 1 }}
      transition={{
        delay: props.delay || 0,
        duration: props.duration,
        times: props.times || [0, 1],
      }}
    >
      {props.children}
    </motion.div>
  );
}
