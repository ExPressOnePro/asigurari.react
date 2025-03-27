import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";
import axiosInstance from "@/lib/axiosInstance.ts";
import { setQrCodeData } from "@/store/greenCardFormSlice.ts";
import SpinnerBlue from "@/app/[lang]/components/SpinnerBlue.tsx";

interface QRCodeRequestProps {
    onStepChange: (step: number) => void;
}

const QRCodeImage: React.FC<QRCodeRequestProps> = React.memo(({ onStepChange }) => {
    const dispatch = useDispatch();
    const qrCodeDate = useSelector((state: RootState) => state.greenCardForm.qrCodeData);

    // Если нет qr-кода, не рендерим компонент
    if (!qrCodeDate?.qr_as_image) {
        return null;
    }
    const currentStatus = useSelector((state: RootState) => state.greenCardForm.qrCodeData);

    useEffect(() => {
        if (!qrCodeDate.uuid) return;

        let isMounted = true;

        const checkStatus = async () => {
            try {
                console.log(`📡 Отправка запроса: /qr/${qrCodeDate.uuid}/status/`);
                const response = await axiosInstance.get(`/qr/${qrCodeDate.uuid}/status/`);
                if (!isMounted) return;

                console.log("✅ Ответ API:", response.data);

                // Проверяем, изменился ли статус
                if (response.data?.status && response.data.status !== currentStatus?.status) {
                    console.log(`📌 Новый статус: ${response.data.status}`);
                    // Если статус "Paid", прекращаем опрос
                    if (response.data.status === "Paid") {
                        dispatch(setQrCodeData({
                            uuid: response.data.uuid,
                            qr_as_image: response.data.qr_as_image,
                            url: response.data.url,
                            status: response.data.status,
                        }));
                        onStepChange(7);
                        return;
                    }
                }

                // Повторный запрос через 5 секунд, если статус не "Paid"
                if (response.data.status !== "Paid") {
                    setTimeout(checkStatus, 5000);
                }

            } catch (error) {
                console.error("❌ Ошибка при проверке статуса:", error);
            }
        };

        checkStatus(); // Запускаем сразу

        return () => {
            isMounted = false; // Отменяем запросы при размонтировании компонента
        };
    }, [qrCodeDate.uuid, currentStatus, dispatch]);

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl p-6">
                <div className="mt-4 text-center">
                    <a href={qrCodeDate?.url || '#'} target="_blank" rel="noopener noreferrer">
                        <img
                            src={qrCodeDate?.qr_as_image}
                            alt="QR Код"
                            className="w-2/3 h-2/3 border border-gray-300 rounded-3xl cursor-pointer mx-auto"
                        />
                    </a>
                    <h1 className="text-3xl sm:text-2xl font-extrabold text-ce text-gray-600 mt-6">Отсканируй и Оплати</h1>
                    <p className="mt-4 text-center font-bold">
                        отсканируй этот QR-код с помощью камеры телефона или финансового приложения и заверши платеж
                    </p>
                </div>
                <div className="mt-4 text-center">
                    {currentStatus?.status !== "Paid" && <SpinnerBlue />}
                    {currentStatus?.status && (
                        <p className={`text-sm ${currentStatus.status === "Paid" ? "text-green-500" : "text-gray-500"}`}>
                            {currentStatus.status === "Paid" ? "Оплачено" : `Статус: ${currentStatus.status}`}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default QRCodeImage;
