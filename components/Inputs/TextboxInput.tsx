interface TextInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  defaultValue?: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  resize?: boolean;
  rows?: number;
  cols?: number;
}

/**
 * Renders a textbox input component.
 *
 * @param {TextInputProps} props - The input component props.
 * @returns {JSX.Element} The rendered textbox input component.
 */
export default function TextboxInput({
  inputName = "text",
  showLabel = true,
  inputLabel = "Text",
  inputPlaceholder = "Enter text here",
  defaultValue = "",
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
        defaultValue={defaultValue}
        rows={rows}
        cols={cols}
      />
    </>
  );
}
