import { useEffect, useState } from "react";
import QrCodeGen from "./QrCodeGen";
import { XCircleIcon } from "@heroicons/react/20/solid";
import ReactCardFlip from 'react-card-flip';

const VoucherQR = ({
  name,
  setShowQrCode,
  active,
  voucherId,
  used,
  redeemMessage,
  userId,
}: {
  name: string;
  setShowQrCode: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean,
  voucherId: number;
  used: number;
  userId: string;
  redeemMessage: string;
}) => {
  const [currentUsed, setCurrentUsed] = useState(used);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (used !== currentUsed || active) {
      setFlip(true);
      setCurrentUsed(used);
      setTimeout(() => {
        setShowQrCode(false)
      }, 3000);
    }
  }, [used]);


  return (
    <div className='voucher-background'>
      <div className="m-8 w-96">
        <ReactCardFlip isFlipped={flip} flipDirection="horizontal">

          <div className="voucher" >
            <div className='close-button' onClick={() => setShowQrCode(false)}>
              <XCircleIcon className='h-9 w-9' />
            </div>
            <QrCodeGen
              text={
                `${process.env.NEXT_PUBLIC_VERCEL_URL}/admin/redeemVoucher/${voucherId}/${userId}`
              }
              width={400}
            />
            <div className='voucher-part'>
              <h1>{name}</h1>
              <div className='circleActive animate-ping'></div>
              <div className='circleActive'></div>
            </div>

          </div>

          <div className="voucher">
            <div className='close-button' onClick={() => setShowQrCode(false)}>
              <XCircleIcon className='h-9 w-9' />
            </div>
            <div className="bg-white h-96">
              <div className=" text-center p-20 ">
                <h1>{redeemMessage ? redeemMessage : "Enjoy!"}</h1>
              </div>
            </div>
            <div className=' voucher-part p-12'>
              <h1>redeemed</h1>
              <div className='circleActive animate-ping' />
              <div className='circleActive' />
            </div>

          </div>
        </ReactCardFlip >
      </div >
    </div >
  );
};

export default VoucherQR;
