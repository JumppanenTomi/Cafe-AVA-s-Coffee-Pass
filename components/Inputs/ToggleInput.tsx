interface ToggleInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  defaultValue?: boolean;
  helperText?: string;
}

/**
 * Renders a toggle input component.
 *
 * @param {ToggleInputProps} props - The props for the ToggleInput component.
 * @param {string} props.inputName - The name of the input element.
 * @param {boolean} props.showLabel - Determines whether to show the input label.
 * @param {string} props.inputLabel - The label text for the input element.
 * @param {boolean} props.defaultValue - The default value for the input element.
 * @param {string} props.helperText - The helper text to display below the input element.
 * @returns {JSX.Element} The rendered ToggleInput component.
 */
export default function ToggleInput({
  inputName = "toggle",
  showLabel = true,
  inputLabel = "Toggle",
  defaultValue = false,
  helperText = "",
}: ToggleInputProps) {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          className="sr-only peer"
          type="checkbox"
          name={inputName}
          defaultChecked={defaultValue}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        {showLabel && (
          <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
            {inputLabel}
          </span>
        )}
      </label>
      {helperText && <p className="input-helper-text">{helperText}</p>}
    </div>
  );
}
