import { useEffect, useState } from "react"
import QrCodeGen from "./QrCodeGen"
import { XCircleIcon } from "@heroicons/react/20/solid"
import { faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons"

const VoucherQR = ({ name, setShowQrCode, active, voucherId, used }:
    {
        name: string,
        setShowQrCode: React.Dispatch<React.SetStateAction<boolean>>,
        active: boolean,
        voucherId: number,
        used: number
    }) => {
    const [currentUsed, setCurrentUsed] = useState(used)

    // Don't show if Inactive
    useEffect(() => {
        active ? setShowQrCode(false) : setShowQrCode(true)
    }, [active])
    // Close if stamp is given or taken.
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
                    <QrCodeGen text={process.env.SITE_URL + '/client/vouchers/voucher/' + voucherId} width={300} />
                    <div className="voucher-part flex items-center">
                        <h3>{name}</h3>
                        <div className="circleActive animate-ping" />
                        <div className="circleActive" />

                    </div>
                    <div className="circle1" />
                    <div className="circle2" />
                </div>
            </div >
        </div>
    )
}
export default VoucherQR