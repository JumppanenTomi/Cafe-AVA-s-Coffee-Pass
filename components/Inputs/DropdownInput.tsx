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
				<label className="input-label" htmlFor={inputName}>
					{inputLabel} {isRequired && <label>*</label>}
				</label>
			)}
			<select
				className="input"
				name={inputName}
				required={isRequired}
				defaultValue={defaultOption}
			>
				{options.map((option, index) => (
					<option value={option.value} key={index}>{option.display}</option>
				))}
			</select>
		</>
	);
}