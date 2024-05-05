"use client";
import React, { useState } from "react";

interface AutoCompleteInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  defaultValue?: number | string | undefined;
  onInputChange?: (value: string) => void;
  options: { id: string | number; label: string }[];
  helperText?: string;
}

export default function AutoCompleteInput({
  inputName = "autocomplete",
  showLabel = true,
  inputLabel = "AutoComplete",
  inputPlaceholder = "1234",
  isRequired = true,
  defaultValue = undefined,
  onInputChange = () => {},
  options,
  helperText = "",
}: AutoCompleteInputProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    setInputValue(value);
    onInputChange(value);
  };

  const handleOptionClick = (value: string) => {
    setInputValue(value);
    onInputChange(value);
    setOpenDropdown(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {showLabel && (
        <label className='input-label' htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <input
        className='input'
        name={inputName}
        placeholder={inputPlaceholder}
        required={isRequired}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setOpenDropdown(true)}
        onBlur={() => setOpenDropdown(false)}
      />
      <div className='dropdown'>
        {options.map((opt, index) => (
          <div key={index} onClick={() => handleOptionClick(opt.id.toString())}>
            {opt.label}
          </div>
        ))}
      </div>
      {helperText && <p className='input-helper-text'>{helperText}</p>}
    </div>
  );
}