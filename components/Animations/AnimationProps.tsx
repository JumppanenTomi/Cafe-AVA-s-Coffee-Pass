import { HTMLProps } from "react";

export interface AnimationProps {
  children: React.ReactNode;
  className?: HTMLProps<HTMLDivElement>["className"];
  duration: number;
  delay?: number;
  times?: number[];
  scale?: number[];
}

export interface RollDownProps extends AnimationProps {
  animateTop: number[];
}
