// Created by Tomi Jumppanen on 29.02.2024
"use client"
import { useEffect, useRef, useState } from "react";
import qrcode, { QRCodeErrorCorrectionLevel } from "qrcode";

interface QrCodeGenProps {
  text: string;
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
  width?: number;
}

const QrCodeGen = ({
  text,
  errorCorrectionLevel = "high",
  width = 500,
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