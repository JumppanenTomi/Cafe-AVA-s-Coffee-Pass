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
