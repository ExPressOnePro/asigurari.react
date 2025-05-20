import axiosInstance from "@/lib/axiosInstance.ts";
import {useEffect} from "react";

interface QRCodeStatusCheckerProps {
    onSuccess: () => void;
    qrCodeData: any;
    onStatusChange: (newStatus: string) => void;
}

const QRCodeStatusChecker: React.FC<QRCodeStatusCheckerProps> = ({ onSuccess, qrCodeData, onStatusChange }) => {
    useEffect(() => {
        if (!qrCodeData?.uuid) return;
        if (qrCodeData?.status === "Paid") {
            onSuccess();
            return;
        }

        const interval = setInterval(async () => {
            try {
                const { data } = await axiosInstance.get(`/qr/${qrCodeData.uuid}/status`);

                if (data.status && data.status !== qrCodeData.status) {
                    onStatusChange(data.status); // универсальный колбэк для обновления
                    if (data.status === "Paid") {
                        clearInterval(interval);
                        onSuccess();
                    }
                }
            } catch (error) {
                console.error("Ошибка при проверке статуса QR:", error);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [qrCodeData?.uuid, qrCodeData?.status, onSuccess, onStatusChange]);

    return null;
};

export default QRCodeStatusChecker;
