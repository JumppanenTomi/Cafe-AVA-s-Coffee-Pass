import { useEffect, useState } from "react"
import QrCodeGen from "./QrCodeGen"
import { XCircleIcon } from "@heroicons/react/20/solid";
import ReactCardFlip from 'react-card-flip';

const VoucherQR = ({
  name,
  setShowQrCode,
  active,
  voucherId,
  used,
  redeemMessage
}: {
  name: string;
  setShowQrCode: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  voucherId: number;
  used: number;
  redeemMessage: string
}) => {
  const [currentUsed, setCurrentUsed] = useState(used);
  const [flip, setFlip] = useState(false);

  // Don't show if Inactive
  useEffect(() => {
    active ? setShowQrCode(false) : setShowQrCode(true);
  }, [active]);
  // Close if stamp is given or taken.
  useEffect(() => {
    if (used !== currentUsed) {
      setFlip(!flip)
      setCurrentUsed(used);
      setTimeout(() =>
        setShowQrCode(false)
        , 3000)
    }
  }, [used]);


  return (
    <div className='voucher-background'>
      <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
        <div className='flex flex-col items-center flex-1 w-full'>
          <div className='voucher'>
            <div className='close-button' onClick={() => setShowQrCode(false)}>
              <XCircleIcon className='h-9 w-9' />
            </div>
            <QrCodeGen
              text={
                process.env.NEXT_PUBLIC_VERCEL_URL +
                "/client/vouchers/voucher/" +
                voucherId
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
        <div className='flex flex-col items-center flex-1 w-full'>

          <div className='voucher'>
            <div className='close-button' onClick={() => setShowQrCode(false)}>
              <XCircleIcon className='h-9 w-9' />
            </div>
            <div className="w-[300px] h-[300px] bg-white">
              <h2>{redeemMessage}</h2>
            </div>
            <div className='flex items-center voucher-part'>
              <h3>{redeemMessage}</h3>
              <div className='circleActive animate-ping' />
              <div className='circleActive' />
            </div>
            <div className='circle1' />
            <div className='circle2' />
          </div>

        </div>

      </ReactCardFlip>
    </div>
  );
};
export default VoucherQR