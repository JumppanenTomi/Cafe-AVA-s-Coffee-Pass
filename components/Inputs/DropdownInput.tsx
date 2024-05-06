interface DropdownInputProps {
  inputName?: string;
  showLabel?: boolean;
  labelOnSide?: boolean;
  inputLabel?: string;
  isRequired?: boolean;
  options: Array<{
    value: string | number;
    display: string;
  }>;
  defaultOption?: string | number;
}

/**
 * Renders a dropdown input component.
 *
 * @param {DropdownInputProps} props - The component props.
 * @param {string} props.inputName - The name of the input element.
 * @param {boolean} props.showLabel - Determines whether to show the input label.
 * @param {boolean} props.labelOnSide - Determines whether to display the label on the side.
 * @param {string} props.inputLabel - The label text for the input.
 * @param {boolean} props.isRequired - Determines whether the input is required.
 * @param {Array<{ value: string, display: string }>} props.options - The dropdown options.
 * @param {string} props.defaultOption - The default selected option.
 * @returns {JSX.Element} The rendered dropdown input component.
 */
export default function DropdownInput({
  inputName = "dropdown",
  showLabel = true,
  labelOnSide = false,
  inputLabel = "Select",
  isRequired = true,
  options,
  defaultOption,
}: DropdownInputProps) {
  return (
    <>
      {showLabel && (
        <label className='input-label' htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <select
        className='input'
        name={inputName}
        required={isRequired}
        defaultValue={defaultOption}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.display}
          </option>
        ))}
      </select>
    </>
  );
}
