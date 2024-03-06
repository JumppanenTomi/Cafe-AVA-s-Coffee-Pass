import {ReactNode} from "react";

export function Form({children, error}:{children: ReactNode, error: string}) {
	return (
		<form className={'form'}>
			{children}
			{error && (
				<p className="form-error">
					{error}
				</p>
			)}
		</form>
	)
}