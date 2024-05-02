import { useEffect, useState } from "react"
import QrCodeGen from "./QrCodeGen"
import { XCircleIcon } from "@heroicons/react/20/solid";
<<<<<<< Updated upstream
import ReactCardFlip from 'react-card-flip';
=======
import ReactCardFlip from "react-card-flip";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

  // Don't show if Inactive
  useEffect(() => {
    active ? setShowQrCode(false) : setShowQrCode(true);
  }, [active]);
  // Close if stamp is given or taken.
  useEffect(() => {
    if (used !== currentUsed) {
<<<<<<< Updated upstream
      setFlip(!flip)
=======

      setShowQrCode(false);
>>>>>>> Stashed changes
      setCurrentUsed(used);
      setTimeout(() =>
        setShowQrCode(false)
        , 3000)
    }
  }, [used]);

<<<<<<< Updated upstream

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
=======
  setTimeout(() => {
    setFlip(!flip)
  }, 3000)
  return (
    <div className='voucher-background'>
      <ReactCardFlip isFlipped={flip}
        flipDirection="horizontal">

        <div className='voucher flex flex-col items-center flex-1 w-full'>
          <div className='close-button' onClick={() => setShowQrCode(false)}>
            <XCircleIcon className='h-9 w-9' />
>>>>>>> Stashed changes
          </div>
        </div>
<<<<<<< Updated upstream
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
=======

        <div className="voucherBack">
          <div className='voucher flex flex-col items-center flex-1 w-full'>
            <div className='close-button' onClick={() => setShowQrCode(false)}>
              <XCircleIcon className='h-9 w-9' />
            </div>
            <h3>BOOOOOOO</h3>
            <div className='flex items-center voucher-part'>

>>>>>>> Stashed changes
              <div className='circleActive animate-ping' />
              <div className='circleActive' />
            </div>
            <div className='circle1' />
            <div className='circle2' />
          </div>
<<<<<<< Updated upstream

        </div>

=======
        </div>
>>>>>>> Stashed changes
      </ReactCardFlip>
    </div>

  );
};
export default VoucherQR