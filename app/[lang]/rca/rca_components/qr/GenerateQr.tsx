import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "@/store/store.ts";
import axiosInstance from "@/lib/axiosInstance.ts";
import QRCodeImage from "@/app/[lang]/rca/rca_components/QRCodeImage.tsx";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue.tsx";
import { setQrCodeData } from "@/store/insuranceFormSlice.ts";

interface QRCodeFetcherProps {
    onStepChange: (step: number) => void;
}

const QRCodeFetcher: React.FC<QRCodeFetcherProps> = ({ onStepChange }) => {
    const dispatch = useDispatch();

    const selectedInsurer = useSelector((state: RootState) => state.insuranceForm.selectedInsurer);
    const qrCodeData = useSelector((state: RootState) => state.insuranceForm.qrCodeData);

    const [isQrCodeLoading, setIsQrCodeLoading] = useState(false);
    const [qrCodeError, setQrCodeError] = useState<string | null>(null);
    const hasFetchedQrCodeRef = useRef(false);

    const [statusCheckData, setStatusCheckData] = useState<string | null>(null);
    const [isStatusChecking, setIsStatusChecking] = useState(false);
    const [statusCheckError, setStatusCheckError] = useState<string | null>(null);

    // Очистка состояния при смене страховщика
    useEffect(() => {
        hasFetchedQrCodeRef.current = false;
        dispatch(setQrCodeData(null));
        setStatusCheckData(null);
        setQrCodeError(null);
        setStatusCheckError(null);
        setIsStatusChecking(false);
    }, [selectedInsurer, dispatch]);

    useEffect(() => {
        if (selectedInsurer && !hasFetchedQrCodeRef.current) {
            hasFetchedQrCodeRef.current = true;

            const fetchQrCode = async () => {
                setIsQrCodeLoading(true);
                try {
                    const response = await axiosInstance.post('/qr/', {
                        extension: {
                            amount: {
                                sum: selectedInsurer.PrimeSumMDL,
                                currency: "MDL",
                            },
                        },
                    });

                    if (response.data?.qr_as_image && response.data?.url && response.data?.uuid) {
                        dispatch(setQrCodeData({
                            uuid: response.data.uuid,
                            qr_as_image: response.data.qr_as_image,
                            url: response.data.url
                        }));
                        setIsStatusChecking(true);
                    } else {
                        throw new Error('Некорректный ответ API');
                    }
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        setQrCodeError(`Не удалось загрузить QR-код: ${err.message}`);
                    } else {
                        setQrCodeError('Не удалось загрузить QR-код.');
                    }
                }
            };

            fetchQrCode();
        }
    }, [selectedInsurer, dispatch]);

    useEffect(() => {
        if (!isStatusChecking || !qrCodeData?.uuid) return;

        const intervalId = setInterval(async () => {
            try {
                const response = await axiosInstance.get(`/qr/${qrCodeData.uuid}/status/`);
                const data = response.data;

                if (data?.status) {
                    setStatusCheckData(data.status);

                    if (data.status === 'Paid') {
                        onStepChange(5);
                        clearInterval(intervalId);
                        setIsStatusChecking(false);
                    }

                    if (data.status === 'failed') {
                        clearInterval(intervalId);
                        setIsStatusChecking(false);
                    }
                }
            } catch (error) {
                setStatusCheckError('Ошибка при проверке статуса. Попробуйте позже.');
                clearInterval(intervalId);
                setIsStatusChecking(false);
            }
        }, 5000);

        return () => clearInterval(intervalId); // Очистка таймера при размонтировании
    }, [qrCodeData, isStatusChecking, onStepChange]);;

    return (
        <div className="flex flex-col items-center mt-4">
            {isQrCodeLoading ? (
                <SpinnerBlue />
            ) : qrCodeError ? (
                <p className="text-red-500">{qrCodeError}</p>
            ) : qrCodeData?.uuid ? (
                <QRCodeImage qrImageData={qrCodeData.qr_as_image} url={qrCodeData.url} />
            ) : null}

            <div className="mt-4 w-full text-center">
                {isStatusChecking && <SpinnerBlue />}
                {statusCheckData && (
                    <p className={`mt-2 text-sm ${
                        statusCheckData === 'Active'
                            ? 'text-green-500'
                            : statusCheckData === 'failed'
                                ? 'text-red-500'
                                : 'text-gray-500'
                    }`}>
                        {statusCheckData === 'Active' ? 'Оплачено' :
                            statusCheckData === 'failed' ? 'Ошибка' :
                                `Статус: ${statusCheckData}`}
                    </p>
                )}
                {statusCheckError && <p className="text-red-500">{statusCheckError}</p>}
            </div>
        </div>
    );
};

export default QRCodeFetcher;
