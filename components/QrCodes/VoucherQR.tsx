import { useEffect, useState } from "react";
import QrCodeGen from "./QrCodeGen";
import { XCircleIcon } from "@heroicons/react/20/solid";
import ReactCardFlip from 'react-card-flip';

/**
 * Renders a voucher QR code component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the voucher.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowQrCode - The function to toggle the visibility of the QR code.
 * @param {boolean} props.active - Indicates if the voucher is active.
 * @param {number} props.voucherId - The ID of the voucher.
 * @param {number} props.used - The number of times the voucher has been used.
 * @param {string} props.userId - The ID of the user.
 * @param {string} props.redeemMessage - The redeem message for the voucher.
 * @returns {JSX.Element} The rendered VoucherQR component.
 */
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

  // Close the QR code after 3 seconds when the voucher is used
  useEffect(() => {
    if (used !== currentUsed || active) {
      setFlip(true); // flip the card
      setCurrentUsed(used); // update used
      setTimeout(() => {
        setShowQrCode(false)
      }, 3000);
    }
  }, [used]);

  return (
    <div className='voucher-background'>
      <div className="m-8 w-96">
        <ReactCardFlip isFlipped={flip} flipDirection="horizontal" cardStyles={{
          front: { zIndex: 'unset', transformStyle: 'initial' },
          back: { zIndex: 'unset', transformStyle: 'initial' }
        }}>
          {/* front side */}
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
          {/* back side */}
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
