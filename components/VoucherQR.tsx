import QrCodeGen from "./QrCodes/QrCodeGen"
import short from "short-uuid"

const VoucherQR = () => {
    const code = short().generate()
    return (
        <div className="voucher-background">
            <div className="flex-1 w-full flex flex-col items-center">
                <div>X</div>
                <div className='voucher'>
                    <QrCodeGen text={process.env.SITE_URL + '/client/vouchers/voucher' + code} width={300} />
                    <div className="voucher-part">
                        Free Coffee
                    </div>
                    <div className="circle1" />
                    <div className="circle2" />
                </div>
            </div >
        </div>
    )
}
export default VoucherQR