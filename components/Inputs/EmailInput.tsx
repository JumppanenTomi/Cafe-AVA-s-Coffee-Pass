interface EmailInputProps {
  inputName?: string;
  showLabel?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  helperText?: string;
}

export default function EmailInput({
  inputName = "email",
  showLabel = true,
  inputLabel = "Email",
  inputPlaceholder = "example@example.com",
  isRequired = true,
  helperText = "",
}: EmailInputProps) {
  return (
    <div>
      {showLabel && (
        <label className='input-label' htmlFor={inputName}>
          {inputLabel} {isRequired && <label>*</label>}
        </label>
      )}
      <input
        className='input'
        type='email'
        name={inputName}
        pattern='[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'
        title='Must be in form of "example@example.com"'
        placeholder={inputPlaceholder}
        required={isRequired}
      />
      {helperText && <p className='input-helper-text'>{helperText}</p>}
    </div>
  );
}
