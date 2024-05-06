import Link from "next/link";

interface BackButtonProps {
  customUrl?: string;
}

/**
 * Renders a back button component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.customUrl - The custom URL to navigate to when the button is clicked.
 * @returns {JSX.Element} The rendered BackButton component.
 */
export default function BackButton({ customUrl }: BackButtonProps) {
	return (
		<Link href={customUrl ? customUrl : "/client"} className={'btn-primary w-full sticky bottom-5 left-5 right-5'}>Back</Link>
	)
}