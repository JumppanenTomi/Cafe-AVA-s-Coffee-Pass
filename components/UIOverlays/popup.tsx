import React, {useEffect} from "react";

interface Props {
	children: React.ReactNode;
	closeAfter?: number;
	visible: boolean;
	onClose: () => void;
}

const Popup: React.FC<Props> = ({visible, onClose, children, closeAfter = 0}) => {
	if (!visible) return null;

	useEffect(() => {
		let timer: string | number | NodeJS.Timeout | undefined;
		if (closeAfter > 0) {
			timer = setTimeout(() => onClose(), closeAfter * 1000);
		}
		return () => clearTimeout(timer);
	}, [closeAfter, visible]);

	return (
		<div className={'fixed z-50 top-0 bottom-0 left-0 right-0 bg-[#00000080] flex items-center justify-center'}>
			<div className={'white-container-no-p flex flex-col p-5 items-end'}>
				<button onClick={onClose}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
						 stroke="currentColor" className="w-10 h-10">
						<path strokeLinecap="round" strokeLinejoin="round"
							  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
					</svg>
				</button>
				<div className={'p-5'}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Popup;