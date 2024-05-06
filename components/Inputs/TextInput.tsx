interface TextInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  helperText?: string;
}

/**
 * A text input component.
 *
 * @param inputName - The name of the input element.
 * @param showLabel - Determines whether to show the input label.
 * @param inputLabel - The label text for the input element.
 * @param inputPlaceholder - The placeholder text for the input element.
 * @param isRequired - Determines whether the input is required.
 * @param defaultValue - The default value for the input element.
 * @param minLength - The minimum length allowed for the input value.
 * @param maxLength - The maximum length allowed for the input value.
 * @param helperText - The helper text to display below the input element.
 */
export default function TextInput({
  inputName = "text",
  showLabel = true,
  inputLabel = "Text",
  inputPlaceholder = "Enter text here",
  isRequired = true,
  defaultValue = "",
  minLength,
  maxLength,
  helperText = "",
}: TextInputProps) {
  return (
    <div>
      {showLabel && (
        <label className="input-label" htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <input
        className="input"
        type="text"
        name={inputName}
        placeholder={inputPlaceholder}
        required={isRequired}
        defaultValue={defaultValue}
        minLength={minLength}
        maxLength={maxLength}
      />
      {helperText && <p className="input-helper-text">{helperText}</p>}
    </div>
  );
}
