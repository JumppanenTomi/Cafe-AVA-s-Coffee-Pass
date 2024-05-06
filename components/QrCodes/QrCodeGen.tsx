"use client";
import { useEffect, useRef, useState } from "react";
import qrcode, { QRCodeErrorCorrectionLevel } from "qrcode";

interface QrCodeGenProps {
  text: string;
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
  width?: number;
}

/**
 * Generates a QR code based on the provided text.
 *
 * @component
 * @param {QrCodeGenProps} props - The component props.
 * @param {string} props.text - The text to be encoded in the QR code.
 * @param {string} [props.errorCorrectionLevel="high"] - The error correction level for the QR code.
 * @param {number} [props.width=500] - The width of the QR code in pixels.
 * @returns {JSX.Element} The generated QR code as a canvas element.
 */
const QrCodeGen = ({
  text,
  errorCorrectionLevel = "high",
  width = 0,
}: QrCodeGenProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [genError, setGenError] = useState<string | undefined>();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      qrcode.toCanvas(canvas, text, { errorCorrectionLevel, width }, (err) => {
        if (err) {
          setGenError(err.toString());
        } else {
          canvasRef.current?.setAttribute(
            "style",
            "width: 100%; height: auto;"
          );
        }
      });
    }
  }, [text, errorCorrectionLevel, width]);

  return !genError ? (
    <canvas ref={canvasRef} className='w-full' />
  ) : (
    <div>
      <h2>There was an error creating QR code:</h2>
      <p>{genError}</p>
    </div>
  );
};

export default QrCodeGen;
