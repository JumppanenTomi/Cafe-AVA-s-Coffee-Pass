interface PasswordInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  helperText?: string;
}

/**
 * Renders a password input field.
 *
 * @param {PasswordInputProps} props - The component props.
 * @param {string} props.inputName - The name attribute for the input field.
 * @param {boolean} props.showLabel - Determines whether to show the input label.
 * @param {string} props.inputLabel - The label text for the input field.
 * @param {string} props.inputPlaceholder - The placeholder text for the input field.
 * @param {boolean} props.isRequired - Determines whether the input field is required.
 * @param {number} props.minLength - The minimum length allowed for the input value.
 * @param {number} props.maxLength - The maximum length allowed for the input value.
 * @param {string} props.helperText - The helper text to display below the input field.
 * @returns {JSX.Element} The rendered password input component.
 */
export default function PasswordInput({
  inputName = "password",
  showLabel = true,
  inputLabel = "Password",
  inputPlaceholder = "••••••••",
  isRequired = true,
  minLength,
  maxLength,
  helperText = "",
}: PasswordInputProps) {
  return (
    <>
      {showLabel && (
        <label className="input-label" htmlFor={inputName || "password"}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <input
        className="input"
        type="password"
        name={inputName}
        placeholder={inputPlaceholder}
        required={isRequired}
        minLength={minLength}
        maxLength={maxLength}
      />
      {helperText && <p className="input-helper-text">{helperText}</p>}
    </>
  );
}
