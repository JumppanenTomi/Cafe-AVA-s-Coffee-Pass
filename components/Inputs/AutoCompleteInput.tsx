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
  return (
    <div>
      {showLabel && (
        <label className='input-label' htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <input
        className='input'
        list={inputName}
        name={inputName}
        placeholder={inputPlaceholder}
        required={isRequired}
        defaultValue={defaultValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onInputChange(event.target.value)
        }
      />
      <datalist id={inputName}>
        {options.map((opt, index) => (
          <option key={index} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </datalist>
      {helperText && <p className='input-helper-text'>{helperText}</p>}
    </div>
  );
}
