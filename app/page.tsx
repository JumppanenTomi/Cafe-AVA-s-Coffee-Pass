import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default async function Index() {
	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">
			<Nav/>
			<h1>This is landing page</h1>
			<Footer/>
		</div>
	);
}
