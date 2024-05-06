interface DateInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  defaultValue?: string;
  isRequired?: boolean;
}

/**
 * Renders a date input component.
 *
 * @param {DateInputProps} props - The props for the DateInput component.
 * @param {string} props.inputName - The name of the input element.
 * @param {boolean} props.showLabel - Determines whether to show the input label.
 * @param {string} props.inputLabel - The label text for the input element.
 * @param {string} props.inputPlaceholder - The placeholder text for the input element.
 * @param {string} props.defaultValue - The default value for the input element.
 * @param {boolean} props.isRequired - Determines whether the input is required.
 * @returns {JSX.Element} The rendered DateInput component.
 */
export default function DateInput({
  inputName = "date",
  showLabel = true,
  inputLabel = "Date",
  inputPlaceholder = "yyyy-mm-dd",
  defaultValue = "",
  isRequired = true,
}: DateInputProps) {
  return (
    <div>
      {showLabel && (
        <label className="input-label" htmlFor={inputName}>
          {inputLabel} {isRequired && <span>*</span>}
        </label>
      )}
      <input
        className="input"
        type="datetime-local"
        name={inputName}
        placeholder={inputPlaceholder}
        required={isRequired}
        defaultValue={defaultValue}
      />
    </div>
  );
}
