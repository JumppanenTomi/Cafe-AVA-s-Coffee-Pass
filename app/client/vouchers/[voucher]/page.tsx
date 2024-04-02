import Nav from "@/components/Nav";
import QrCodeGen from "@/components/QrCodes/QrCodeGen";
import short from "short-uuid";
import BackButton from "@/components/BackButton";

export default async function SingleVoucherPage() {
	const code = short().generate()

	return (
		<div className="flex-1 w-full flex flex-col items-center">
			<Nav />
			<div className='voucher'>
				<QrCodeGen text={process.env.SITE_URL + '/client/vouchers/voucher' + code} width={300} />
				<div className="voucher-part">
					Free Coffee
				</div>
				<div className="circle1" />
				<div className="circle2" />
			</div>
			<BackButton customUrl={"/client/vouchers"}/>
		</div >
	);
}
