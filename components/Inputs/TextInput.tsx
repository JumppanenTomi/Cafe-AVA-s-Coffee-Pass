interface TextInputProps {
	inputName?: string;
	showLabel?: boolean;
	inputLabel?: string;
	inputPlaceholder?: string;
	isRequired?: boolean;
	minLength?: number;
	maxLength?: number;
}

export default function TextInput({
									  inputName = "text",
									  showLabel = true,
									  inputLabel = "Text",
									  inputPlaceholder = "Enter text here",
									  isRequired = true,
									  minLength,
									  maxLength,
								  }: TextInputProps) {
	return (
		<>
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
				minLength={minLength}
				maxLength={maxLength}
			/>
		</>
	);
}