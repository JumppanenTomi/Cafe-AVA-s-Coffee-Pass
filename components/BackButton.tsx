import Link from "next/link";

export default function BackButton() {
	return (
		<Link href={"/client"} className={'btn-primary w-full sticky bottom-5 left-5 right-5'}>Back</Link>
	)
}