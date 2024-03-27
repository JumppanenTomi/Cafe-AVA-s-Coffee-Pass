import Link from "next/link";

interface BackButtonProps {
  customUrl?: string;
}

export default function BackButton({ customUrl }: BackButtonProps) {
	return (
		<Link href={customUrl ? customUrl : "/client"} className={'btn-primary w-full sticky bottom-5 left-5 right-5'}>Back</Link>
	)
}