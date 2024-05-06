interface NumberInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  defaultValue?: number;
  min?: number;
  max?: number;
  helperText?: string;
}

/**
 * Renders a number input component.
 *
 * @param {NumberInputProps} props - The component props.
 * @param {string} props.inputName - The name of the input element.
 * @param {boolean} props.showLabel - Determines whether to show the input label.
 * @param {string} props.inputLabel - The label text for the input element.
 * @param {string} props.inputPlaceholder - The placeholder text for the input element.
 * @param {boolean} props.isRequired - Determines whether the input is required.
 * @param {number} props.defaultValue - The default value for the input element.
 * @param {number} props.min - The minimum value for the input element.
 * @param {number} props.max - The maximum value for the input element.
 * @param {string} props.helperText - The helper text to display below the input element.
 * @returns {JSX.Element} The rendered number input component.
 */
export default function NumberInput({
  inputName = "number",
  showLabel = true,
  inputLabel = "Number",
  inputPlaceholder = "1234",
  isRequired = true,
  defaultValue = 0,
  min,
  max,
  helperText = "",
}: NumberInputProps) {
  return (
    <div>
      {showLabel && (
        <label className="input-label" htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <input
        className="input"
        type="number"
        name={inputName}
        placeholder={inputPlaceholder}
        required={isRequired}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
      {helperText && <p className="input-helper-text">{helperText}</p>}
    </div>
  );
}
