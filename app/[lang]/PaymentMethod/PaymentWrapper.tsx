import React, { useState } from 'react';
import PaymentMethodSelector from "@/app/[lang]/PaymentMethod/PaymentMethodSelector.tsx";
import CardPaymentForm from "@/app/[lang]/PaymentMethod/card/CardPaymentForm.tsx";

import QRCodeDisplay from "@/app/[lang]/PaymentMethod/qr/QRCodeDisplay.tsx";
import { setQrCodeData } from "@/store/insuranceFormSlice";
import QRCodeStatusChecker from "@/app/[lang]/PaymentMethod/qr/QRCodeStatusChecker.tsx";
import QRCodeSender from "@/app/[lang]/PaymentMethod/qr/QRCodeSender.tsx"; // добавь, если используешь Redux

interface PaymentWrapperProps {
    requestData: any;
    postUrl: string;
    onStepChange: (step: number) => void;
    onQrCodeDataChange: (data: any) => void;
    onQrCodeStatusChange: (status: string) => void;
    qrCodeData: any;
}

export default function PaymentWrapper({
                                           requestData,
                                           postUrl,
                                           onStepChange,
                                           onQrCodeDataChange,
                                           onQrCodeStatusChange,
                                           qrCodeData,
                                       }: PaymentWrapperProps) {
    const [method, setMethod] = React.useState<string | null>(null);
    return (
        <div className="p-6">
            {!method && <PaymentMethodSelector onSelect={setMethod} />}

            {method === 'qr' && (
                <>
                    <QRCodeSender
                        postUrl={postUrl}
                        payloadBuilder={() => requestData}
                        dependencies={[requestData]}
                        onQrCodeDataChange={onQrCodeDataChange}
                    />
                    <QRCodeDisplay
                        qrCodeData={qrCodeData}
                        successStep={5}
                        title="Отсканируйте QR-код"
                        subtitle="Оплатите через приложение вашего банка"
                    />
                    <QRCodeStatusChecker
                        qrCodeData={qrCodeData}
                        onStatusChange={onQrCodeStatusChange}
                        onSuccess={() => onStepChange(5)}
                    />
                </>
            )}
        </div>
    );
}