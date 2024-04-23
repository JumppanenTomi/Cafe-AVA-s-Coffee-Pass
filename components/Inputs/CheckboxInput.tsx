import React from "react";

interface CheckboxInputProps {
  children: React.ReactNode;
  inputName?: string;
  isRequired?: boolean;
}

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
