interface DateInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  defaultValue?: string;
  isRequired?: boolean;
}

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
