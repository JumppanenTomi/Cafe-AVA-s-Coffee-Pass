interface PasswordInputProps {
	inputName?: string;
	showLabel?: boolean;
	inputLabel?: string;
	inputPlaceholder?: string;
	isRequired?: boolean;
	minLength?: number;
	maxLength?: number;
}

export default function PasswordInput({
										  inputName = "password",
										  showLabel = true,
										  inputLabel = "Password",
										  inputPlaceholder = "••••••••",
										  isRequired = true,
										  minLength,
										  maxLength,
									  }: PasswordInputProps) {
	return (
		<>
			{showLabel && (
				<label className="input-label" htmlFor={inputName || "password"}>
					{inputLabel} {isRequired && <label>*</label>}
				</label>
			)}
			<input
				className="input"
				type="password"
				name={inputName}
				placeholder={inputPlaceholder}
				required={isRequired}
				minLength={minLength}
				maxLength={maxLength}
			/>
		</>
	)
}