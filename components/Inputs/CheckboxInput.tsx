import React from "react";

interface CheckboxInputProps {
  children: React.ReactNode;
  inputName?: string;
  isRequired?: boolean;
}

/**
 * Renders a checkbox input component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the component.
 * @param {string} [props.inputName="checkbox"] - The name attribute for the checkbox input.
 * @param {boolean} [props.isRequired=false] - Specifies whether the checkbox input is required.
 * @returns {JSX.Element} The rendered checkbox input component.
 */
export default function CheckboxInput({
  children,
  inputName = "checkbox",
  isRequired = false,
}: CheckboxInputProps) {
  return (
    <div className={"flex gap-2"}>
      <input type='checkbox' name={inputName} required={isRequired} />
      {children}
    </div>
  );
}
