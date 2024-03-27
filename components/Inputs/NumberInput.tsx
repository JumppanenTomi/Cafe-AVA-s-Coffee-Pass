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

export default function NumberInput({
  inputName = "number",
  showLabel = true,
  inputLabel = "Number",
  inputPlaceholder = "1234",
  isRequired = true,
  defaultValue = 1,
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
