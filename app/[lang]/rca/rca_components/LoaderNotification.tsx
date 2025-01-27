import React, { useState, useEffect } from 'react';
import QRCodeImage from './QRCodeImage';
import axiosInstance from "@/lib/axiosInstance.ts";

interface LoaderNotificationProps {
    initialData: {
        url: string;
        qr_as_image: string;
        status: string;
        uuid: string;
    };
    onError?: (error: any) => void;
}

const LoaderNotification: React.FC<LoaderNotificationProps> = ({
                                                                   initialData,
                                                                   onError,
                                                               }) => {
    const [status, setStatus] = useState<string>(initialData.status);
    const [isChecking, setIsChecking] = useState<boolean>(true);

    const checkStatus = async () => {
        try {
            const response = await axiosInstance.get(`/qr/${initialData.uuid}/status/`);
            const data = response.data;

            // Обновляем статус только если он изменился
            if (data.status !== status) {
                setStatus(data.status);
            }

            // Останавливаем проверку при финальных статусах
            if (data.status === 'Paid' || data.status === 'failed') {
                setIsChecking(false);
            }
        } catch (error) {
            console.error('Ошибка при проверке статуса:', error);
            if (onError) onError(error);
        }
    };

    useEffect(() => {
        if (isChecking) {
            const interval = setInterval(checkStatus, 5000);
            return () => clearInterval(interval);
        }
    }, [isChecking, status]);

    return (
        <div className="flex flex-col items-center p-3 mt-4">
            <QRCodeImage
                qrImageData={initialData.qr_as_image}
                url={initialData.url}
            />
            <div className="flex items-center justify-center p-3 mt-4">
                {isChecking && (
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mr-3"></div>
                )}
                <p>{status}</p>
            </div>
            {status === 'Paid' && <p className="text-green-500">Оплачено</p>}
        </div>
    );
};

export default LoaderNotification;
