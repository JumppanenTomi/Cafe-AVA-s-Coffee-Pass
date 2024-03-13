import {ReactNode} from "react";

export function Form({children, isError, error}:{children: ReactNode, isError: boolean, error: string}) {
	return (
		<form className={'form'}>
			{children}
			{error && (
				<p className={isError ? "form-error" : "form-success"}>
					{error}
				</p>
			)}
		</form>
	)
}