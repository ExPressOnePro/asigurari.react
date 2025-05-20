// components/QRCodeDisplay.tsx
import React from "react";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue";
import { useSelector } from "react-redux";
import {RootState} from "@/store/store.ts";


interface QRCodeDisplayProps {
    successStep?: number;
    title: string;
    subtitle: string;
    qrCodeData: {
        qr_as_image?: string;
        url?: string;
        status?: string;
    };
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = React.memo(
    ({ successStep, title, subtitle, qrCodeData }) => {
        if (!qrCodeData?.qr_as_image) return null;

        return (
            <div className="flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-3xl p-6 border border-gray-300 rounded-3xl shadow-lg bg-white">
                    <div className="mt-4 text-center">
                        <a href={qrCodeData.url || "#"} target="_blank" rel="noopener noreferrer">
                            <img
                                src={qrCodeData.qr_as_image}
                                alt="QR Код"
                                className="w-2/4 h-2/4 border border-gray-300 rounded-3xl cursor-pointer mx-auto"
                            />
                        </a>
                        <h1 className="text-3xl sm:text-2xl font-extrabold text-gray-600 mt-6">{title}</h1>
                        <p className="mt-4 text-center font-bold">{subtitle}</p>
                    </div>
                    <div className="mt-4 text-center">
                        {qrCodeData.status !== "Paid" && <SpinnerBlue />}
                        <p className={`text-sm ${qrCodeData.status === "Paid" ? "text-green-500" : "text-gray-500"}`}>
                            {qrCodeData.status === "Paid" ? "Оплачено" : `Статус: ${qrCodeData.status}`}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);

export default QRCodeDisplay;
