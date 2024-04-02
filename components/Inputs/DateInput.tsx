interface DateInputProps {
	inputName?: string;
	showLabel?: boolean;
	inputLabel?: string;
	inputPlaceholder?: string;
	isRequired?: boolean;
}

export default function DateInput({
									  inputName = "date",
									  showLabel = true,
									  inputLabel = "Date",
									  inputPlaceholder = "yyyy-mm-dd",
									  isRequired = true
								  }: DateInputProps) {
	return (
		<>
			{showLabel && (
				<label className="input-label" htmlFor={inputName}>
					{inputLabel} {isRequired && <span>*</span>}
				</label>
			)}
			<input
				className="input"
				type="date"
				name={inputName}
				placeholder={inputPlaceholder}
				required={isRequired}
			/>
		</>
	);
}