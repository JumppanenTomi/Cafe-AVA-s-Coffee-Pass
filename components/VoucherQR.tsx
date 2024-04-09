import { useEffect, useState } from "react"
import QrCodeGen from "./QrCodes/QrCodeGen"
import { XCircleIcon } from "@heroicons/react/20/solid"

const VoucherQR = ({ name, setShowQrCode, active, voucherId, used }:
    {
        name: string,
        setShowQrCode: React.Dispatch<React.SetStateAction<boolean>>,
        active: boolean,
        voucherId: number,
        used: number
    }) => {
    const [currentUsed, setCurrentUsed] = useState(used)

    useEffect(() => {
        console.log(active)
        active ? setShowQrCode(false) : setShowQrCode(true)
    }, [active])

    useEffect(() => {
        if (used !== currentUsed) {
            setShowQrCode(false)
            setCurrentUsed(used)
        }
    }, [used])

    return (
        <div className="voucher-background">
            <div className="flex-1 w-full flex flex-col items-center">
                <div className='voucher'>
                    <div className="close-button" onClick={() => setShowQrCode(false)} >
                        <XCircleIcon className="h-9 w-9" />
                    </div>
                    <QrCodeGen text={process.env.SITE_URL + '/client/vouchers/voucher' + voucherId} width={300} />
                    <div className="voucher-part">
                        {name}
                    </div>
                    <div className="circle1" />
                    <div className="circle2" />
                </div>
            </div >
        </div>
    )
}
export default VoucherQR