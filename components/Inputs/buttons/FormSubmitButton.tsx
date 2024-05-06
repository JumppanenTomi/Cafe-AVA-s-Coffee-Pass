"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

/**
 * Renders a form submit button.
 *
 * @param {Props} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {string} props.pendingText - The text to display when the button is in a pending state.
 * @param {string} props.formAction - The action associated with the form.
 * @returns {JSX.Element} The rendered form submit button.
 */
export function FormSubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      {...props}
      className={"btn-primary w-full"}
      type='submit'
      aria-disabled={pending}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
