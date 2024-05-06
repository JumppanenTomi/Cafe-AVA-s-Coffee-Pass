import { ReactNode } from "react";

/**
 * Renders a form component.
 *
 * @param children - The child components to render within the form.
 * @param isError - A boolean indicating whether there is an error.
 * @param error - The error message to display.
 * @returns The rendered form component.
 */
export function Form({
  children,
  isError,
  error,
}: {
  children: ReactNode;
  isError: boolean;
  error: string;
}) {
  return (
    <form className={"form"}>
      {children}
      {error && (
        <p className={isError ? "form-error" : "form-success"}>{error}</p>
      )}
    </form>
  );
}
