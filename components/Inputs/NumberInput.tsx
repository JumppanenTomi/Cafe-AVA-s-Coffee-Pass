interface NumberInputProps {
	inputName?: string;
	showLabel?: boolean;
	inputLabel?: string;
	inputPlaceholder?: string;
	isRequired?: boolean;
	min?: number;
	max?: number;
}

export default function NumberInput({
										inputName = "number",
										showLabel = true,
										inputLabel = "Number",
										inputPlaceholder = "1234",
										isRequired = true,
										min,
										max,
									}: NumberInputProps) {
	return (
		<>
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
				min={min}
				max={max}
			/>
		</>
	);
}