import Link from "next/link";

export default async function Success() {
	return (
		<div className="flex-1 w-full flex flex-col gap-5 items-center justify-center p-5">
			<div className={'white-container flex items-center flex-col gap-5'}>
				<h1 className={'font-medium text-xl'}>Success!</h1>
				<p>Action run successfully.</p>
			</div>
			<Link href={'/admin'} className={'btn-primary'}>Back to admin panel</Link>
		</div>
	);
}