interface TextInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  resize?: boolean;
  rows?: number;
  cols?: number;
}

export default function TextboxInput({
  inputName = "text",
  showLabel = true,
  inputLabel = "Text",
  inputPlaceholder = "Enter text here",
  isRequired = true,
  minLength,
  maxLength,
  resize = false,
  rows = 5,
  cols = 50,
}: TextInputProps) {
  return (
    <>
      {showLabel && (
        <label className='input-label' htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <textarea
        className={!resize ? "input no-resize" : "input"}
        name={inputName}
        placeholder={inputPlaceholder}
        required={isRequired}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        cols={cols}
      />
    </>
  );
}
