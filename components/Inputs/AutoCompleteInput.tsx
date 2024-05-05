"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

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

/**
 * AutoCompleteInput component.
 *
 * @param inputName - The name of the input element.
 * @param showLabel - Determines whether to show the input label.
 * @param inputLabel - The label text for the input element.
 * @param inputPlaceholder - The placeholder text for the input element.
 * @param isRequired - Determines whether the input is required.
 * @param defaultValue - The default value for the input element.
 * @param onInputChange - The callback function triggered when the input value changes.
 * @param options - The array of options for the autocomplete dropdown.
 * @param helperText - The helper text to display below the input element.
 */
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
  const [inputValue, setInputValue] = useState<any>();
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  /**
   * Handles the change event of the input element.
   *
   * @param event - The change event object.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedOption("");
    onInputChange(value);
    setOpenDropdown(true);
  };

  /**
   * Handles the click event when an option is selected.
   *
   * @param {string} value - The value of the selected option.
   * @param {string} selectedOptionValue - The value of the selected option.
   */
  const handleOptionClick = (value: string, selectedOptionValue: string) => {
    setInputValue(value);
    onInputChange(value);
    setSelectedOption(selectedOptionValue);
    setOpenDropdown(false);
  };

  /**
   * Resets the AutoCompleteInput component by clearing the input value, triggering the onInputChange callback with an empty string,
   * clearing the selected option, and opening the dropdown.
   */
  const reset = () => {
    setInputValue("");
    onInputChange("");
    setSelectedOption("");
    setOpenDropdown(true);
  };

  return (
    <div className='relative'>
      {showLabel && (
        <label className='input-label' htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <label className='text-xs input-label' htmlFor={inputName}>
        {selectedOption}
      </label>
      <div className='flex items-center gap-2'>
        <input
          className='input'
          name={inputName}
          placeholder={inputPlaceholder}
          required={isRequired}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setOpenDropdown(true)}
          onBlur={() => setTimeout(() => setOpenDropdown(false), 200)}
          autoComplete='false'
        />
        {inputValue && inputValue.toString().length > 0 && (
          <XMarkIcon className='h-8 cursor-pointer' onClick={reset} />
        )}
      </div>
      {openDropdown && options.length > 0 && (
        <ul
          className={
            "absolute bg-white z-40 w-full py-4 rounded-md border max-h-40 overflow-y-auto"
          }
        >
          {options.map((opt, index) => (
            <li
              className={"hover:bg-black/10 px-4 py-3 cursor-pointer"}
              style={{ textTransform: "none" }}
              key={index}
              onClick={() => handleOptionClick(opt.id.toString(), opt.label)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {helperText && <p className='input-helper-text'>{helperText}</p>}
    </div>
  );
}
