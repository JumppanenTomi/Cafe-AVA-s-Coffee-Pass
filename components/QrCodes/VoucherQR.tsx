import { useEffect, useState } from "react"
import QrCodeGen from "./QrCodeGen"
import { XCircleIcon } from "@heroicons/react/20/solid";

const VoucherQR = ({
  name,
  setShowQrCode,
  active,
  voucherId,
  used,
  userId, 
}: {
  name: string;
  setShowQrCode: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  voucherId: number;
  used: number;
  userId: string
}) => {
  const [currentUsed, setCurrentUsed] = useState(used);

  // Don't show if Inactive
  useEffect(() => {
    active ? setShowQrCode(false) : setShowQrCode(true);
  }, [active]);
  // Close if stamp is given or taken.
  useEffect(() => {
    if (used !== currentUsed) {
      setShowQrCode(false);
      setCurrentUsed(used);
    }
  }, [used]);

  return (
    <div className='voucher-background'>
      <div className='flex flex-col items-center flex-1 w-full'>
        <div className='voucher'>
          <div className='close-button' onClick={() => setShowQrCode(false)}>
            <XCircleIcon className='h-9 w-9' />
          </div>
          <QrCodeGen
            text={
              process.env.NEXT_PUBLIC_VERCEL_URL +
              "/admin/redeemVoucher/" +
              voucherId + "/" + userId 
            }
            width={300}
          />
          <div className='flex items-center voucher-part'>
            <h3>{name}</h3>
            <div className='circleActive animate-ping' />
            <div className='circleActive' />
          </div>
          <div className='circle1' />
          <div className='circle2' />
        </div>
      </div>
    </div>
  );
};
export default VoucherQR